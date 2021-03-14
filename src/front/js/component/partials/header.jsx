import React, { Fragment, useContext, useState, useEffect } from "react";
import logoMenu from "./img/logo.png";
import "../../../styles/header.scss";
import { Link, useHistory } from "react-router-dom";
import { OurButton } from "../button.jsx";
import { Context } from "../../store/appContext.js";

export const Header = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	return (
		<div className="Header">
			<div className="Header__Logo">
				<div className="Header__Logo--Container">
					{/* <Link to="/">
						<img src={logoMenu} className="Header__Logo--Image" />
					</Link> */}
				</div>
				<ul className={click ? "Header__Nav active" : "Header__Nav"}>
					<li className="Header__Nav--Links" onClick={closeMobileMenu}>
						<Link to="/">Inicio</Link>
					</li>
					<li className="Header__Nav--Links Header__Nav--MobileView" onClick={closeMobileMenu}>
						<Link to="/login">
							<OurButton title="Iniciar sesión" hide={store.loginToken != false ? "d-none" : ""} />
						</Link>
					</li>
					<li className="Header__Nav--Links Header__Nav--MobileView" onClick={closeMobileMenu}>
						<Link to="/register">
							<OurButton title="Regístrate" hide={store.loginToken != false ? "d-none" : ""} />
						</Link>
					</li>
				</ul>
			</div>
			<ul className="Header__Nav--SigninUp">
				<li className="Header__Nav--SigninIn" onClick={closeMobileMenu}>
					<Link to="/login">
						<OurButton title="Iniciar sesión" hide={store.loginToken != false ? "d-none" : ""} />
					</Link>
				</li>
				<li className="Header__Nav--SigninIn" onClick={closeMobileMenu}>
					<Link to="/register">
						<OurButton title="Regístrate" hide={store.loginToken != false ? "d-none" : ""} />
					</Link>
				</li>
				<li className="Header__Nav--SigninIn" onClick={closeMobileMenu}>
					<OurButton
						title="Eliminar cuenta"
						click={() => {
							actions.deleteProfile(store.placeData.id);
							history.push("/");
						}}
						hide={store.loginToken != false ? "" : "d-none"}
					/>
				</li>
				<li className="Header__Nav--SigninIn" onClick={closeMobileMenu}>
					<Link to="/">
						<OurButton
							title="Cerrar Sesión"
							click={() => {
								actions.doLogOut();
							}}
							hide={store.loginToken != false ? "" : "d-none"}
						/>
					</Link>
				</li>
			</ul>
			<div className="Header__MobileMenu" onClick={handleClick}>
				{click ? (
					<svg
						className="Header__MobileMenu--Icon"
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
						className="Header__MobileMenu--Icon"
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
