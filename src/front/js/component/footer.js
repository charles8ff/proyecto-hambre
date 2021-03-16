import React, { Component } from "react";

//import PropTypes from "prop-types";

export const Footer = () => {
	return (
		<footer className="text-center text-white">
			<div className="container p-4 pb-0">
				<section className="mb-4">
					<a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
						<i className="fab fa-facebook-f" />
					</a>

					<a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
						<i className="fab fa-twitter" />
					</a>
				</section>
			</div>
			<div className="text-center p-3">© 2021 Copyright: DMenu.com</div>
		</footer>
	);
};
