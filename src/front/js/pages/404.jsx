import React, { useContext, Fragment, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Error404 = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<h1>Esto es un fallo 404 bien bonito</h1>
		</div>
	);
};
