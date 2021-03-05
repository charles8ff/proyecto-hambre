import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AddMeal } from "./addMeal.jsx";
import { Context } from "../../store/appContext.js";

export const AddMenu = () => {
	const { store, actions } = useContext(Context);
	let section = ["Primeros", "Segundos", "Postres", "Tapas"];

	return (
		<>
			{section.map((section, index) => {
				return (
					<>
						<h2 key={index}>{section}</h2>

						<AddMeal section={section} />
					</>
				);
			})}
		</>
	);
};
