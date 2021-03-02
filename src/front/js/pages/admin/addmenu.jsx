import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AccountCircle as AccountCircleIcon, HistoryRounded } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
	Avatar,
	Grid,
	Container,
	CssBaseline,
	FormControlLabel,
	Button,
	Link,
	Checkbox,
	Typography
} from "@material-ui/core";
import { CssTextField, useStyles } from "../../pages/styles.js";
import { useForm, useFieldArray } from "react-hook-form";
import { Context } from "../../store/appContext.js";
import { Row } from "react-bootstrap";

export const AddMenu = () => {
	const { register, handleSubmit, errors, control } = useForm();
	const { fields, append, remove } = useFieldArray({
		name: "ingredients",
		control
	});

	const submitForm = formData => {
		console.log(formData);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div>
				<div>
					<Typography component="h1" variant="h4">
						Añade tu restaurante
					</Typography>
				</div>
				<form noValidate onSubmit={handleSubmit(submitForm)}>
					<CssTextField
						name="name"
						label="Titulo"
						type="text"
						id="name"
						variant="outlined"
						margin="normal"
						inputRef={register({ required: "Recipe name is required." })}
						error={!!errors.place_name}
						fullWidth
					/>
					{fields.map((field, index) => {
						return (
							<Row key={field.id}>
								<CssTextField
									type="text"
									inputRef={register()}
									name={`ingredients[${index}].name`}
									id={`ingredients[${index}].name`}
								/>
								<CssTextField
									label="Amount"
									type="text"
									inputRef={register()}
									defaultValue={field.amount}
									name={`ingredients[${index}].amount`}
									id={`ingredients[${index}].amount`}
								/>

								<Button type="button" onClick={() => remove(index)}>
									&#8722;
								</Button>
							</Row>
						);
					})}
					<Button type="button" onClick={() => append({ name: "", amount: "" })}>
						Add ingredient
					</Button>
					<Button type="submit" fullWidth variant="contained">
						Sign up
					</Button>
				</form>
			</div>
		</Container>
	);
};
