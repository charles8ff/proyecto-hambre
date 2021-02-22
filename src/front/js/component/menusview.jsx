import React, { Component, useContext, Fragment } from "react";
import { Context } from "../store/appContext";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import BUTTON from "./button.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MenusView = props => {
	const { store, actions } = useContext(Context);

	let templatesInHTML = store.templates.map((item, index) => {
		return (
			<Col key={index}>
				<Card className="text-center">
					<Card.Img
						variant="top"
						src="https://dkstudio.mx/wp-content/plugins/tutor/assets/images/placeholder.jpg"
					/>
					<Card.Body>
						<Card.Title>{item.title}</Card.Title>
					</Card.Body>
					<Card.Footer>
						<BUTTON title="Ver toda la carta" />
					</Card.Footer>
				</Card>
			</Col>
		);
	});

	return (
		<Container>
			<CardDeck className="justify-content-center">
				<Row xs={1} md={1} lg={3} className="justify-content-center">
					{templatesInHTML}
				</Row>
			</CardDeck>
		</Container>
	);
};
