import React, { useContext, Fragment } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Profile } from "../component/profile.jsx";
import { MenusView } from "../component/menusview.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Profile
				profile_img="https://www.pizzeriagastrobarlafundacion.es/wp-content/uploads/2019/04/slider-new1.jpg"
				place_name={store.profile.place_name}
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
