import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const Benefits = props => {
	return (
		<div className="col-12 col-lg-6 col-xl-4">
			<div className="card user-card">
				<div className="card-block">
					<div className="user-image">
						<img src={props.img} alt="Conoce nuestros beneficios" />
					</div>
					<hr />
					<p className="m-t-15 text-muted">{props.text}</p>
				</div>
			</div>
		</div>
	);
};

Benefits.propTypes = {
	img: PropTypes.string,
	text: PropTypes.string
};
