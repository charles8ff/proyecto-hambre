import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";

import "../../styles/login.scss";

export const Registro = props => {
	const { register, errors, handleSubmit } = useForm();
	const { store, actions } = useContext(Context);

	const userCheck = data => {
		actions.registerProfile(data);
		actions.getUserbyEmail(data);
	};

	useEffect(() => {
		actions.hideNavigation(true);
		actions.userWantToUseGoogle(false);
	}, []);

	const responseGoogle = response => {
		actions.userWantToUseGoogle(true);
		const email = response.profileObj.email;
		const password = response.profileObj.googleId;
		const googleData = { email, password };
		actions.getUserbyEmail(googleData);
	};

	return (
		<>
			<div className="UserAcess__CardRegister">
				<div className="UserAcess__Card--content text-center">
					<h4 className="mx-4 pb-3">Regístrate</h4>
					<form className="UserAcess__CardForm" onSubmit={handleSubmit(userCheck)}>
						<div className="d-flex flex-row">
							<label className=" p-0 pl-3" htmlFor="email">
								Correo Electrónico
							</label>
						</div>
						<div className="UserAcess__CardForm">
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
						</div>
						<div className="d-flex flex-row">
							<label className=" p-0 pl-3" htmlFor="password">
								Contraseña
							</label>
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="password"
								type="password"
								className="UserAcess__CardForm--Style"
								placeholder="*****"
								autoComplete="off"
								ref={register({ required: false, minLength: 6 })}
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-key" />
							{errors.password && <p>Este campo es requerido</p>}
						</div>
						<div className="d-flex flex-row mt-4 justify-content-center">
							<input type="submit" value="Registrarse" className="btn mt-2" />
							<GoogleLogin
								className="btn"
								clientId={process.env.REACT_GOOGLE_LOGIN_OAUTH}
								buttonText="Registrarse con Google"
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={"single_host_origin"}
							/>
						</div>
					</form>
					<span onClick={() => actions.userWantToSingUp(false)}>¿Ya tienes cuenta? Loguéate 😊</span>
				</div>
			</div>
		</>
	);
};

Registro.propTypes = {
	submit: PropTypes.func
};
