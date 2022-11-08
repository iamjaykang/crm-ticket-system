import React, { useState } from "react";
import logo from "../../../assets/images/crm-logo.ico";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { userLogout } from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { resetAdminSigninStatus } from "../../../components/AdminSignin/adminSigninSlice";
import { resetFetchTicket } from "../../../pages/TicketList/ticketsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const logMeOut = () => {
    userLogout();
    dispatch(resetAdminSigninStatus());
    dispatch(resetFetchTicket())
    localStorage.removeItem("crmSite");
    sessionStorage.removeItem("accessJWT");
  };
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-500 dark:bg-sky-800 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/"
            >
              <img src={logo} alt="logo" width={70} />
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <LinkContainer to="/dashboard">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <span className="ml-2">Dashboard</span>
                  </Link>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to="/tickets">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <span className="ml-2">Tickets</span>
                  </Link>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/"
                  onClick={logMeOut}
                >
                  <span className="ml-2">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
