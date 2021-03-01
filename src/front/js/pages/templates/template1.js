import React, { useContext, Fragment, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/template1.scss";
import arrow from "../../../styles/img/flecha.png";

export const Template1 = () => {
	// const { store, actions } = useContext(Context);
	let arrow = require("../../../styles/img/flecha.png");

	const renderFood = () => {
		var indents = [];
		for (var i = 0; i < 3; i++) {
			indents.push(<li key={i}>Es un ejem....... 5 €</li>);
		}
		return indents;
	};

	return (
		<>
			<div className="container template1-container justify-content-center">
				<h2>MENÚ</h2>
				<span>BAR MANOLO</span>
				<div className="row  justify-content-center align-content-center">
					<h3>
						<img src={arrow} /> ENSALADAS <img className="flip-horizontally" src={arrow} />
					</h3>
				</div>
				<div className="row justify-content-center align-content-center">
					<ul>{renderFood()}</ul>
				</div>
				<div className="row justify-content-center align-content-center">
					<h3>
						<img src={arrow} /> SÁNDWICHES <img className="flip-horizontally" src={arrow} />
					</h3>
				</div>
				<div className="row  justify-content-center align-content-center">
					<ul>{renderFood()}</ul>
				</div>
				<div className="row justify-content-center align-content-center">
					<h3>
						<img src={arrow} /> TAPAS <img className="flip-horizontally" src={arrow} />
					</h3>
				</div>
				<div className="row justify-content-center align-content-center">
					<ul>{renderFood()}</ul>
				</div>
			</div>
		</>
	);
};
