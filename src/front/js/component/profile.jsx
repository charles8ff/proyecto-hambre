import React, { Fragment, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Jumbotron, Row, Col, Card, Button } from "react-bootstrap";
import { MenusView } from "./menusview.jsx";
import { useHistory } from "react-router-dom";
import { OurButton } from "./button.jsx";

import { Maps } from "./maps.jsx";

import "../../styles/profile.scss";
export const Profile = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	useEffect(
		() => {
			actions.getProfile(history.location.pathname);
		},
		[history.location.pathname]
	);

	useEffect(() => {
		console.log(store.loggedBusiness);

		actions.hideNavigation(true);
	}, []);

	useEffect(
		() => {
			if (store.loggedBusiness == false) {
				console.log("es caca");
			} else {
				console.log(store.loggedBusiness);
				actions.getLatitudeLongitude(store.loggedBusiness.address);
			}

			// actions.getLatitudeLongitude(store.loggedBusiness);
			// actions.hideNavigation(true);
		},
		[store.loggedBusiness]
	);

	//console.log(store.map);
	//console.log(process.env.REACT_GOOGLE_MAPS_API_KEY);
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
											{/* <div className="d-flex flex-row">
												<i className="far fa-color fa-clock" />
												<h4 className="Profile__H4">
													{"Horario"}
													{store.loggedBusiness.open_hour}
													{" - "}
													{store.loggedBusiness.close_hour}
												</h4>
											</div> */}
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
										{/* es la vista de los menus que tiene que ir en menu views */}
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
