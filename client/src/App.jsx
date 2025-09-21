import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/home/Index";
import Nav from "./components/Nav";
import { Toaster } from "react-hot-toast";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Nav />}>
            <Route index element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
