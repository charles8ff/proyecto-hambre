import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Profile } from "../component/profile.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Profile
			profile_img="https://www.pizzeriagastrobarlafundacion.es/wp-content/uploads/2019/04/slider-new1.jpg"
			place_name="Bar/Restaurante Manolo e Hijos"
			place_address="C/ Paseo de la Castellana, 3, 28923, MADRID"
			place_telephone="937426813"
			open_time="10:00 AM"
			close_time="21:00 PM"
			place_description="Tasca agradable de tu barrio de siempre, desde 1966. aquí se ha visto de to'. Buenas bravas, 2 televisiones y canal plus. To lo weno. Llevamos atendiendo desde los años 50s"
		/>
	);
};
