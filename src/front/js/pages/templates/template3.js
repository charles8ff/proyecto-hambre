import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Container, Card, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";

import "../../../styles/template3.scss";
const URLBACKEND = "https://3001-peach-hamster-hxks95vb.ws-eu03.gitpod.io";

export const Template3 = () => {
	const { store, actions } = useContext(Context);

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

	useEffect(() => {
		actions.loadSections(1);
		actions.loadMenu(1, 1);
	}, []);

	useEffect(
		() => {
			setTemplateSections(store.titleSections);
			setWholeMeals(store.allSections);
		},
		[store.allSections]
	);

	const renderFood = () => {
		var indents = [];
		for (var i = 0; i < 3; i++) {
			indents.push(<li key={i}>Es un ejemplo de comida.................... 5 Euros</li>);
		}

		return indents;
	};
	return (
		<>
			{/* <div className="container-fluid template3--container justify-content-center">
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
			</div> */}
			<div className="container-fluid template3--container justify-content-center">
				<h2>MENU</h2>
				<span className="place_name">BAR MANOLO</span>
				<div className="row  justify-content-center align-content-center">
					<h3>PRIMEROS</h3>
				</div>
				<div className="row  justify-content-center align-content-center">
					<ul>{renderFood()}</ul>
				</div>
				<div className="row  justify-content-center align-content-center">
					<h3>SEGUNDOS</h3>
				</div>
				<div className="row  justify-content-center align-content-center">
					<ul>{renderFood()}</ul>
				</div>
				<div className="row  justify-content-center align-content-center">
					<h3>POSTRES</h3>
				</div>
				<div className="row  justify-content-center align-content-center">
					<ul>{renderFood()}</ul>
				</div>
			</div>
		</>
	);
};
