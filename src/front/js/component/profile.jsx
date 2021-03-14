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
			store.placeData == false ? null : actions.getLatitudeLongitude(store.placeData.address);
		},
		[store.placeData]
	);

	useEffect(
		() => {
			store.placeData.menus && !store.placeData.menus.length ? setBusinessMenus(false) : setBusinessMenus(true);
		},
		[store.placeData.menus]
	);

	const MenusInHTML = () => {
		if (store.placeData.menus && store.menus_type) {
			let titles = store.menus_type.map(elem => {
				return elem.label;
			});
			return store.placeData.menus.map((elem, index) => {
				console.log(elem.template_id);
				return (
					<MenusView
						key={index}
						title={titles[elem.template_id - 1]}
						urlTemplate={elem.template_id}
						urlPlace={store.placeData.id}
					/>
				);
			});
		} else {
			return <></>;
		}
	};

	return (
		<>
			<div className="UserAcess Profile__Card__over">
				<div className="container">
					<div className="row UserAcess__FullHeight justify-content-center">
						{/* <div className="col-12"> */}
						<div className="Profile__Card mx-auto  col-12">
							<div className="UserAcess__CardWrapper">
								<div className="UserAcess__CardLogin d-flex flex-row">
									<div className="aside">
										<img
											className="avatar"
											src="https://66.media.tumblr.com/avatar_faa95867d2b3_128.png"
										/>
										<div className="d-flex flex-row">
											<i className="Profile__Icon fas fa-color fa-lg fa-map-marker-alt" />
											<h4 className="Profile__H4">{store.placeData.address}</h4>
										</div>
										<div className="d-flex flex-row">
											<i className="Profile__Icon fas fa-color fa-lg fa-phone" />
											<h4 className="Profile__H4">{store.placeData.phone_number}</h4>
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

									{/* <Container> */}
									<div className="d-flex flex-column justify-content-center">
										<div className="d-flex flex-row pt-2 justify-content-center test">
											<h2>{store.placeData.place_name}</h2>
										</div>
										<div className=" d-flex flex-row justify-content-center test">
											<i className="Profile__Icon--Hour far fa-color fa-clock" />
											<h4 className="Profile__H4">
												{"Horario: "}
												{store.placeData.open_hour}
												{" - "}
												{store.placeData.close_hour}
											</h4>
										</div>
										<div className="d-flex flex-row justify-content-center p-2 test__map">
											<Maps />
										</div>
										{businessMenus ? (
											<>
												<div className="d-flex flex-row mt-1 justify-content-center test">
													<OurButton
														title="Añadir Menú"
														hide={
															store.loginToken != false &&
															actions.decodeToken(store.loginToken).sub.id ==
																store.placeData.id
																? ""
																: "d-none"
														}
														click={() => {
															history.push(history.location.pathname.concat("/addmenu"));
														}}
														// hide={store.loginToken != false ? "" : "d-none"}
													/>
												</div>
											</>
										) : (
											<div className="d-flex flex-row justify-content-center test">
												<OurButton
													title="Añadir Menú"
													hide={
														store.loginToken != false &&
														actions.decodeToken(store.loginToken).sub.id ==
															store.placeData.id
															? ""
															: "d-none"
													}
													click={() => {
														history.push(history.location.pathname.concat("/addmenu"));
													}}
													// hide={store.loginToken != false ? "" : "d-none"}
												/>
											</div>
										)}
										<div className="d-flex flex-row flex-wrap card__profile pl-1">
											{MenusInHTML()}
										</div>
										{/* <p className="p-3">{store.placeData.description}</p>
										<OurButton
											title="Editar"
											click={() => history.push(`${store.placeData.id}/edit`)}
											hide={
												store.loginToken != false &&
												actions.decodeToken(store.loginToken).sub.id == store.placeData.id
													? ""
													: "d-none"
											}
										/> */}
									</div>
									{/* </Container> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
};
