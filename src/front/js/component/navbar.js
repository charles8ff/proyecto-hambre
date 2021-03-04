import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Jumbotron, Row, Col } from "react-bootstrap";
import { OurButton } from "./button.jsx";
import { Context } from "../store/appContext";

export const Header = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<>
			<header className="navbar">
				<Container>
					<Navbar expand="lg">
						<Link to="/">
							<Navbar.Brand>Proyecto Hambre</Navbar.Brand>
						</Link>
					</Navbar>
					<OurButton
						title="Eliminar cuenta"
						click={() => {
							actions.deleteProfile(store.loggedBusiness.id);
							history.push("/");
						}}
						hide={store.loginToken != false ? "" : "d-none"}
					/>
					<OurButton
						title="Cerrar Sesión"
						click={() => {
							actions.doLogOut();
							history.push("/");
						}}
						hide={store.loginToken != false ? "" : "d-none"}
					/>
					<OurButton
						title="Regístrate"
						click={() => history.push("/register")}
						hide={store.loginToken != false ? "d-none" : ""}
					/>
					<OurButton
						title="Iniciar sesión"
						click={() => history.push("/login")}
						hide={store.loginToken != false ? "d-none" : ""}
					/>
				</Container>
			</header>
		</>
	);
};
