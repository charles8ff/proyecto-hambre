import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Jumbotron, Row, Col } from "react-bootstrap";
import { BUTTON } from "../component/button.jsx";
import { Context } from "../store/appContext";

export const Header = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<header className="navbar">
				<Container>
					<Navbar expand="lg">
						<Link to="/">
							<Navbar.Brand>Proyecto Hambre</Navbar.Brand>
						</Link>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
					</Navbar>
					<BUTTON title="Eliminar cuenta" click={() => actions.deleteProfile(store.profile_id)} />
					<BUTTON title="Cerrar Sesion" />
				</Container>
			</header>
		</>
	);
};
