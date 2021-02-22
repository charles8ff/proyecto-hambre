import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Profile } from "../component/profile.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Profile/>
	);
};
