// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";

const headerNav = [
    {
        display: "Home",
        path: "/",
    },
    {
        display: "Movies",
        path: "/movie",
    },
    {
        display: "TV Series",
        path: "/tv",
    },
];


const Header = () => {
    const headerRef = useRef(null);

    const { pathname } = useLocation();

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }

        };
        window.addEventListener("scroll", shrinkHeader);
        return () => {
            window.removeEventListener("scroll", shrinkHeader);
        };
    }, []);

    return (
        <header ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="logo" className="logo__img" />
                    <NavLink to="/">MoviesApp</NavLink>
                </div>
                <ul className="header__nav">
                    {headerNav.map((item, index) => (
                        <li key={index} className={`${index === active ? 'active' : ''}`}>
                            <NavLink to={item.path}>{item.display}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Header;
