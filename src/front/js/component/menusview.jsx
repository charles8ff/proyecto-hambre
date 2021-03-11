import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";
import { OurButton } from "./button.jsx";

export const MenusView = props => {
	return (
		<div className="d-flex flex-row pt-5 pl-1">
			<div className="col-12 col-lg-6 col-xl-4">
				<div className="menu__card user-card">
					<div className="card-block">
						{/* <div className="user-image"> */}
						<img
							className="menu__image"
							src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg"
							alt="Conoce nuestros beneficios"
						/>
						<i className="menu__delete fas fa-trash-alt" />
						{/* </div> */}
						<h5>Menu del día</h5>
						<hr />
						<div className="d-flex flex-row">
							<OurButton title="Ver menu" />
							<OurButton title="QR" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
