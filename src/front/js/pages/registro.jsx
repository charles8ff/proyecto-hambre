import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

import "../../styles/login.scss";

export const Registro = props => {
	const { register, errors, handleSubmit } = useForm();
	const { store, actions } = useContext(Context);

	const userCheck = data => {
		actions.registerProfile(data);
		actions.getUserbyEmail(data.email);
	};

	return (
		<>
			<div className="UserAcess__CardRegister">
				<div className="UserAcess__Card--content text-center">
					<h4 className="mb-4 pb-3">Registrate</h4>
					<form className="UserAcess__CardForm" onSubmit={handleSubmit(userCheck)}>
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
						<div className="UserAcess__CardForm mt-2">
							<input
								name="password"
								type="password"
								className="UserAcess__CardForm--Style"
								placeholder="*****"
								autoComplete="off"
								ref={register({ required: false, minLength: 6 })}
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-key" />
							{errors.password && <p>This field is required</p>}
						</div>
						<input type="submit" className="btn mt-4" />
					</form>
					<span onClick={() => actions.userWantToSingUp(false)}>¿Ya tienes cuenta? Logueate 😊</span>
				</div>
			</div>
		</>
	);
};

Registro.propTypes = {
	submit: PropTypes.func
};
