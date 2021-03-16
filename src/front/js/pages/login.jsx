import React, { useState, useContext, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Registro } from "./registro.jsx";
import { AddPlace } from "./add-place.jsx";

import "../../styles/login.scss";

export const Login = () => {
	const { register, handleSubmit, errors } = useForm();
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const onLogin = data => {
		store.material_ui_is_incorrect_password = false;
		actions.login(data.email, data.password);
	};

	useEffect(
		() => {
			if (store.loginToken != false) {
				history.push(`/place/${actions.decodeToken(store.loginToken).sub.id}`);
			}
		},
		[store.loginToken]
	);

	useEffect(
		() => {
			if (history.location.pathname == "/register") {
				actions.userWantToSingUp(true);
				actions.changeStep();
			} else if (history.location.pathname == "/login") {
				actions.userWantToSingUp(false);
				actions.changeStep();
			}
			return history.listen(location => {
				if (location.pathname == "/register") {
					actions.userWantToSingUp(true);
					actions.changeStep();
				} else if (history.location.pathname == "/login") {
					actions.userWantToSingUp(false);
					actions.changeStep();
				}
			});
		},
		[history]
	);

	useEffect(() => {
		actions.hideNavigation(true);
	}, []);

	return (
		<>
			<div className="UserAcess">
				<div className="container">
					<div className="row UserAcess__FullHeight justify-content-center">
						<div className="col-12 pb-5">
							<input
								className="checkbox d-none"
								checked={store.userWantToSingUp ? true : false}
								type="checkbox"
							/>
							<div className="UserAcess__Card mx-auto">
								<div className="UserAcess__CardWrapper">
									<div className="UserAcess__CardLogin">
										<div className="UserAcess__Card--content text-center">
											<h4 className="mb-4 pb-3">Loguéate</h4>
											<form className="UserAcess__CardForm" onSubmit={handleSubmit(onLogin)}>
												<input
													name="email"
													type="email"
													placeholder="micorreo@gmail.com"
													className="UserAcess__CardForm--Style"
													ref={register({
														required: true,
														pattern: {
															value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
															message: "invalid email address"
														}
													})}
													autoComplete="off"
												/>
												<i className="UserAcess__CardForm--inputIcon fas fa-envelope" />
												{store.material_ui_is_user_active ? <p>Email no válido</p> : null}
												{errors.email && <p>Este campo es requerido</p>}
												<div className="UserAcess__CardForm mt-3">
													<input
														name="password"
														type="password"
														className="UserAcess__CardForm--Style"
														placeholder="*****"
														autoComplete="off"
														ref={register({ required: true, minLength: 6 })}
													/>
													<i className="UserAcess__CardForm--inputIcon fas fa-key" />
													{store.material_ui_is_incorrect_password ? (
														<p>Contraseña inválida</p>
													) : null}
													{errors.password && <p>Este campo es requerido</p>}
												</div>
												<input type="submit" value="Entrar" className="btn mt-4" />
											</form>
											<span
												onClick={() => {
													actions.userWantToSingUp(true);
												}}>
												¿No tienes cuenta? Regístrate 😊
											</span>
										</div>
									</div>
									{store.is_first_step ? <Registro /> : <AddPlace />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
