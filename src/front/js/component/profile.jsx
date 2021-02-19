import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Jumbotron, Row, Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const Profile = props => {
	return (
		<>
			<Jumbotron className="jumbotron">
				<Container>
					<Row>
						<Col md={5} lg={5} className="pb-5">
							<Card className="box box--contains">
								<div className="avatar">
									<img src={props.profile_img} />
								</div>
								<Card.Body>
									<Card.Title>
										<h2 className="details">{props.place_name}</h2>
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
											<h3>{props.place_address}</h3>
										</div>
										<div className="d-flex flex-row">
											<i className="fas fa-color fa-lg fa-phone" />
											<h3>{props.place_telephone}</h3>
										</div>
										<div className="d-flex flex-row">
											<i className="far fa-color fa-clock" />
											<h3>
												{props.open_time}
												{props.close_time}
											</h3>
										</div>
										<p className="p-5">{props.place_description}</p>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
		</>
	);
};

Profile.propTypes = {
	profile_img: PropTypes.string,
	place_name: PropTypes.string,
	place_address: PropTypes.string,
	place_description: PropTypes.string,
	open_time: PropTypes.string,
	close_time: PropTypes.string,
	place_telephone: PropTypes.string
};
