import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	return (
		<div className="jumbotron">
			<div>Now showing post {theid}</div>;<hr className="my-4" />
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
