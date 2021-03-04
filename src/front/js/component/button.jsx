import React, { useContext, Fragment } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const OurButton = props => {
	const className = "fill ml-auto " + props.hide;

	return (
		<>
			<button onClick={props.click} className={className}>
				{props.title}
			</button>
		</>
	);
};

OurButton.propTypes = {
	title: PropTypes.string,
	click: PropTypes.func,
	hide: PropTypes.string
};
