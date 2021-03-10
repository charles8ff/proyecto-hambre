import { useQRCode } from "react-qrcodes";
import React, { Component, useContext, useRef, createRef, useState } from "react";
import { useScreenshot } from "use-react-screenshot";

export const MenusView = () => {
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

	return (
		<>
			<canvas ref={inputRef} />;
		</>
	);
};
