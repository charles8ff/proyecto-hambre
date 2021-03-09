import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

import "../../../styles/login.scss";

export const AddPlace = props => {
	const { register: register3, errors: errors3, handleSubmit: handleSubmit3 } = useForm();

	const { store, actions } = useContext(Context);

	const registerUser = data => {
		actions.registerPlace(data);
	};

	return (
		<>
			<div className="UserAcess__CardAddPlace">
				<div className="UserAcess__Card--content text-center">
					<h4 className="pb-3 mt-4">Añadir Restaurante</h4>
					<form className="UserAcess__CardForm" onSubmit={handleSubmit3(registerUser)}>
						<input
							name="place_name"
							type="text"
							placeholder="Nombre del Restaurante"
							className="UserAcess__CardForm--Style mt-2"
							ref={register3}
							autoComplete="off"
						/>
						<i className="UserAcess__CardForm--inputIcon fas fa-utensils mt-2" />
						<div className="UserAcess__CardForm">
							<input
								name="address"
								type="text"
								placeholder="Dirección del restaurante"
								className="UserAcess__CardForm--Style mt-2"
								ref={register3}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-map-marked-alt mt-2" />
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="phone_number"
								type="text"
								placeholder="Número del restaurante"
								className="UserAcess__CardForm--Style mt-2"
								ref={register3}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-phone mt-2" />
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="open_hour"
								type="time"
								placeholder=""
								className="UserAcess__CardForm--Style mt-2"
								ref={register3}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-clock mt-2" />
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="close_hour"
								type="time"
								placeholder=""
								className="UserAcess__CardForm--Style mt-2"
								ref={register3}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-clock mt-2" />
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="description"
								type="text"
								placeholder="Descripción del restaurante"
								className="UserAcess__CardForm--Style mt-2"
								ref={register3}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-file-alt mt-2" />
						</div>
						<input type="submit" value="Completar Registro" className="btn mt-4" />
					</form>
				</div>
			</div>
		</>
	);
};

AddPlace.propTypes = {
	submit: PropTypes.func
};
