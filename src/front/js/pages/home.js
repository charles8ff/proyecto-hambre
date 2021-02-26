import React, { useContext, Fragment, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Profile } from "../component/profile.jsx";
import { MenusView } from "../component/menusview.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	let id = useParams();
	return <h1>Proximamente....</h1>;
};
