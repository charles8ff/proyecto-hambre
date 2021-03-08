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

	const [templateSections, setTemplateSections] = useState([]);

	const [wholeMeals, setWholeMeals] = useState([]);
	const [wholeSections, setWholeSections] = useState([]);

	let auxiliarmeals = [];

	const loadSectionNames = async () => {
		const response = await fetch(URLBACKEND + `/api/template/1`);
		const data = await response.json();
		let sections = data.map(elem => {
			return elem.name;
		});
		setTemplateSections(sections);
	};

	const loadMeals = async () => {
		const response = await fetch(URLBACKEND + `/api/place/1/template/1`);
		const data = await response.json();
		setWholeMeals(data);
	};

	const mealsInHTML = mealArray => {
		for (let i = 0; i < mealArray.length; i++) {
			meals = mealArray[i].map((elem, index) => {
				return (
					<ul key={index}>
						{elem.name}
						<span className="ml-2 mr-1">.....</span>
						{elem.price}
						{"€"}
					</ul>
				);
			});
		}
	};
	useEffect(() => {
		loadSectionNames();
		loadMeals();
		// var xd = actions.loadMenu(1, 1);
		// console.log(xd);
		// setWholeMeals(xd);
	}, []);

	return (
		<>
			<div className="container-fluid template1--container justify-content-center">
				<h2>MENÚ</h2>
				<span className="place_name">{store.loggedBusiness.place_name}</span>
				{templateSections.map((elem, index) => {
					return (
						<div key={index}>
							<div className="row  justify-content-center align-content-center">
								<h3>
									<img src={arrow} /> {elem} <img className="flip-horizontally" src={arrow} />
								</h3>
							</div>
							<div className="row justify-content-center align-content-center">
								<ul>{mealsInHTML[index]}</ul>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
