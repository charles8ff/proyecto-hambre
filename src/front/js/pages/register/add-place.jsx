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
import { CssTextField, useStyles } from "./styles.js";
import { useForm, Controller } from "react-hook-form";
import { Context } from "../../store/appContext";

export const AddPlace = () => {
	const { store, actions } = useContext(Context);
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, control, errors } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			place_name: "",
			address: "",
			phone_number: "",
			open_hour: "",
			close_hour: "",
			description: ""
		}
	});

	const onSubmit = data => {
		actions.registerPlace(data);
	};

	useEffect(
		() => {
			if (store.loginToken != false) {
				history.push(`/place/${actions.decodeToken(store.loginToken).sub.id}`);
			}
		},
		[store.loginToken]
	);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<div className={classes.paper}>
					<Typography component="h1" variant="h4">
						Añade tu restaurante
					</Typography>
				</div>
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
					<CssTextField
						name="place_name"
						label="Nombre del Restaurante"
						type="text"
						variant="outlined"
						margin="normal"
						inputRef={register({
							required: "Añade el nombre de tu restaurante"
						})}
						error={!!errors.place_name}
						className={classes.margin}
						fullWidth
					/>
					{errors.place_name && <span className={classes.error}>{errors.place_name.message}</span>}
					<CssTextField
						name="address"
						label="Dirección del restaurante"
						type="text"
						variant="outlined"
						margin="normal"
						inputRef={register({
							required: "Añade la dirección de tu restaurante"
						})}
						error={!!errors.address}
						className={classes.margin}
						fullWidth
					/>
					<CssTextField
						name="description"
						label="Descripción del restaurante"
						type="text"
						variant="outlined"
						margin="normal"
						inputRef={register({
							required: "Añade la descripción de tu restaurante"
						})}
						error={!!errors.description}
						className={classes.margin}
						fullWidth
					/>
					{errors.description && <span className={classes.error}>{errors.description.message}</span>}
					<CssTextField
						name="phone_number"
						label="Telefono"
						type="tel"
						variant="outlined"
						margin="normal"
						inputRef={register({
							required: "Añade el numero de telefono de tu restaurante"
						})}
						error={!!errors.phone_number}
						className={classes.margin}
						fullWidth
					/>
					{errors.phone_number && <span className={classes.error}>{errors.phone_number.message}</span>}
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<CssTextField
								name="open_hour"
								type="time"
								variant="outlined"
								margin="normal"
								inputRef={register({
									required: "Añade el horario de apertura de tu restaurante"
								})}
								error={!!errors.open_hour}
								className={classes.margin}
								fullWidth
							/>
							{errors.open_hour && <span className={classes.error}>{errors.open_hour.message}</span>}
						</Grid>
						<Grid item xs={12} sm={6}>
							<CssTextField
								name="close_hour"
								type="time"
								variant="outlined"
								margin="normal"
								inputRef={register({
									required: "Añade el horario de cierre de tu restaurante"
								})}
								error={!!errors.close_hour}
								className={classes.margin}
								fullWidth
							/>
							{errors.close_hour && <span className={classes.error}>{errors.close_hour.message}</span>}
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={!!errors.email || !!errors.password}
						className={classes.submit}>
						Sign up
					</Button>
				</form>
			</div>
		</Container>
	);
};
