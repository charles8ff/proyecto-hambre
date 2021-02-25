import React, { useContext, Fragment } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import PropTypes from "prop-types";

const BUTTON = props => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<button onClick={props.click} className="fill ml-auto">
				{props.title}
			</button>
		</>
	);
};
export default BUTTON;

BUTTON.propTypes = {
	title: PropTypes.string,
	click: PropTypes.func
};
