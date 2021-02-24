import React, { Component } from "react";
import PropTypes from "prop-types";

export const Footer = props => (
	<footer className="footer mt-auto py-3 container-fluid">
		<div className="row d-flex justify-content-center">
			<div className="col-2">Project Hunger</div>
			<div className="offset-7 col-2">
				{props.footer_text}
				{"  "}
				<a href={props.footer_url}>Click aquí</a>
			</div>
		</div>
	</footer>
);
Footer.propTypes = {
	footer_text: PropTypes.string,
	footer_url: PropTypes.string
};
