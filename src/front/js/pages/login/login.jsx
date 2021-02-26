import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { AccountCircle as AccountCircleIcon, SettingsOverscanRounded, DonutLargeOutlined } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Context } from "../../store/appContext";
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
import { useForm, Controller } from "react-hook-form";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = data => {
		store.userSingUp.is_user_active = false;
		store.userSingUp.is_correct_password = false;
		actions.login(data.email, data.password);
	};
	useEffect(
		() => {
			if (store.userSingUp.is_login_ok) {
				history.push(`/place/${store.loggedBusiness.id}`);
			}
		},
		[store.userSingUp.is_login_ok]
	);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h4">
						Log in
					</Typography>
				</div>
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
					<CssTextField
						name="email"
						label="Email Address"
						variant="outlined"
						margin="normal"
						inputRef={register({
							required: "You must provide the email address!",
							pattern: {
								value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "You must provide a valid email address!"
							}
						})}
						autoComplete="email"
						error={!!errors.email}
						className={classes.margin}
						fullWidth
						autoFocus
					/>
					{store.userSingUp.is_user_active ? <span className={classes.error}>{"Invalid email"}</span> : null}
					{errors.email && <span className={classes.error}>{errors.email.message}</span>}
					<CssTextField
						name="password"
						label="Password"
						type="password"
						variant="outlined"
						margin="normal"
						inputRef={register({
							required: "You must provide a password.",
							minLength: {
								value: 6,
								message: "Your password must be longer than 6 characters"
							}
						})}
						error={!!errors.password}
						fullWidth
						autoComplete="current-password"
					/>
					{store.userSingUp.is_correct_password ? (
						<span className={classes.error}>{"Invalid password \n"}</span>
					) : null}
					{errors.password && <span className={classes.error}>{errors.password.message}</span>}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={!!errors.email || !!errors.password}
						className={classes.submit}>
						Log in
					</Button>
				</form>
			</div>
		</Container>
	);
};
