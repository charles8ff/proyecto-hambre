import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/template1.scss";
const arrow = require("../../../styles/img/yellowarrow.png");

export const Template1 = () => {
	const { store, actions } = useContext(Context);
	const [templateSections, setTemplateSections] = useState([]); // borrar esto en el resto
	const [wholeMeals, setWholeMeals] = useState([]);
	const [wholeSections, setWholeSections] = useState([]); // borrar esto en el resto
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
			name: "Crustáceo"
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
			name: "Vegetariano"
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
				actions.getSections(1);
				actions.loadMenu(getPlaceID[2], 1); // Place 1 y template 1 (place_id and template_id)
			}
		},
		[store.templatePreview]
	);
	useEffect(
		() => {
			setWholeMeals(store.allSections); // getAllMeals
		},
		[store.allSections]
	);

	const finalTemplate1 = () => {
		return (
			<div className="container-fluid h-100 template1--container justify-content-center">
				<h2>MENÚ</h2>
				<span className="place_name">{store.placeData.place_name}</span>
				{store.sections.map((elem, index) => {
					return (
						<div key={index}>
							<div className="row  justify-content-center align-content-center">
								<h3>
									<img src={arrow} /> {elem} <img className="flip-horizontally" src={arrow} />
								</h3>
							</div>
							<div className="row justify-content-center align-content-center">
								<ul>{mealsInHTML(wholeMeals, elem)}</ul>
								<ul>{renderPreviewFood()}</ul>
							</div>
						</div>
					);
				})}

				<div
					className={
						store.loginToken && actions.decodeToken(store.loginToken).sub.id == store.placeData.id
							? "container d-flex flex-row justify-content-center"
							: "d-none"
					}>
					<button className="btn-home p-3" onClick={() => console.log("errrre")}>
						Volver al perfil
					</button>
				</div>
			</div>
		);
	};

	const renderPreviewFood = () => {
		let indents = [];
		for (let i = 0; i < 3; i++) {
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
