import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Jumbotron, Row, Col } from "react-bootstrap";
import { BUTTON } from "../component/button.jsx";

export const Header = () => {
	return (
		<>
			<header className="navbar">
				<Container>
					<Navbar expand="lg">
						<Navbar.Brand href="#home">Proyecto Hambre</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
					</Navbar>
					<BUTTON title="Logout" />
				</Container>
			</header>
		</>
	);
};
