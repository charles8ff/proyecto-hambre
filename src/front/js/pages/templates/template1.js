import React, { useContext, Fragment, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/template1.scss";
// import arrow from "../../../styles/img/yellowarrow.png";

export const Template1 = () => {
	const { store, actions } = useContext(Context);
	let arrow = require("../../../styles/img/yellowarrow.png");
	// let placeName = store.loggedBusiness.place_name;
	// wholeMenu = actions.loadMenu()
	// templateSections = actions.loadSections()
	let placeName = "BAR MANOLO";
	let templateSections = ["Ensaladas", "Sándwiches", "Tapas", "Pizzas", "Buenardo"];
	let wholeMenu = [
		[
			{
				name: "Ensalada César",
				description: "Tiene pollo y cosas de romanos",
				price: 11.5,
				meal_info: [1, 2, 3, 4, 5]
			},
			{
				name: "Ensalada De Atún",
				description: "Tiene atún y cosas del norte",
				price: 14.5,
				meal_info: [1, 2, 5, 8]
			},
			{
				name: "Ensalada de Pasta",
				description: "No lechuga",
				price: 9.5,
				meal_info: [1, 2, 3, 4, 5, 6, 7]
			}
		],
		[
			{
				name: "Sandwich Mixto",
				description: "Con X de miXta",
				price: 4.5,
				meal_info: []
			},
			{
				name: "Sandwich De Atún",
				description: "Tiene atún y pan",
				price: 6.5,
				meal_info: [6]
			},
			{
				name: "Sandwich de la Casa",
				description: "No lechuga",
				price: 9.5,
				meal_info: [2]
			},
			{
				name: "Sandwich Vegetal",
				description: "Jimena approves",
				price: 3.5,
				meal_info: [6]
			}
		]
	];
	let mealsInHTML = [];
	for (let i = 0; i < wholeMenu.length; i++) {
		mealsInHTML.push(
			wholeMenu[i].map((elem, index) => {
				return (
					<ul key={index}>
						{elem.name}
						<span className="ml-2 mr-1">.....</span>
						{elem.price}
						{"€"}
					</ul>
				);
			})
		);
	}
	let sectionsInHTML = templateSections.map((elem, index) => {
		return (
			<>
				<div className="row  justify-content-center align-content-center">
					<h3>
						<img src={arrow} /> {elem} <img className="flip-horizontally" src={arrow} />
					</h3>
				</div>
				<div className="row justify-content-center align-content-center">
					<ul>{mealsInHTML[index]}</ul>
				</div>
			</>
		);
	});

	return (
		<>
			<div className="container-fluid template1--container justify-content-center">
				<h2>MENÚ</h2>
				<span className="place_name">{placeName}</span>
				{sectionsInHTML}
			</div>
		</>
	);
};
