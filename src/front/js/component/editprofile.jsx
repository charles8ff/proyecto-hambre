import React, { Fragment, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Jumbotron, Row, Col, Card, Button } from "react-bootstrap";
import { MenusView } from "./menusview.jsx";
import { useHistory } from "react-router-dom";
import { OurButton } from "./button.jsx";

export const EditProfile = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(
		() => {
			actions.getProfile(history.location.pathname);
		},
		[history.location.pathname]
	);
	return (
		<>
			<Jumbotron className="jumbotron">
				<Container>
					<Row>
						<Col md={5} lg={5} className="pb-5">
							<Card className="box box--contains">
								<div className="avatar">
									<img src="https://www.pizzeriagastrobarlafundacion.es/wp-content/uploads/2019/04/slider-new1.jpg" />
								</div>
								<Card.Body>
									<Card.Title>
										<h2 className="details">{store.loggedBusiness.email}</h2>
									</Card.Title>
								</Card.Body>
							</Card>
						</Col>
						<Col md={6} lg={6} className="pb-5">
							<Card className="box box--contains">
								<Card.Body>
									<div className="details">
										<div className="d-flex flex-row">
											<i className="fas fa-color fa-lg fa-map-marker-alt" />

											<input />
										</div>
										<div className="d-flex flex-row">
											<i className="fas fa-color fa-lg fa-phone" />

											<input />
										</div>
										<div className="d-flex flex-row">
											<i className="far fa-color fa-clock" />
											<input />
											<h3> - </h3>
											<input />
										</div>
										<div className="d-flex flex-row p-2">
											<h3>Descripción</h3>

											<textarea />
										</div>
										<OurButton title="Guardar cambios" />
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
			<MenusView />
		</>
	);
};
