import React, { Component } from "react";
import PropTypes from "prop-types";

export const Footer = props => (
	<footer className="footer mt-auto py-3 footer--background-color container-fluid">
		<div className="row d-flex justify-content-center">
			<div className="col-2 text-white">Project Hunger</div>
			<div className="offset-7 col-2 text-white">
				{props.footer_text}
				<a className="p-3 footer--link-color" href={props.footer_url}>
					Click aquí
				</a>
			</div>
		</div>
	</footer>
);
Footer.propTypes = {
	footer_text: PropTypes.string,
	footer_url: PropTypes.string
};
