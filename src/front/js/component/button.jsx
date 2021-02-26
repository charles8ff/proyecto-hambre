import React, { useContext, Fragment } from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const ourButton = props => {
	return (
		<>
			<button onClick={props.click} className="fill ml-auto">
				{props.title}
			</button>
		</>
	);
};

ourButton.propTypes = {
	title: PropTypes.string,
	click: PropTypes.func
};
