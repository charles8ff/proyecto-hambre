import React, { useState } from "react";
import logoMenu from "./img/logo.png";
import "../../../styles/header.scss";

export const Header = () => {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);
	return (
		<div className="header">
			<div className="logo-nav">
				<div className="logo-container">{/* <a href="#">
						<img src={logoMenu} className="logo" />
					</a> */}</div>
				<ul className={click ? "nav-options active" : "nav-options"}>
					<li className="option" onClick={closeMobileMenu}>
						<a href="#">ABOUT</a>
					</li>
					<li className="option" onClick={closeMobileMenu}>
						<a href="#">CONTACT</a>
					</li>
					<li className="option" onClick={closeMobileMenu}>
						<a href="#">BLOG</a>
					</li>
					{/* <li className="option mobile-option" onClick={closeMobileMenu}>
						<a href="#">SIGN-IN</a>
					</li>
					<li className="option mobile-option" onClick={closeMobileMenu}>
						<a href="" className="sign-up">
							SIGN-UP
						</a>
					</li> */}
				</ul>
			</div>
			<ul className="signin-up">
				<li className="sign-in" onClick={closeMobileMenu}>
					<a href="#">SIGN-IN</a>
				</li>
				{/* <li onClick={closeMobileMenu}>
					<a href="" className="signup-btn">
						SIGN-UP
					</a>
				</li> */}
			</ul>
			<div className="mobile-menu" onClick={handleClick}>
				{click ? (
					<svg
						className="menu-icon"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				) : (
					<svg
						className="menu-icon"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				)}
			</div>
		</div>
	);
};
