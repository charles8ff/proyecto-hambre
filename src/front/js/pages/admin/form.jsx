import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

export const Formulario = props => {
	const [datos, setDatos] = useState({
		nombre: "",
		apellido: ""
	});

	const enviarDatos = event => {
		event.preventDefault();
		console.log("enviando datos..." + datos.nombre + " " + datos.apellido);
	};

	return (
		<Fragment>
			<h1>Formulario</h1>
			<form className="row" onSubmit={enviarDatos}>
				<div className="col-md-3">
					<input
						type="text"
						placeholder="Nombre"
						className="form-control"
						onChange={props.getData}
						name="nombre"
					/>
				</div>
				<div className="col-md-3">
					<input
						type="text"
						placeholder="Apellido"
						className="form-control"
						onChange={props.getData}
						name="apellido"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Enviar
				</button>
			</form>
			<ul>
				<li>{datos.nombre}</li>
				<li>{datos.apellido}</li>
			</ul>
		</Fragment>
	);
};

Formulario.propTypes = {
	getData: PropTypes.func
};
