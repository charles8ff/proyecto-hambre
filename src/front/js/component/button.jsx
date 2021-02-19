import React, { useContext, Fragment } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const BUTTON = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<button className="fill">Fill In</button>
		</>
	);
};
