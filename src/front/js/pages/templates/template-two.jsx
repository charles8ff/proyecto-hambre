import React, { useState, useEffect, useContext, Fragment } from "react";
import { Context } from "../../store/appContext.js";
import "../../../styles/home.scss";
import { Container, Card, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const Template2 = () => {
	const { store, actions } = useContext(Context);
	const [templateSections, setTemplateSections] = useState([]);
	const [wholeMeals, setWholeMeals] = useState([]);
	const [wholeSections, setWholeSections] = useState([]);
	let meals = [];
	const history = useHistory();
	const getPlaceID = history.location.pathname.replace(/\D/g, "");

	console.log(getPlaceID);

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
			if (store.placeData == false) {
				actions.getProfile(getPlaceID[0]);
				actions.hideNavigation(true);
			}
		},
		[store.placeData]
	);

	useEffect(
		() => {
			if (store.templatePreview == false) {
				actions.hideNavigation(true);
				actions.getSections(2);
				actions.loadMenu(getPlaceID[0], 2); // Place 1 y template 1 (place_id and template_id)
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

	const finalTemplate2 = () => {
		return (
			<div className="container h-100">
				<div className="row justify-content-center align-items-center">
					<Card className="templete--two card--templateTwo">
						<Card.Body>
							<Card.Title>
								<h2>MENU</h2>
							</Card.Title>
							{templateSections.map((elem, index) => {
								return (
									<div key={index}>
										<h3>{elem}</h3>
										<ul>{mealsInHTML(wholeMeals, elem)}</ul>
									</div>
								);
							})}
						</Card.Body>
					</Card>
				</div>
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

	const previewTemplate2 = () => {
		return (
			<>
				<div className="container">
					<div className="row justify-content-center align-items-center">
						<Card className="templete--two card--templateTwo">
							<Card.Body>
								<Card.Title>
									<h2>MENU</h2>
								</Card.Title>
								<h3>PRIMEROS</h3>
								<ul>{renderPreviewFood()}</ul>
								<h3>SEGUNDOS</h3>
								<ul>{renderPreviewFood()}</ul>
								<h3>POSTRES</h3>
								<ul>{renderPreviewFood()}</ul>
							</Card.Body>
						</Card>
					</div>
				</div>
			</>
		);
	};

	return <>{store.templatePreview ? previewTemplate2() : finalTemplate2()}</>;
};
