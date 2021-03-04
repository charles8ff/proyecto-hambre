import React, { useState, useContext, Fragment } from "react";
import { Context } from "../../store/appContext";
import { AddMeal } from "./addMeal.jsx";
import { Formulario } from "./form.jsx";

export const AddMenu = () => {
	const { store, actions } = useContext(Context);
	const [inputList, setInputList] = useState([]);

	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const handleAddClick = index => {
		console.log(index);
		//console.log(index);
		//setInputList([[...inputList, { name: "", description: "", price: "", meal_info: [1, 2, 3] }]]);
	};
	return (
		<>
			{store.section.map((section, index) => {
				return (
					<>
						<h2 key={index}>{section}</h2>

						<AddMeal
							ListMeal={inputList}
							HandleOnChange={handleInputChange}
							remove={handleRemoveClick}
							add={() => handleAddClick(index)}
						/>
					</>
				);
			})}
		</>
	);
};
