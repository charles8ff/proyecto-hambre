import React, { useContext, Fragment, useEffect } from "react";
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

	console.log(store.profile);

    return (
        <>
            <Profile />
            <MenusView />
        </>
        );
};
