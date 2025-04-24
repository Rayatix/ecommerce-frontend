import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavDropdown,
  Container,
  FormControl,
  Nav,
} from "react-bootstrap";
import logo from "../../images/logo.png";
import login from "../../images/login.png";
import cart from "../../images/cart.png";

// Sec Way
// import { useDispatch, useSelector } from "react-redux";
// import { getLoggedUser } from "../../redux/actions/authAction";

const NavBarLogin = () => {
  // Sec Way
  //   const dispatch = useDispatch();

  const [user, setUser] = useState("");

  useEffect(() => {
    // let user = "";
    // First Way
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    //   console.log(user.name);
    // Sec Way
    // dispatch(getLoggedUser());
  }, []);

  // Sec Way
  //   const res = useSelector((state) => state.authReducer.currentUser);
  // if (res) {
  //   console.log(res);
  // }

  const logOut = () => {
    setUser(localStorage.removeItem("user"));
    setUser("");
  };

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} className="logo" />
          </a>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />

          <Nav className="me-auto">
            {user != "" ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="user/profile">
                  الصفحه الشخصيه
                </NavDropdown.Item>

                <NavDropdown.Item onClick={logOut} href="/">
                  تسجيل الخروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                href="/login"
                className="nav-text d-flex mt-3 justify-content-center"
              >
                <img src={login} className="login-img" alt="sfvs" />
                <p style={{ color: "white" }}>دخول</p>
              </Nav.Link>
            )}

            <Nav.Link
              href="/cart"
              className="nav-text d-flex mt-3 justify-content-center"
              style={{ color: "white" }}
            >
              <img src={cart} className="login-img" alt="sfvs" />
              <p style={{ color: "white" }}>العربه</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLogin;
