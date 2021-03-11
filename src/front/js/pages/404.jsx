import React, { useContext, Fragment, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Error404 = () => {
	const { store, actions } = useContext(Context);

	return <div>Esto es un fallo 404</div>;
};
