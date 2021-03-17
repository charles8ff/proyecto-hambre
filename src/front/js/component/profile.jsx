import React, { Fragment, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Dropdown, Row, Col, DropdownButton, Button } from "react-bootstrap";
import { MenusView } from "./menusview.jsx";
import { useHistory } from "react-router-dom";
import { OurButton } from "./button.jsx";
import { useForm, useWatch } from "react-hook-form";

import { Maps } from "./maps.jsx";

import "../../styles/profile.scss";
import { useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [businessMenus, setBusinessMenus] = useState(false);
	const [editing, setEditing] = useState(false);
	const history = useHistory();
	const { register, errors, handleSubmit, watch } = useForm();

	const getDataAllFields = watch();
	const getPlaceID = history.location.pathname.split("/");

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	useEffect(
		() => {
			actions.getProfile(getPlaceID[2]);
		},
		[history.location.pathname]
	);

	useEffect(() => {
		actions.hideNavigation(true);
	}, []);

	useEffect(
		() => {
			if (store.userEditAccount) {
				actions.getProfile(getPlaceID[2]);
				actions.userWantToEditAccount(false);
			}
		},
		[store.userEditAccount]
	);

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
			<div className="container editing">
				<div className="inputContainer">
					<div className="d-flex flex-row">
						<label className="col-12 p-0 pl-3" htmlFor="place_name">
							Nombre del Establecimiento
						</label>
					</div>
					<div className="d-flex flex-row">
						<i className="fas fa-utensils icon" />
						<input
							name={"place_name"}
							type="text"
							placeholder={`${store.placeData.place_name}`}
							className="AddMenu__Input--Style mb-3"
							ref={register({ required: true })}
						/>
					</div>
				</div>
				<div className="inputContainer">
					<div className="d-flex flex-row">
						<label className="col-6 p-0 pl-3" htmlFor="open_hour">
							Hora de apertura
						</label>
						<label className="col-6 p-0 pl-3" htmlFor="close_hour">
							Hora de cierre
						</label>
					</div>
					<div className="d-flex flex-row">
						<div className="col-6 p-0">
							<i className="fas fa-clock icon" />
							<input
								name={"open_hour"}
								type="time"
								placeholder={`${store.placeData.open_hour}`}
								className="AddMenu__Input--Style mb-3"
								ref={register({ required: true })}
							/>
						</div>
						<div className="col-6 p-0">
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
				</div>
				<div className="inputContainer">
					<div className="d-flex flex-row">
						<label className="col-12 p-0 pl-3" htmlFor="phone_number">
							Teléfono
						</label>
					</div>
					<div className="d-flex flex-row">
						<i className="fas fa-phone icon" />
						<input
							name={"phone_number"}
							type="tel"
							placeholder={`${store.placeData.phone_number}`}
							className="AddMenu__Input--Style mb-3"
							ref={register({ required: true })}
						/>
					</div>
				</div>
				<div className="inputContainer">
					<div className="d-flex flex-row">
						<label className="col-12 p-0 pl-3" htmlFor="address">
							Ubicación
						</label>
					</div>
					<div className="d-flex flex-row">
						<i className="fas fa-map-marker-alt icon" />
						<input
							name={"address"}
							type="text"
							placeholder={`${store.placeData.address}`}
							className="AddMenu__Input--Style mb-3"
							ref={register({ required: true })}
						/>
					</div>
				</div>
				<div className="inputContainer">
					<div className="d-flex flex-row">
						<label className="col-12 p-0 pl-3" htmlFor="email">
							Correo Electrónico
						</label>
					</div>
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
			<div className={editing ? "wrapper h-100 container-fluid" : "wrapper container-fluid"}>
				<div className={editing ? "task-manager h-100" : "task-manager"}>
					<div className={editing ? "left-bar d-none" : "left-bar"}>
						<div className="left-content">
							<div className="profile-card__img d-flex flex-row justify-content-center">
								<img
									src="https://img2.freepng.es/20180413/oyq/kisspng-restaurant-logo-lunch-5ad1606381cc10.5146934915236711395317.jpg"
									alt="profile card"
								/>
							</div>
							<div className="profile-card__txt d-flex flex-row justify-content-center pt-2">
								<i className="Profile__Icon--Hour far fa-color fa-clock" />
								<h4 className="Profile__H4">
									{"Horario: "}
									{store.placeData.open_hour}
									{" - "}
									{store.placeData.close_hour}
								</h4>
							</div>
							<div className="profile-card__txt d-flex flex-row justify-content-center pt-2">
								<i className="Profile__Icon--Hour far fa-color fa-file-alt pt-1" />
								<p className="Profile__H4">{store.placeData.description}</p>
							</div>
						</div>
					</div>
					<div className="page-content">
						{editing ? (
							<>
								<div className="d-flex flex-row justify-content-center pt-4">
									<h4 className="Profile__H4">Edita tu cuenta</h4>
								</div>{" "}
								{displayEditProfile()}
							</>
						) : (
							<>
								<div className="d-flex flex-row justify-content-end">
									<div
										className={
											store.loginToken != false &&
											actions.decodeToken(store.loginToken).sub.id == store.placeData.id
												? "dropleft"
												: "d-none"
										}>
										<div data-toggle="dropdown">
											<i className="fas fa-users-cog" />
										</div>
										<div className="dropdown-menu">
											<div className="dropdown-item" onClick={() => history.replace("/")}>
												<i className="fas fa-home" /> Inicio
											</div>
											<div className="dropdown-item" onClick={() => setEditing(true)}>
												<i className="fas fa-edit" /> Editar cuenta
											</div>
											<div
												className="dropdown-item"
												onClick={() => {
													history.replace("/");
													actions.doLogOut();
												}}>
												<i className="fas fa-sign-out-alt" /> Cerrar sesión
											</div>
										</div>
									</div>
								</div>
								<div className="profile-card__name d-flex flex-row justify-content-center pt-2">
									<h2>{store.placeData.place_name}</h2>
								</div>
								<div className="d-flex flex-row justify-content-center pt-2">
									<i className="Profile__Icon--Hour fas fa-color fa-lg fa-phone" />
									<h4 className="Profile__H4">{store.placeData.phone_number}</h4>
								</div>
								<div className="d-flex flex-row justify-content-center">
									<i className="Profile__Icon fas fa-color fa-lg fa-map-marker-alt" />
									<h4 className="Profile__H4">{store.placeData.address}</h4>
								</div>
								<div className="d-flex flex-row justify-content-center p-2 Profile__Card--ContentMap">
									<Maps />
								</div>
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
											history.replace(
												"/place/".concat(
													actions
														.decodeToken(store.loginToken)
														.sub.id.toString()
														.concat("/addmenu")
												)
											);
										}}
									/>
								</div>
								<div className="Profile__CardContainer">
									<div className="Parallax__TwoCards">
										<div className="Profile__Menus d-flex flex-row flex-wrap">{MenusInHTML()}</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
