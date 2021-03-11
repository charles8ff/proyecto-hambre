import React, { useState, useCallback, useContext } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const containerStyle = {
	width: "35rem",
	height: "15rem"
};

const options = { closeBoxURL: "", enableEventPropagation: true };

export const Maps = props => {
	const { store, actions } = useContext(Context);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_GOOGLE_MAPS_API_KEY
	});

	const [map, setMap] = useState(null);

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap id="marker-example" mapContainerStyle={containerStyle} center={store.map} zoom={18}>
			<Marker position={store.map} />
			<></>
		</GoogleMap>
	) : (
		<></>
	);
};
