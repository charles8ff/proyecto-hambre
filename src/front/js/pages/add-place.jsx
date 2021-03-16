import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

import "../../styles/login.scss";

export const AddPlace = props => {
	const { register, errors, handleSubmit } = useForm();

	const { store, actions } = useContext(Context);

	const registerUser = data => {
		actions.registerPlace(data);
	};

	return (
		<>
			<div className="UserAcess__CardAddPlace">
				<div className="UserAcess__Card--content text-center">
					<h4 className="pb-3 mx-4">Añadir Restaurante</h4>
					<form className="UserAcess__CardForm" onSubmit={handleSubmit(registerUser)}>
						<div className="d-flex flex-row justify-content-start">
							<label className="pl-3 m-0" htmlFor="place_name">
								Nombre del Establecimiento
							</label>
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="place_name"
								type="text"
								placeholder="Nombre del Establecimiento"
								className="UserAcess__CardForm--Style"
								ref={register}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-utensils" />
						</div>
						<div className="d-flex flex-row justify-content-start">
							<label className="pl-3 m-0" htmlFor="address">
								Ubicación
							</label>
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="address"
								type="text"
								placeholder="Dirección del restaurante"
								className="UserAcess__CardForm--Style"
								ref={register}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-map-marked-alt" />
						</div>
						<div className="d-flex flex-row justify-content-start">
							<label className="pl-3 m-0" htmlFor="phone_number">
								Teléfono
							</label>
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="phone_number"
								type="text"
								placeholder="Número del restaurante"
								className="UserAcess__CardForm--Style"
								ref={register}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-phone" />
						</div>
						<div className="d-flex flex-row justify-content-space-between">
							<label className="col-6 p-0 pr-4" htmlFor="open_hour">
								Hora de apertura
							</label>
							<label className="col-6 p-0 pr-4" htmlFor="close_hour">
								Hora de cierre
							</label>
						</div>
						<div className="d-flex flex-row">
							<div className="UserAcess__CardForm col-6">
								<input
									name="open_hour"
									type="time"
									placeholder="Hora de Apertura"
									className="UserAcess__CardForm--Style"
									ref={register}
									autoComplete="off"
								/>
								<i className="UserAcess__CardForm--inputIcon fas fa-clock" />
							</div>
							<div className="UserAcess__CardForm col-6">
								<input
									name="close_hour"
									type="time"
									placeholder="Hora de cierre"
									className="UserAcess__CardForm--Style"
									ref={register}
									autoComplete="off"
								/>
								<i className="UserAcess__CardForm--inputIcon fas fa-clock" />
							</div>
						</div>
						<div className="d-flex flex-row justify-content-start">
							<label className="pl-3 m-0" htmlFor="description">
								Descripción
							</label>
						</div>
						<div className="UserAcess__CardForm">
							<input
								name="description"
								type="text"
								placeholder="Descripción del restaurante"
								className="UserAcess__CardForm--Style"
								ref={register}
								autoComplete="off"
							/>
							<i className="UserAcess__CardForm--inputIcon fas fa-file-alt" />
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
