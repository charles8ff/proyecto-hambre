import React, { useContext, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useLocation, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Profile } from "../component/profile.jsx";
import { MenusView } from "../component/menusview.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return <div>hola</div>;
};
