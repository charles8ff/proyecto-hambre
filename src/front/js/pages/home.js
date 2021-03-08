import React, { useContext, Fragment, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Profile } from "../component/profile.jsx";
import MenuIcon from "../component/partials/img/menu-icon.png";
import { Benefits } from "../component/benefits-card.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<div className="homepage-hero-module">
				<div className="bg-overlay" />
				<div className="container d-flex flex-md-row flex-column">
					<div className="col-12 col-md-6">
						<h1 className="mb-4 text-white font-weight-bold ">HAZ TU MENU DIGITAL GRATIS</h1>
						<p className="lead text-white">
							Es hora de modernizar su restaurante añiendo un menú digital, adaptandote a esta nueva
							situación para no quedarte atrás ¡Nosotros te lo hacemos fácil por ti!
						</p>
						<p className="text-h3 mt-4">
							<a href="#" className="btn btn-primary btn-action btn-round btn-lg">
								Registrate!
							</a>
						</p>
					</div>
					<div className="col-12 col-md-6 shadow-lg phone--image" />
				</div>
			</div>
			{/* <div className="dmenu--about--what--doing container">
				<div className="d-flex justify-content-center">
					<h2 className="mb-4 font-weight-bold ">¿Qué hacemos?</h2>
				</div>
				<div className="d-flex justify-content-center">
					<p>
						En DMenu.com buscamos facilitar la digitalización de los negocios que no tienen una actividad
						digital previa, o que no poseen de los recursos o conocimientos para ello.
					</p>
				</div>
			</div> POSSIBLE OPTION HEHE */}
			<div className="dmenu--about--what--doing">
				<div className="container">
					<div className="row p-5">
						<div className="col-12 col-md-7 pr-md-5 text-left align-self-center ">
							<h2 className="mb-4 font-weight-bold ">¿Qué hacemos?</h2>
							<img src={"https://i.imgur.com/Hc4uHtu.png"} className="menu--icon" />
						</div>
						<div className="col-12 col-md-5 ">
							<p>
								En DMenu.com buscamos facilitar la digitalización de los negocios que no tienen una
								actividad digital previa, o que no poseen de los recursos o conocimientos para ello.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="parallax--two--home">
				{/* <div className="dmenu--fill--card"> */}
				<div className="container">
					<div className="d-flex flex-column flex-md-row">
						<Benefits />
						<Benefits />
						<Benefits />
					</div>
				</div>
			</div>
			{/* </div> */}
			<div className="dmenu--start--now">
				<div className="container p-5">
					<div className="d-flex justify-content-center">
						<h2 className="mb-4 font-weight-bold ">Empieza ahora</h2>
					</div>
					<div className="d-flex text-center justify-content-center">
						<p className="text-h3 mt-4">
							<a href="#" className="btn btn-primary btn-action btn-round btn-lg">
								Registrate!
							</a>
						</p>
					</div>
				</div>
			</div>
			<div className="dmenu--about--what--doing">
				<div className="container">
					<div className="row p-5">
						<div className="col-12 col-md-7 pr-md-5 text-left align-self-center ">
							<img
								src={
									"https://previews.123rf.com/images/imtmphoto/imtmphoto1604/imtmphoto160400013/54478445-dos-empresarios-un-asi%C3%A1tico-y-un-cauc%C3%A1sico-d%C3%A1ndose-la-mano-mirando-a-la-c%C3%A1mara-en-el-aeropuerto-moderno-.jpg"
								}
								className="about--us--image"
							/>
						</div>
						<div className="col-12 col-md-5 ">
							<h2 className="mb-4 font-weight-bold ">Sobre Nosotros</h2>
							<p>
								Somos 2 chalaos de puta madre socio que te voy a contar aquí con el pana y eso
								controlando y mucho bien. Se vienen cositas pronto :fire::sunglasses: texto de ejemplo
								texto de ejemplo
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
