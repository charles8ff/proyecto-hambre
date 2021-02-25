import React, { useState, useContext } from "react";
import { AddPlace } from "./add-place.jsx";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Context } from "../../store/appContext";
import { Avatar, Container, CssBaseline, Button, Typography } from "@material-ui/core";
import { CssTextField, useStyles } from "./styles.js";
import { useForm, controller } from "react-hook-form";

export const Registro = () => {
	const { store, actions } = useContext(Context);
	const classes = useStyles();
	const { register, handleSubmit, errors } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = data => {
		actions.registerProfile(data);
		actions.getUserbyEmail(data.email);
	};

	if (store.userSingUp.is_first_step) {
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h4">
							Sign up
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
							error={!!errors.email}
							className={classes.margin}
							fullWidth
						/>
						{store.userSingUp.is_user_exist ? (
							<span className={classes.error}>{"Invalid email"}</span>
						) : null}
						{errors.email &&
							store.user_exist && <span className={classes.error}>{errors.email.message}</span>}
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
						/>
						{errors.password && <span className={classes.error}>{errors.password.message}</span>}
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
	}

	if (!store.userSingUp.is_first_step) {
		return <AddPlace />;
	}
};
