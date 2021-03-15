import React, { Fragment, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Jumbotron, Row, Col, Card, Button } from "react-bootstrap";
import { MenusView } from "./menusview.jsx";
import { useHistory } from "react-router-dom";
import { OurButton } from "./button.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useForm, useWatch } from "react-hook-form";

import { Maps } from "./maps.jsx";

import "../../styles/profile.scss";
import { useState } from "react";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [businessMenus, setBusinessMenus] = useState(false);
	const [editing, setEditing] = useState(false);
	const history = useHistory();
	const { register, errors, handleSubmit, watch } = useForm();

	const getDataAllFields = watch();
	const getPlaceID = history.location.pathname.replace(/\D/g, "");

	useEffect(
		() => {
			actions.getProfile(getPlaceID[0]);
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

	const submitEditedProfile = data => {
		actions.editProfile(store.placeData.id, data);
		setEditing(false);
	};

	const displayEditProfile = () => {
		return (
			<div className="container">
				<div className="inputContainer">
					<i className="fas fa-utensils icon" />
					<input
						name={"place_name"}
						type="text"
						placeholder={`${store.placeData.place_name}`}
						className="AddMenu__Input--Style mb-3"
						ref={register({ required: true })}
					/>
				</div>
				<div className="inputContainer d-flex flex-row flex-wrap">
					<div>
						<i className="fas fa-clock icon" />
						<input
							name={"open_hour"}
							type="time"
							placeholder={`${store.placeData.open_hour}`}
							className="AddMenu__Input--Style mb-3"
							ref={register({ required: true })}
						/>
					</div>
					<div>
						<i className="fas fa-clock icon" />
						<input
							name={"close_hour"}
							type="time"
							placeholder={`${store.placeData.close_hour}`}
							className="AddMenu__Input--Style mb-3"
							ref={register({ required: true })}
						/>
					</div>
				</div>
				<div className="inputContainer">
					<i className="fas fa-phone icon" />
					<input
						name={"phone_number"}
						type="tel"
						placeholder={`${store.placeData.phone_number}`}
						className="AddMenu__Input--Style mb-3"
						ref={register({ required: true })}
					/>
				</div>
				<div className="inputContainer">
					<i className="fas fa-map-marker-alt icon" />
					<input
						name={"address"}
						type="text"
						placeholder={`${store.placeData.address}`}
						className="AddMenu__Input--Style mb-3"
						ref={register({ required: true })}
					/>
				</div>
				<div className="inputContainer">
					<i className="fas fa-envelope icon" />
					<input
						name={"email"}
						type="tel"
						placeholder={`${store.placeData.email}`}
						className="AddMenu__Input--Style mb-3"
						ref={register({ required: true })}
					/>
				</div>
				<div className="d-flex flex-row flex-wrap mt-1 justify-content-center Profile__Card--Content">
					<div>
						<OurButton
							title="Guardar Cambios"
							click={() => {
								submitEditedProfile(getDataAllFields);
							}}
						/>
					</div>
					<div>
						<OurButton
							title="Cancelar"
							click={() => {
								setEditing(false);
							}}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className={editing ? "Editing__Wrapper" : "wrapper"}>
				<div className="profile-card js-profile-card">
					<div className="d-flex flex-row justify-content-center">
						<div className="profile-card__img d-flex flex-row">
							<img
								src="https://img2.freepng.es/20180413/oyq/kisspng-restaurant-logo-lunch-5ad1606381cc10.5146934915236711395317.jpg"
								alt="profile card"
							/>
						</div>
						<div>
							<i
								className={
									store.loginToken != false &&
									actions.decodeToken(store.loginToken).sub.id == store.placeData.id
										? "fas fa-2x fa-edit editIcon"
										: "d-none"
								}
								onClick={() => {
									setEditing(true);
								}}
							/>
						</div>
					</div>
					{editing ? (
						displayEditProfile()
					) : (
						<div className="profile-card__cnt js-profile-cnt">
							<div className="profile-card__name">
								<h2>{store.placeData.place_name}</h2>
								<div className="d-flex flex-row justify-content-center pb-1">
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
							<div className="profile-card__txt d-flex flex-row justify-content-center">
								<i className="Profile__Icon--Hour far fa-color fa-clock" />
								<h4 className="Profile__H4">
									{"Horario: "}
									{store.placeData.open_hour}
									{" - "}
									{store.placeData.close_hour}
								</h4>
							</div>
							<div className="profile-card-loc">
								<span className="profile-card-loc__icon" />
								<span className="profile-card-loc__txt">
									{" "}
									<div className="d-flex flex-row">
										<i className="Profile__Icon--Hour fas fa-color fa-lg fa-phone" />
										<h4 className="Profile__H4">{store.placeData.phone_number}</h4>
									</div>
								</span>
							</div>
							<div className="d-flex flex-row justify-content-center">
								<i className="Profile__Icon fas fa-color fa-lg fa-map-marker-alt" />
								<h4 className="Profile__H4">{store.placeData.address}</h4>
							</div>
							<div className="d-flex flex-row justify-content-center p-2 Profile__Card--ContentMap">
								<Maps />
							</div>
							{businessMenus ? (
								<>
									<div className="d-flex flex-row mt-1 justify-content-center Profile__Card--Content">
										<OurButton
											title="Añadir Menú"
											hide={
												store.loginToken != false &&
												actions.decodeToken(store.loginToken).sub.id == store.placeData.id
													? ""
													: "d-none"
											}
											click={() => {
												history.push(history.location.pathname.concat("/addmenu"));
											}}
										/>
									</div>
									<div className="Profile__CardContainer">
										<div className="Parallax__TwoCards">
											<div className="Profile__Menus d-flex flex-row flex-wrap">
												{MenusInHTML()}
											</div>
										</div>
									</div>
								</>
							) : (
								<div className="d-flex flex-row justify-content-center Profile__Card--Content">
									<OurButton
										title="Añadir Menú"
										hide={
											store.loginToken != false &&
											actions.decodeToken(store.loginToken).sub.id == store.placeData.id
												? ""
												: "d-none"
										}
										click={() => {
											history.push(history.location.pathname.concat("/addmenu"));
										}}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
