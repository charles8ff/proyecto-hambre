import React, { Fragment, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Jumbotron, Row, Col, Card, Button } from "react-bootstrap";
import { MenusView } from "./menusview.jsx";

export const Profile = () => {
	const { store, actions } = useContext(Context);
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
											<h3>{store.loggedBusiness.address}</h3>
										</div>
										<div className="d-flex flex-row">
											<i className="fas fa-color fa-lg fa-phone" />
											<h3>{store.loggedBusiness.phone_number}</h3>
										</div>
										<div className="d-flex flex-row">
											<i className="far fa-color fa-clock" />
											<h3>
												{"Horario"}
												{store.loggedBusiness.open_hour}
												{" - "}
												{store.loggedBusiness.close_hour}
											</h3>
										</div>
										<p className="p-5">{store.loggedBusiness.description}</p>
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
