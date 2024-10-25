import { Outlet } from "react-router";

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "./Layout.css";

function Layout({ product, carts, setToken }) {
  return (
    <div>
      <Header />
      <Navbar product={product} carts={carts} setToken={setToken} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
