import React from "react";
import { useQRCode } from "react-qrcodes";
import PropTypes from "prop-types";

export const QR = props => {
	const [inputRef] = useQRCode({
		text: props.url,
		options: {
			type: "image/jpeg",
			quality: 0.3,
			level: "M",
			margin: 3,
			scale: 4,
			width: 200,
			color: {
				dark: "#000",
				light: "#fff"
			}
		}
	});

	return <img className="QR" ref={inputRef} />;
};

QR.propTypes = {
	url: PropTypes.string
};
