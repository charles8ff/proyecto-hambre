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
	const getPlaceID = history.location.pathname.split("/");
	const getMealInfo = [
		{
			url: "https://i.imgur.com/dtpzG2k.png",
			name: "Gluten"
		},
		{
			url: "https://i.imgur.com/DgfrxUa.png",
			name: "Cacahuetes"
		},
		{
			url: "https://i.imgur.com/SEFHs4K.png",
			name: "Frutos Secos"
		},
		{
			url: "https://i.imgur.com/jjFoTc7.png",
			name: "Apio"
		},
		{
			url: "https://i.imgur.com/TePCu6L.png",
			name: "Mostaza"
		},
		{
			url: "https://i.imgur.com/8V96M0O.png",
			name: "Huevos"
		},
		{
			url: "https://i.imgur.com/vU8Xsfi.png",
			name: "Leche"
		},
		{
			url: "https://i.imgur.com/jgP7fiA.png",
			name: "Sésamo"
		},
		{
			url: "https://i.imgur.com/4CoWCkc.png",
			name: "Pescado"
		},
		{
			url: "https://i.imgur.com/oTOnO2r.png",
			name: "Crustaceo"
		},
		{
			url: "https://i.imgur.com/7sgZjjj.png",
			name: "Moluscos"
		},
		{
			url: "https://i.imgur.com/cg1uWnr.png",
			name: "Soja"
		},
		{
			url: "https://i.imgur.com/2LDlTSv.png",
			name: "Sulfitos"
		},
		{
			url: "https://i.imgur.com/aS8z8Q3.png",
			name: "Altramuces"
		},
		{
			url: "https://i.imgur.com/KZuBX9F.png",
			name: "Vegatariano"
		},
		{
			url: "https://i.imgur.com/uHEoATb.png",
			name: "Vegano"
		}
	];

	const mealsInHTML = (mealArray, section_name) => {
		let filteredMeals = mealArray.filter(elem => elem.name == section_name);
		for (let i = 0; i < filteredMeals.length; i++) {
			meals = filteredMeals.map((elem, index) => {
				return (
					<>
						<li key={index}>
							{elem.meal_name}
							<span className="ml-2 mr-1">.....</span>
							{elem.meal_price}
							{"€"}
						</li>
						{elem.meal_info.map((c, i) => {
							return (
								<span key={i}>
									{<img className="meal_img" src={getMealInfo[c.id - 1].url} />}{" "}
									{getMealInfo[c.id - 1].name}
								</span>
							);
						})}
					</>
				);
			});
			return meals;
		}
	};

	useEffect(
		() => {
			if (store.placeData == false) {
				actions.getProfile(getPlaceID[2]);
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
				actions.loadMenu(getPlaceID[2], 2); // Place 1 y template 1 (place_id and template_id)
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
