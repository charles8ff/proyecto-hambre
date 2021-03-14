import React, { useContext, Fragment } from "react";
import Select from "react-select";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const SelectFill = props => {
	return <Select options={props.options_value} onChange={e => props.handleSelectType(e)} />;
};

SelectFill.propTypes = {
	options_value: PropTypes.any,
	handleSelectType: PropTypes.func
};
