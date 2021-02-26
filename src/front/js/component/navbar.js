import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Jumbotron, Row, Col } from "react-bootstrap";
import { OurButton } from "../component/button.jsx";
import { Context } from "../store/appContext";

export const Header = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [isLogged, setIsLogged] = useState({
		loggedButtons: "",
		notLoggedButtons: ""
	});

	useEffect(
		() => {
			if (store.userSingUp.is_login_ok) {
				setIsLogged({
					loggedButtons: "",
					notLoggedButtons: "d-none"
				});
			} else {
				setIsLogged({
					loggedButtons: "d-none",
					notLoggedButtons: ""
				});
			}
		},
		[store.userSingUp.is_login_ok]
	);

	return (
		<>
			<header className="navbar">
				<Container>
					<Navbar expand="lg">
						<Link to="/">
							<Navbar.Brand>Proyecto Hambre</Navbar.Brand>
						</Link>
						{/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
					</Navbar>
					<OurButton
						title="Eliminar cuenta"
						click={() => {
							actions.deleteProfile(store.loggedBusiness.id);
							history.push("/");
						}}
						hide={isLogged.loggedButtons}
					/>
					<OurButton
						title="Regístrate"
						click={() => history.push("/register")}
						hide={isLogged.notLoggedButtons}
					/>
					<OurButton
						title="Iniciar sesión"
						click={() => history.push("/login")}
						hide={isLogged.notLoggedButtons}
					/>
					<OurButton
						title="Cerrar Sesión"
						click={() => {
							actions.doLogOut();
							history.push("/");
						}}
						hide={isLogged.loggedButtons}
					/>
				</Container>
			</header>
		</>
	);
};
