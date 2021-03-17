import React, { useState } from "react";
import { useQRCode } from "react-qrcodes";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const QR = props => {
	const [srcDownload, setSrcDownload] = useState("");
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

	useEffect(
		() => {
			setTimeout(function() {
				setSrcDownload(inputRef.current.src);
			}, 300);
		},
		[inputRef]
	);

	return (
		<>
			<div className="d-flex flex-row justify-content-center">
				<img className="QR" ref={inputRef} />
			</div>
			<div className="d-flex flex-row justify-content-center">
				<a href={srcDownload} download>
					<button className="btn-home">Descargar QR</button>
				</a>
			</div>
		</>
	);
};

QR.propTypes = {
	url: PropTypes.string
};
