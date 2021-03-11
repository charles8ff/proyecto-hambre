import React, { useContext, Fragment, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Context } from "../store/appContext";
// import "../../styles/home.scss";
import "../../styles/dmenu_home.scss";
import { Profile } from "../component/profile.jsx";
import MenuIcon from "../component/partials/img/menu-icon.png";
import { Benefits } from "../component/benefits.jsx";
import { Link, useHistory } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<div className="landing__hero">
				<div className="landing__headbg" />
				<div className="container d-flex flex-md-row flex-column">
					<div className="col-12 col-md-6">
						<h1 className="mb-4 text-white font-weight-bold ">HAZ TU MENU DIGITAL</h1>
						<p className="lead text-white">
							Es hora de modernizar su restaurante añadiendo un menú digital, adaptándote a esta nueva
							situación para no quedarte atrás ¡Nosotros te lo hacemos fácil por ti!
						</p>
						<p className="text-h3 mt-4">
							<Link to="/register" className="btn-home">
								Pruébalo GRATIS!
							</Link>
						</p>
					</div>
					<div className="col-12 col-md-6 shadow-lg phone-image" />
				</div>
			</div>
			<div className="what-we-doing">
				<div className="container">
					<div className="row p-5">
						<div className="col-12 col-md-7 pr-md-5 text-left align-self-center ">
							<h2 className="mb-4 font-weight-bold ">¿Qué hacemos?</h2>
							<img src={"https://i.imgur.com/dbSuYw0.png"} className="menu-icon" />
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
			<div className="parallax__home--two">
				<div className="container">
					<div className="d-flex flex-wrap">
						<Benefits
							img={"https://i.imgur.com/EoBQLsD.png"}
							text={"Clientes y empleados estarán libres de contagios con este tipo de cartas."}
						/>
						<Benefits
							img={"https://i.imgur.com/WoHHNhr.png"}
							text={"Tus clientes tendrán directamente la carta en sus manos y no tendrán que esperar."}
						/>
						<Benefits
							img={"https://i.imgur.com/ePOcOEc.png"}
							text={"Clientes y empleados estarán libres de contagios con este tipo de cartas."}
						/>
					</div>
				</div>
				<div className="start-now">
					<div className="container p-5">
						<div className="d-flex justify-content-center">
							<h2 className="mb-4 font-weight-bold ">Empieza ahora</h2>
						</div>
						<div className="d-flex text-center justify-content-center">
							<p className="text-h3 mt-4">
								<Link to="/register" className="btn-button">
									Pruébalo GRATIS!
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="about-us">
				<div className="container">
					<div className="row p-5">
						<div className="col-12 col-md-7 pr-md-5 text-left align-self-center ">
							<img
								src={
									"https://previews.123rf.com/images/imtmphoto/imtmphoto1604/imtmphoto160400013/54478445-dos-empresarios-un-asi%C3%A1tico-y-un-cauc%C3%A1sico-d%C3%A1ndose-la-mano-mirando-a-la-c%C3%A1mara-en-el-aeropuerto-moderno-.jpg"
								}
								className="about-us-pic"
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
