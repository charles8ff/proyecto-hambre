import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";
import { OurButton } from "./button.jsx";
//import { ModalView } from "./modal.jsx";
import PropTypes from "prop-types";
import { QR } from "./QR.jsx";

import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import "../../styles/profile.scss";
import { ModalProvider, Modal, useModal, ModalTransition } from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";
const URLBACKEND = "https://project-hunger.herokuapp.com";

export const MenusView = props => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const history = useHistory();
	return (
		<>
			<div className="Profile__Card">
				<div className="d-flex flex-row pb-2 justify-content-center">
					<div className="Profile__CardContainer">
						{/* <div className="Parallax__TwoCards"> */}
						<div className="Profile__Menus d-flex flex-row flex-wrap">
							<div className="card_image">
								<img src="https://i.imgur.com/RBq8n0b.png" />
							</div>
						</div>
						<div className="d-flex flex-row justify-content-center w-100">
							{" "}
							<h4>{props.title}</h4>
						</div>
						{/* </div> */}
					</div>
				</div>
				<div className="d-flex flex-row">
					<ModalProvider backdropClassName="d-none">
						<OurButton
							title="Ver Menu"
							click={() => history.replace(`${props.urlPlace}/menu/${props.urlTemplate}`)}
						/>
						<OurButton title="Ver QR" click={openModal} />
						<Modal isOpen={isModalOpen} transition={ModalTransition.BOTTOM_UP}>
							{/* <div className="d-flex flex-row justify-content-center"> */}
							<QR url={`${URLBACKEND}/place/${props.urlPlace}/menu/${props.urlTemplate}`} />
							{/* </div> */}
							<div className="d-flex flex-row justify-content-center pt-3">
								<OurButton title="CERRAR" click={closeModal} />
							</div>
						</Modal>
					</ModalProvider>
				</div>
			</div>
			{/* </div>
				</div>
			</div> */}
		</>
	);
};
MenusView.propTypes = {
	title: PropTypes.any,
	urlPlace: PropTypes.any,
	urlTemplate: PropTypes.any
};
