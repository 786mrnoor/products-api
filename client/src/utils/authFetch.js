import { refreshToken } from "../api/auth";

let accessToken = null;

export function updateAccessToken(token) {
  accessToken = token;
}

export async function authFetch(url, options = {}) {
  url = import.meta.env.VITE_BACKEND_URI + url;

  if (!options.headers) options.headers = {};
  options.credentials = "include";
  options.headers["Content-Type"] = "application/json";
  if (accessToken) {
    options.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let res = await fetch(url, options);

  // If access token expired
  if (res.status === 401) {
    const newToken = await refreshToken();

    if (newToken) {
      accessToken = newToken;
      options.headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(url, options); // retry request
    } else {
      window.location.href = "/login";
    }
  }

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data;
}
