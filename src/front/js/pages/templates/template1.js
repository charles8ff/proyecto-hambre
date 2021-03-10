import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/template1.scss";
// import arrow from "../../../styles/img/yellowarrow.png";
import { useScreenshot } from "use-react-screenshot";

const URLBACKEND = "https://3001-peach-hamster-hxks95vb.ws-eu03.gitpod.io";
// const arrow = require("../../../styles/img/yellowarrow.png");

export const Template1 = () => {
	const { store, actions } = useContext(Context);
	const { image, takeScreenshot } = useScreenshot();
	// const history = useHistory();

	const renderFood = () => {
		var indents = [];
		for (var i = 0; i < 3; i++) {
			indents.push(<li key={i}>Es un ejemplo.......5 €</li>);
		}
		return indents;
	}; //relleno

	return (
		<>
			<div className="container-fluid template1--container justify-content-center">
				<h2>MENÚ</h2>
				<span>BAR MANOLO</span>
				<div className="row  justify-content-center align-content-center">
					<h3>ENSALADAS</h3>
				</div>
				<div className="row justify-content-center align-content-center">
					<ul>{renderFood()}</ul>
				</div>
				<div className="row justify-content-center align-content-center">
					<h3>SÁNDWICHES</h3>
				</div>
				<div className="row  justify-content-center align-content-center">
					<ul>{renderFood()}</ul>
				</div>
				<div className="row justify-content-center align-content-center">
					<h3>TAPAS</h3>
				</div>
				<div className="row justify-content-center align-content-center">
					<ul>
						{renderFood()}
						{renderFood()}
						{renderFood()}
					</ul>
				</div>
			</div>
		</>
	);
};
