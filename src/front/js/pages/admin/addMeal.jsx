import React, { useState, useContext, useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";

import "../../../styles/home.scss";

export const AddMeal = props => {
	const { store, actions } = useContext(Context);
	const { register, control, handleSubmit, watch } = useForm({
		defaultValues: {
			meal: [
				{
					name: "Ensalada César",
					description: "Es una ensalada de pollo tomate y salsa césar",
					price: "5"
					//meal_info: [1, 2, 3]
				}
			]
		}
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "meal"
	});
	const getDataAllFields = watch();

	let sections = ["Primeros", "Segundos", "Postres", "Tapas"];
	let allMeals = {};

	useEffect(() => {
		for (let name of sections) {
			localStorage.removeItem(name.toString());
		}
	}, []);

	const onSubmit = () => {
		for (let name of sections) {
			let obj = JSON.parse(localStorage.getItem(name));
			allMeals = { ...allMeals, ...obj };
		}
	};

	const addMeal = (data, section) => {
		localStorage.setItem(section.toString(), JSON.stringify(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ul>
				{fields.map((item, index) => {
					return (
						<li key={item.id}>
							<input
								name={`${props.section}[${index}].name`}
								defaultValue={`${item.name}`} // make sure to set up defaultValue
								ref={register()}
							/>
							<input
								name={`${props.section}[${index}].description`}
								defaultValue={`${item.description}`} // make sure to set up defaultValue
								ref={register()}
							/>
							<input
								name={`${props.section}[${index}].price`}
								defaultValue={`${item.price}`} // make sure to set up defaultValue
								ref={register()}
								onBlur={() => addMeal(getDataAllFields, props.section)}
							/>
							<button type="button" onClick={() => remove(index)}>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
			<section>
				<button
					type="button"
					onClick={() => {
						append({ firstName: "appendBill", lastName: "appendLuo" });
					}}>
					append
				</button>
			</section>

			<input type="submit" />
		</form>
	);
};

AddMeal.propTypes = {
	section: PropTypes.string
};
