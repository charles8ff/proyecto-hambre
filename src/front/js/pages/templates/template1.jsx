import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/template1.scss";
const arrow = require("../../../styles/img/yellowarrow.png");

export const Template1 = () => {
	const { store, actions } = useContext(Context);
	const [templateSections, setTemplateSections] = useState([]);
	const [wholeMeals, setWholeMeals] = useState([]);
	const [wholeSections, setWholeSections] = useState([]);
	let meals = [];
	const history = useHistory();
	const getPlaceID = history.location.pathname.match(/\d/);

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
			//	actions.getProfile(getPlaceID[0]);
			actions.hideNavigation(true);
		},
		[store.placeData]
	);

	//console.log(getPlaceID[0]);

	useEffect(
		() => {
			if (store.templatePreview == false) {
				actions.hideNavigation(true);
				actions.getSections(1);
				actions.loadMenu(getPlaceID[0], 1); // Place 1 y template 1 (place_id and template_id)
			}
		},
		[store.templatePreview]
	);
	useEffect(
		() => {
			setTemplateSections(store.sections); //Info from sections
			setWholeMeals(store.allSections); // getAllMeals
		},
		[store.allSections]
	);

	console.log(store.templatePreview);

	const finalTemplate1 = () => {
		return (
			<div className="container-fluid template1--container justify-content-center h-100">
				<h2>MENÚ</h2>
				<span className="place_name">{store.placeData.place_name}</span>
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
