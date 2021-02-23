import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AddPlace } from "./add-place.jsx";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { DevTool } from "@hookform/devtools";
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
import { CssTextField, useStyles } from "./styles.js";
import { useForm, Controller } from "react-hook-form";

export const Registro = () => {
	const { store, actions } = useContext(Context);
	const [firstStep, setFirstStep] = useState(true);
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, control, errors } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = data => {
		//history.push("/registro/place");
		actions.registerProfile(data);
		setFirstStep(false);
	};

	if (firstStep) {
		return (
			<Container component="main" maxWidth="xs">
				<DevTool control={control} />
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
							autoComplete="email"
							error={!!errors.email}
							className={classes.margin}
							fullWidth
							autoFocus
						/>
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

	if (!firstStep) {
		return <AddPlace />;
	}
};
