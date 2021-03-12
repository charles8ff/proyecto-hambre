import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";
import { OurButton } from "./button.jsx";
//import { ModalView } from "./modal.jsx";
import PropTypes from "prop-types";
import { QR } from "./QR.jsx";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import { ModalProvider, Modal, useModal, ModalTransition } from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";

export const MenusView = props => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const history = useHistory();
	return (
		<div className="d-flex flex-row pt-5 pl-1">
			<div className="col-12 col-lg-6 col-xl-4">
				<div className="menu__card user-card">
					<div className="card-block">
						<img
							className="menu__image"
							src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg"
							alt="Conoce nuestros beneficios"
						/>
						{/* <i className="menu__delete fas fa-trash-alt" /> */}
						<h5>{props.title}</h5>
						<hr />
						<div className="d-flex flex-row">
							<ModalProvider backdropClassName="d-none">
								<OurButton
									title="Ver Menu"
									click={() => history.push(`${props.urlPlace}/menu/${props.urlTemplate}`)}
								/>
								<OurButton title="Ver QR" click={openModal} />
								<Modal isOpen={isModalOpen} transition={ModalTransition.BOTTOM_UP}>
									<QR
										url={`https://3000-copper-mite-z2nrl6y2.ws-eu03.gitpod.io/place/${
											props.urlPlace
										}/menu/${props.urlTemplate}`}
									/>
									<div className="d-flex flex-row justify-content-center pt-3">
										<OurButton title="CERRAR" click={closeModal} />
									</div>
								</Modal>
							</ModalProvider>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
MenusView.propTypes = {
	title: PropTypes.any,
	urlPlace: PropTypes.any,
	urlTemplate: PropTypes.any
};
