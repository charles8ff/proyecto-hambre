import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { DevTool } from "@hookform/devtools";
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
		console.log(store.userSingUp);
	};

	return (
		<Container component="main" maxWidth="xs">
			<DevTool control={control} />
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
						autoComplete="place_name"
						error={!!errors.place_name}
						className={classes.margin}
						fullWidth
						autoFocus
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
						autoComplete="address"
						error={!!errors.address}
						className={classes.margin}
						fullWidth
						autoFocus
					/>
					{errors.address && <span className={classes.error}>{errors.address.message}</span>}
					<CssTextField
						name="phone_number"
						label="Telefono"
						type="tel"
						variant="outlined"
						margin="normal"
						inputRef={register({
							required: "Añade el numero de telefono de tu restaurante"
						})}
						autoComplete="phone_number"
						error={!!errors.phone_number}
						className={classes.margin}
						fullWidth
						autoFocus
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
								autoComplete="open_hour"
								error={!!errors.open_hour}
								className={classes.margin}
								fullWidth
								autoFocus
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
								autoComplete="close_hour"
								error={!!errors.close_hour}
								className={classes.margin}
								fullWidth
								autoFocus
							/>
							{errors.close_hour && <span className={classes.error}>{errors.close_hour.message}</span>}
						</Grid>
					</Grid>
					<CssTextField
						name="description"
						label="Descripción del restaurante"
						type="text"
						variant="outlined"
						margin="normal"
						inputRef={register({
							required: "Añade la descripción del restaurante"
						})}
						autoComplete="description"
						error={!!errors.description}
						className={classes.margin}
						fullWidth
						autoFocus
					/>
					{errors.description && <span className={classes.error}>{errors.description.message}</span>}
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
