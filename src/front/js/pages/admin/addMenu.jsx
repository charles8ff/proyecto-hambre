import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AddMeal } from "./addMeal.jsx";
import { Context } from "../../store/appContext.js";
import { SelectFill } from "../../component/fill-select.jsx";

import "../../../styles/login.scss";

import { Template2 } from "../templates/template-two.jsx";
import { Template1 } from "../templates/template1.jsx";
import { Error404 } from "../404.jsx";

export const AddMenu = () => {
	const { store, actions } = useContext(Context);
	const [showTemplates, setShowTemplates] = useState(false);
	const [showSection, setShowSection] = useState(false);
	const [previewTemplate, setPreviewTemplate] = useState(0);
	let allMeals = {};
	const history = useHistory();

	const getPlaceID = history.location.pathname.replace(/\D/g, "");

	useEffect(() => {
		actions.hideNavigation(true);
		actions.isPreviewTemplate(true);
	}, []);

	useEffect(
		() => {
			for (let name of store.sections) {
				localStorage.removeItem(name);
			}
		},
		[store.sections]
	);

	const onSubmit = () => {
		for (let name of store.sections) {
			let obj = JSON.parse(localStorage.getItem(name));
			allMeals = { ...allMeals, ...obj };
		}
		actions.postMeal(allMeals);
		history.push(`/place/${JSON.parse(localStorage.getItem("`Place`")).id}`); //AÑADIR HISTORY PUSH TO LOCALSTORAGE USER ID
	};

	const selectMenuType = e => {
		if (e.label === "Menú del día") {
			actions.getTemplates(e.value);
			setShowTemplates(true);
		} else if (e.label === "Carta") {
			actions.getTemplates(e.value);
			setShowTemplates(true);
		}
	};

	const selectTemplate = e => {
		actions.getSections(e.value);
		actions.userSelectTemplate(e.value);
		setPreviewTemplate(e.value);
	};

	const selectTemplateView = () => {
		return (
			<>
				<div className="SelectTemplate__CardForm">
					<SelectFill options_value={store.menus_type} handleSelectType={selectMenuType} />
					{showTemplates ? (
						<SelectFill options_value={store.templates} handleSelectType={selectTemplate} />
					) : null}
				</div>
				{previewTemplate == 1 ? (
					<>
						<button onClick={() => setShowSection(true)} className="btn mt-5 mb-5">
							Seleccionar esta plantilla
						</button>
						<Template1 />{" "}
					</>
				) : null}
				{previewTemplate == 2 ? (
					<>
						<button onClick={() => setShowSection(true)} className="btn mt-5 mb-5">
							Seleccionar esta plantilla
						</button>
						<Template2 />{" "}
					</>
				) : null}
			</>
		);
	};

	const toCreateMenuView = () => {
		return (
			<>
				{store.sections.map((section, index) => {
					return (
						<>
							<h4 className="mb-3 mt-3" key={index}>
								{section}
							</h4>

							<AddMeal section={section} />
						</>
					);
				})}
				<div className="d-flex flex-row justify-content-center">
					<button className="btn-home mt-5 mb-5" onClick={() => onSubmit()}>
						Guardar Menu
					</button>
				</div>
			</>
		);
	};

	const toRenderMenuAdd = () => {
		return (
			<div className="AddMenu">
				<div className="container">
					<div className="row UserAcess__FullHeight justify-content-center">
						<div className="col-12 pb-5">
							<div className="UserAcess__Card mx-auto">
								<div className="UserAcess__CardWrapper">
									<div className="AddMenu__Card">
										<div className="UserAcess__Card--content text-center" />
										{!showSection ? selectTemplateView() : toCreateMenuView()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return <>{toRenderMenuAdd()}</>;
};
