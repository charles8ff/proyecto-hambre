import React, { useContext, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import "../../../styles/login.scss";

import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

export const AddMeal = props => {
	const { store, actions } = useContext(Context);
	const { register, control, handleSubmit, watch } = useForm({
		defaultValues: {
			meal: [
				{
					name: "",
					description: "",
					price: "",
					meal_info: ""
				}
			]
		}
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "meal"
	});
	const getDataAllFields = watch();

	const addMeal = (data, section) => {
		localStorage.setItem(section.toString(), JSON.stringify(data));
	};

	const [inputList, setInputList] = useState(["Añade tu plato"]);
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index] = value;
		setInputList(list);
	};

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

	return (
		<>
			{fields.map((item, index) => {
				return (
					<Accordion key={item.id} allowZeroExpanded>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton>{JSON.stringify(inputList[index])}</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<div className="inputContainer">
									<i className="fas fa-utensils icon" />
									<input
										name={`${props.section}[${index}].name`}
										type="text"
										defaultValue={`${item.name}`} // make sure to set up defaultValue
										placeholder="Ensalada cesar"
										className="AddMenu__Input--Style mb-3"
										ref={register({ required: true })}
										onChange={e => handleInputChange(e, index)}
									/>
								</div>
								<div className="inputContainer">
									<i className="fas fa-file-alt icon--textarea" />
									<textarea
										name={`${props.section}[${index}].description`}
										defaultValue={`${item.description}`} // make sure to set up defaultValue
										placeholder="Ensalada de lechuga romana y croûtons (trozos de pan tostado) con jugo de limón..."
										className="AddMenu__Input--Style AddMenu__Input--Style--TextArea mb-3"
										ref={register({ required: true })}
									/>
								</div>
								<div className="inputContainer">
									<i className="fas fa-euro-sign icon--price" />
									<input
										name={`${props.section}[${index}].price`}
										defaultValue={`${item.price}`} // make sure to set up defaultValueç
										placeholder="12,5"
										className="AddMenu__InputPrice--Style mb-3"
										ref={register({ required: true })}
										onBlur={() => addMeal(getDataAllFields, props.section)}
									/>
									<div className="meal_info_check">
										{getMealInfo.map((c, i) => (
											<label className="meal_info_label" key={i}>
												<input
													type="checkbox"
													value={i + 1}
													name={`${props.section}[${index}].meal_info`}
													ref={register({ required: true })}
													onBlur={() => addMeal(getDataAllFields, props.section)}
												/>
												{<img className="meal_img" src={c.url} />} {c.name}
											</label>
										))}
									</div>
								</div>
								<button type="button" className="btn-button mb-2" onClick={() => remove(index)}>
									<i className="fas fa-trash-alt mr-2" /> Borrar plato
								</button>
							</AccordionItemPanel>
						</AccordionItem>
					</Accordion>
				);
			})}
			<button
				type="button"
				className="btn-button"
				onClick={() => {
					append({
						name: "",
						description: "",
						price: "",
						meal_info: ""
					});
				}}>
				<i className="fas fa-plus mr-2" /> Añadir nuevo plato
			</button>
		</>
	);
};

AddMeal.propTypes = {
	section: PropTypes.string
};
