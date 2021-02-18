import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import PropTypes from "prop-types";

export const MenusView = props => {
	const { store, actions } = useContext(Context);

	// templatesInHTML = store.business.templates o algo del palo

	return (
		<div className="container">
			<CardDeck className="d-flex justify-content-center">
				<Card className="mb-2 col-3 p-0">
					<Card.Img
						variant="top"
						src="https://dkstudio.mx/wp-content/plugins/tutor/assets/images/placeholder.jpg"
					/>
					<Card.Body>
						<Card.Title>Carta</Card.Title>
						<Card.Text>
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Ver toda la carta</small>
					</Card.Footer>
				</Card>
				<Card className="mb-2 col-3 p-0">
					<Card.Img
						variant="top"
						src="https://dkstudio.mx/wp-content/plugins/tutor/assets/images/placeholder.jpg"
					/>
					<Card.Body>
						<Card.Title>Carta</Card.Title>
						<Card.Text>
							This card has supporting text below as a natural lead-in to additional content.{" "}
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Ver toda la carta</small>
					</Card.Footer>
				</Card>
				<Card className="mb-2 col-3 p-0">
					<Card.Img
						variant="top"
						src="https://dkstudio.mx/wp-content/plugins/tutor/assets/images/placeholder.jpg"
					/>
					<Card.Body>
						<Card.Title>Carta</Card.Title>
						<Card.Text>
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This card has even longer content than the first to show that equal height action.
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Ver toda la carta</small>
					</Card.Footer>
				</Card>
			</CardDeck>
		</div>
	);
};
