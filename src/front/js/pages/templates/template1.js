import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/template1.scss";
// import arrow from "../../../styles/img/yellowarrow.png";

const URLBACKEND = "https://3001-peach-hamster-hxks95vb.ws-eu03.gitpod.io";
const arrow = require("../../../styles/img/yellowarrow.png");

export const Template1 = () => {
	const { store, actions } = useContext(Context);
	// const history = useHistory();

    

	return (
		<>
			<div className="container-fluid template1--container justify-content-center">
				<h2>MENÚ</h2>
				<span>BAR MANOLO</span>
				{/* ^future props */}
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