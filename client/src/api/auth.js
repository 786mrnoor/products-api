export async function signup(form) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/api/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data;
}
export async function login(form) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }

  const data = await res.json();
  return data;
}

export async function refreshToken() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/api/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include", // important for cookies
      }
    );

    if (!res.ok) throw new Error("Failed to refresh token");
    const data = await res.json();

    return data.token;
  } catch (err) {
    console.error("Refresh token failed:", err);
    return null;
  }
}
