import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AddMeal } from "./addMeal.jsx";
import { Context } from "../../store/appContext.js";
import { SelectFill } from "../../component/fill-select.jsx";

export const AddMenu = () => {
	const { store, actions } = useContext(Context);
	const [showTemplates, setShowTemplates] = useState(false);
	const [showSection, setShowSection] = useState(false);

	useEffect(() => {
		actions.getMenuType();
	}, []);

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
		console.log(e.value);
		actions.getSections(e.value);
		setShowSection(true);
	};

	return (
		<>
			<SelectFill options_value={store.menus_type} handleSelectType={selectMenuType} />
			{showTemplates ? <SelectFill options_value={store.templates} handleSelectType={selectTemplate} /> : null}
			{showSection
				? store.sections.map((section, index) => {
						return (
							<>
								<h2 key={index}>{section}</h2>

								<AddMeal section={section} />
							</>
						);
				  })
				: null}
		</>
	);
};
