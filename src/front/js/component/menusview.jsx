import React, { createRef, Component, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQRCode } from "react-qrcodes";
import { useScreenshot } from "use-react-screenshot";

export const MenusView = props => {
	const { store, actions } = useContext(Context);

	const ref = useRef(null);
	const [image, takeScreenshot] = useScreenshot();
	const getImage = () => takeScreenshot(ref.current);

	// templatesInHTML = store.business.menus o algo del palo
	const [inputRef] = useQRCode({
		text: "https://www.youtube.com/watch?v=vLRyJ0dawjM/react-qrcodes",
		options: {
			level: "M",
			margin: 7,
			scale: 1,
			width: 200,
			color: {
				dark: "#000000",
				light: "#ED750B"
			}
		}
	});

	return <canvas ref={inputRef} />;
};
