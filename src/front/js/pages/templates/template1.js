import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/template1.scss";

const URLBACKEND = "https://3001-peach-hamster-hxks95vb.ws-eu03.gitpod.io";
const arrow = require("../../../styles/img/yellowarrow.png");

export const Template1 = () => {
	const { store, actions } = useContext(Context);
	let place_id = actions.decodeToken(store.loginToken).sub.id;
	const [templateSections, setTemplateSections] = useState([]);
	const [wholeMeals, setWholeMeals] = useState([]);
	const [wholeSections, setWholeSections] = useState([]);
	let meals = [];

	const mealsInHTML = (mealArray, section_name) => {
		let filteredMeals = mealArray.filter(elem => elem.name == section_name);
		for (let i = 0; i < filteredMeals.length; i++) {
			meals = filteredMeals.map((elem, index) => {
				return (
					<ul key={index}>
						{elem.meal_name}
						<span className="ml-2 mr-1">.....</span>
						{elem.meal_price}
						{"€"}
					</ul>
				);
			});
			return meals;
		}
	};
	useEffect(
		() => {
			actions.hideNavigation(true);
			actions.getSections(1);
			actions.loadMenu(place_id, 1); // Place 1 y template 1 (place_id and template_id)
		},
		[!store.templatePreview]
	);

	console.log("HOAÑKSDJKLASDJ", templateSections);

	useEffect(
		() => {
			console.log("ajlsdhkjasdh");
			setTemplateSections(store.sections); //Info from sections
			setWholeMeals(store.allSections); // getAllMeals
		},
		[store.allSections]
	);

	const finalTemplate1 = () => {
		return (
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
								<ul>{mealsInHTML(wholeMeals, elem)}</ul>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	const renderPreviewFood = () => {
		var indents = [];
		for (var i = 0; i < 3; i++) {
			indents.push(<li key={i}>Es un ejemplo.......5 €</li>);
		}
		return indents;
	};

	const previewTemplate = () => {
		return (
			<div className="container-fluid template1--container justify-content-center">
				<h2>MENÚ</h2>
				<div className="row  justify-content-center align-content-center">
					<h3>
						<img src={arrow} /> ENSALADAS <img className="flip-horizontally" src={arrow} />
					</h3>
				</div>
				<div className="row justify-content-center align-content-center">
					<ul>{renderPreviewFood()}</ul>
				</div>
				<div className="row justify-content-center align-content-center">
					<h3>
						<img src={arrow} /> SÁNDWICHES <img className="flip-horizontally" src={arrow} />
					</h3>
				</div>
				<div className="row  justify-content-center align-content-center">
					<ul>{renderPreviewFood()}</ul>
				</div>
				<div className="row justify-content-center align-content-center">
					<h3>
						<img src={arrow} /> TAPAS <img className="flip-horizontally" src={arrow} />
					</h3>
				</div>
				<div className="row justify-content-center align-content-center">
					<ul>
						{renderPreviewFood()}
						{renderPreviewFood()}
						{renderPreviewFood()}
					</ul>
				</div>
			</div>
		);
	};

	return <>{store.templatePreview ? previewTemplate() : finalTemplate1()}</>;
};
