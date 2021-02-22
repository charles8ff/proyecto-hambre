import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MenusView = props => {
	const { store, actions } = useContext(Context);

	// templatesInHTML = store.business.menus o algo del palo

	return (
		<Container>
			<CardDeck className="justify-content-center pb-5">
				<Row xs={1} md={1} lg={3} className="justify-content-center">
					<Col>
						<Card className="text-center">
							<Card.Img
								variant="top"
								src="https://dkstudio.mx/wp-content/plugins/tutor/assets/images/placeholder.jpg"
							/>
							<Card.Body>
								<Card.Title>Menú del día</Card.Title>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">Ver toda la carta</small>
							</Card.Footer>
						</Card>
					</Col>
					<Col>
						<Card className="text-center">
							<Card.Img
								variant="top"
								src="https://dkstudio.mx/wp-content/plugins/tutor/assets/images/placeholder.jpg"
							/>
							<Card.Body>
								<Card.Title>Carta</Card.Title>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">Ver toda la carta</small>
							</Card.Footer>
						</Card>
					</Col>
					<Col>
						<Card className="text-center">
							<Card.Img
								variant="top"
								src="https://dkstudio.mx/wp-content/plugins/tutor/assets/images/placeholder.jpg"
							/>
							<Card.Body>
								<Card.Title>Carta de vinos</Card.Title>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">Ver toda la carta</small>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</CardDeck>
		</Container>
	);
};
