import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ViewBookDetails from "./pages/ViewBookDetails";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Setting from "./components/Profile/Setting";
import Cart from "./pages/Cart";
import AddNewBook from "./pages/AddNewBook";
import AllUsersOrderHistory from "./components/Profile/AllUsersOrderHistory";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const [MobileNav, setMobileNav] = useState(false);

  const props = {
    MobileNav,
    setMobileNav,
  };

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.logIn());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <>
      <Navbar data={props} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/get-book-by-id/:id" element={<ViewBookDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <>
              {" "}
              <Route index element={<Favourites />} />
              <Route
                path="/profile/orderHistory"
                element={<UserOrderHistory />}
              />
              <Route path="/profile/settings" element={<Setting />} />
            </>
          ) : (
            <>
              <Route index element={<AddNewBook />} />
              <Route
                path="/profile/all-user-order-history"
                element={<AllUsersOrderHistory />}
              />
            </>
          )}{" "}
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
