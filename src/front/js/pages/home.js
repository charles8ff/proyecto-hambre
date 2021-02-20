import React, { useContext, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useLocation, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Profile } from "../component/profile.jsx";
import { MenusView } from "../component/menusview.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	let id = useParams();

	let history = useHistory();

	useEffect(
		() => {
			store.profile_id = id.id;
			actions.getProfile(store.profile_id);
		},
		[!store.profile_id]
	);

	return (
		<>
			<Profile
				profile_img="https://www.pizzeriagastrobarlafundacion.es/wp-content/uploads/2019/04/slider-new1.jpg"
				place_name={store.profile.email}
				place_address={store.profile.address}
				place_telephone={store.profile.phone_number}
				open_time={store.profile.open_hour}
				close_time={store.profile.close_hour}
				place_description={store.profile.description}
			/>
			<MenusView />
		</>
	);
};
