import React, { Fragment, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Jumbotron, Row, Col } from "react-bootstrap";
import { BUTTON } from "../component/button.jsx";
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
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
					</Navbar>
					<BUTTON title="Eliminar cuenta" click={() => actions.deleteProfile(store.profile_id)} />
					{/* ?? */}
					<BUTTON title="Iniciar sesión" click={() => history.push("/login")} />
					<BUTTON
						title="Cerrar Sesión"
						click={() => {
							actions.doLogOut();
							history.push("/");
						}}
					/>
				</Container>
			</header>
		</>
	);
};
