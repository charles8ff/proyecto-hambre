import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";
import { OurButton } from "./button.jsx";
import PropTypes from "prop-types";

export const MenusView = props => {
	return (
		<div className="col-12 col-lg-6 col-xl-4">
			<div className="menu__card user-card">
				<div className="card-block">
					<img
						className="menu__image"
						src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg"
						alt="menu_img"
					/>
					<i className="menu__delete fas fa-trash-alt" />
					<h5>{props.title}</h5>
					<hr />
					<div className="d-flex flex-row">
						<OurButton title="Ver menu" click={props.goToMenu} />
						<OurButton title="QR" click={props.goToQR} />
					</div>
				</div>
			</div>
		</div>
	);
};
MenusView.propTypes = {
	title: PropTypes.any,
	goToMenu: PropTypes.any,
	goToQR: PropTypes.any
};
