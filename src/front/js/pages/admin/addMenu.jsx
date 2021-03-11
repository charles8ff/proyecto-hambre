import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AddMeal } from "./addMeal.jsx";
import { Context } from "../../store/appContext.js";
import { SelectFill } from "../../component/fill-select.jsx";

import "../../../styles/login.scss";

import { TemplateTwo } from "../templates/template-two.jsx";

export const AddMenu = () => {
	const { store, actions } = useContext(Context);
	const [showTemplates, setShowTemplates] = useState(false);
	const [showSection, setShowSection] = useState(false);
	const [previewTemplate, setPreviewTemplate] = useState(0);
	let allMeals = {};

	useEffect(() => {
		actions.hideNavigation(true);
		actions.getMenuType();
	}, []);

	const onSubmit = () => {
		for (let name of store.sections) {
			let obj = JSON.parse(localStorage.getItem(name));
			allMeals = { ...allMeals, ...obj };
		}
		actions.postMeal(allMeals);
	};

	const selectMenuType = e => {
		if (e.label === "Menu del día") {
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
						<TemplateTwo />{" "}
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

	return (
		<>
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
		</>
	);
};
