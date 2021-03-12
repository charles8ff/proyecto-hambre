import React, { useContext, Fragment, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import "../../styles/home.scss";
import PropTypes from "prop-types";
import "react-simple-hook-modal/dist/styles.css";
import { OurButton } from "./button.jsx";
import { QR } from "./QR.jsx";

import { ModalProvider, Modal, useModal, ModalTransition } from "react-simple-hook-modal";

export const ModalView = () => {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<OurButton title="Ver QR" click={openModal} />
			<Modal id="any-unique-identifier" isOpen={isModalOpen} transition={ModalTransition.BOTTOM_UP}>
				{/* <canvas ref={inputRef} /> */}
				<QR url={"https://3000-copper-mite-z2nrl6y2.ws-eu03.gitpod.io/place/5/menu/1"} />
				<div className="d-flex flex-row justify-content-center pt-3">
					<OurButton title="CERRAR" click={closeModal} />
				</div>
			</Modal>
		</>
	);
};
