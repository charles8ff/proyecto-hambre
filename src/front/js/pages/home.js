import React, { useContext, Fragment, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Benefits } from "../component/benefits.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.hideNavigation(false);
	}, []);

	return (
		<>
			<div className="homepage-hero-module">
				<div className="bg-overlay" />
				<div className="container d-flex flex-md-row flex-column">
					<div className="col-12 col-md-6">
						<h1 className="mb-4 text-white font-weight-bold ">HAZ TU MENU DIGITAL</h1>
						<p className="lead text-white">
							Es hora de modernizar su restaurante añadiendo un menú digital, adaptándote a esta nueva
							situación para no quedarte atrás. ¡Nosotros te lo hacemos fácil!
						</p>
						<p className="text-h3 mt-4">
							<Link to="/register" className="btn-home">
								¡Pruébalo GRATIS!
							</Link>
						</p>
					</div>
					<div className="col-12 col-md-6 shadow-lg phone--image" />
				</div>
			</div>
			<div className="dmenu--about--what--doing">
				<div className="container">
					<div className="row p-5">
						<div className="col-12 col-md-7 pr-md-5 text-left align-self-center ">
							<h2 className="mb-4 font-weight-bold ">¿Qué hacemos?</h2>
							<img src={"https://i.imgur.com/dbSuYw0.png"} className="menu--icon" />
						</div>
						<div className="col-12 col-md-5 ">
							<p>
								En D-Menu.com buscamos facilitar la digitalización de los negocios que no tienen una
								actividad digital previa, o que no poseen recursos o conocimientos para ello. Con
								nuestro servicio podrás crear tu página en muy poco tiempo.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="parallax--two--home">
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
				<div className="dmenu--start--now">
					<div className="container p-5">
						<div className="d-flex justify-content-center">
							<h2 className="mb-4 font-weight-bold ">Empieza ahora</h2>
						</div>
						<div className="d-flex text-center justify-content-center">
							<p className="text-h3 mt-4">
								<Link to="/register" className="btn-button">
									¡Pruébalo GRATIS!
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="dmenu--about--what--doing">
				<div className="container">
					<div className="row p-5">
						<div className="col-12 col-md-7 pr-md-5 text-left align-self-center ">
							<img src={"https://i.imgur.com/5BkbIdm.jpg"} className="about--us--image avatar__home" />
						</div>
						<div className="col-12 col-md-5 ">
							<h2 className="mb-4 font-weight-bold ">Sobre Nosotros</h2>
							<p>
								Somos Oscar Fernández y Carlos Fisac, dos desarrolladores web juniors concienciados con
								la pequeña hostelería y los momentos que atraviesa. En los enlaces a continuación podrás
								saber más sobre nuestros proyectos y nuestra trayectoria profesional.
							</p>
							<p className="linkedins">
								<i className="fab fa-2x fa-linkedin" />
								<a href="https://www.linkedin.com/in/oscarfzz/">Oscar Fernández Morel</a>
							</p>
							<p className="linkedins">
								<i className="fab fa-2x fa-linkedin" />
								<a href="https://www.linkedin.com/in/carlos-fisac-ferrandez">Carlos Fisac Ferrández</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
