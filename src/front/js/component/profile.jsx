import React, { Fragment, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Jumbotron, Row, Col, Card, Button } from "react-bootstrap";
import { MenusView } from "./menusview.jsx";
import { useHistory } from "react-router-dom";
import { OurButton } from "./button.jsx";

import { Maps } from "./maps.jsx";

import "../../styles/profile.scss";
import { useState } from "react";
export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [businessMenus, setBusinessMenus] = useState(false);
	const history = useHistory();
	useEffect(
		() => {
			actions.getProfile(history.location.pathname);
		},
		[history.location.pathname]
	);

	useEffect(() => {
		actions.hideNavigation(true);
	}, []);

	useEffect(
		() => {
			store.loggedBusiness == false ? null : actions.getLatitudeLongitude(store.loggedBusiness.address);
		},
		[store.loggedBusiness]
	);

	useEffect(
		() => {
			store.loggedBusiness.menus && !store.loggedBusiness.menus.length
				? setBusinessMenus(false)
				: setBusinessMenus(true);
		},
		[store.loggedBusiness.menus]
	);

	//console.log(history.location.pathname.replace(/\D/g, ""));

	return (
		<>
			<div className="UserAcess">
				<div className="container">
					<div className="row UserAcess__FullHeight justify-content-center">
						<div className="col-12">
							<div className="Profile__Card mx-auto">
								<div className="UserAcess__CardWrapper">
									<div className="UserAcess__CardLogin">
										<div className="aside">
											<img
												className="avatar"
												src="https://66.media.tumblr.com/avatar_faa95867d2b3_128.png"
											/>
											<div className="d-flex flex-row">
												<i className="Profile__Icon fas fa-color fa-lg fa-map-marker-alt" />
												<h4 className="Profile__H4">{store.loggedBusiness.address}</h4>
											</div>
											<div className="d-flex flex-row">
												<i className="Profile__Icon fas fa-color fa-lg fa-phone" />
												<h4 className="Profile__H4">{store.loggedBusiness.phone_number}</h4>
											</div>
											<div className="log-out">
												<OurButton
													title="Cerrar Sesión"
													click={() => {
														actions.doLogOut();
														history.push("/");
													}}
													hide={store.loginToken != false ? "" : "d-none"}
												/>
											</div>
										</div>
										<div className="main-title d-flex flex-row justify-content-center">
											<h2>{store.loggedBusiness.place_name}</h2>
										</div>
										<div className=" d-flex flex-row justify-content-center">
											<i className="Profile__Icon--Hour far fa-color fa-clock" />
											<h4 className="Profile__H4">
												{"Horario: "}
												{store.loggedBusiness.open_hour}
												{" - "}
												{store.loggedBusiness.close_hour}
											</h4>
										</div>
										<div className="d-flex flex-row pt-2 justify-content-center">
											<Maps />
										</div>
										{businessMenus ? (
											<MenusView />
										) : (
											<div className="d-flex flex-row pt-2 justify-content-center">
												<OurButton
													title="Añadir Menú"
													hide={
														store.loginToken != false &&
														actions.decodeToken(store.loginToken).sub.id ==
															store.loggedBusiness.id
															? ""
															: "d-none"
													}
													click={() => {
														history.push(history.location.pathname.concat("addmenu"));
													}}
													// hide={store.loginToken != false ? "" : "d-none"}
												/>
											</div>
										)}

										{/* es la vista de los menus que tiene que ir en menu views */}
										<p className="p-3">{store.loggedBusiness.description}</p>
										<OurButton
											title="Editar"
											click={() => history.push(`${store.loggedBusiness.id}/edit`)}
											hide={
												store.loginToken != false &&
												actions.decodeToken(store.loginToken).sub.id == store.loggedBusiness.id
													? ""
													: "d-none"
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
