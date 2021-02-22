import React, { useContext, Fragment } from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const BUTTON = props => {
	return (
		<>
			<button onClick={props.click} className="fill ml-auto">
				{props.title}
			</button>
		</>
	);
};

BUTTON.propTypes = {
	title: PropTypes.string,
	click: PropTypes.func
};
