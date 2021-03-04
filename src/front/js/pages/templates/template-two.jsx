import React, { useContext, Fragment, useEffect, useState } from "react";
import { Context } from "../../store/appContext.js";
import "../../../styles/home.scss";
import { Container, Card, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";

export const TemplateTwo = () => {
	const { store, actions } = useContext(Context);
	const renderFood = () => {
		var indents = [];
		for (var i = 0; i < 3; i++) {
			indents.push(<li key={i}>Es un ejemplo de comida.................... 5 Euros</li>);
		}
		return indents;
	};

	useEffect(() => {
		actions.hideNavigation();
	}, []);

	return (
		<>
			<Container>
				<Row>
					<Col md={{ span: 6, offset: 4 }}>
						<Card className="templete--two">
							<Card.Body>
								<Card.Title>
									<h2>MENU</h2>
								</Card.Title>
								<h3>PRIMEROS</h3>
								<ul>{renderFood()}</ul>
								<h3>SEGUNDOS</h3>
								<ul>{renderFood()}</ul>
								<h3>POSTRES</h3>
								<ul>{renderFood()}</ul>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
