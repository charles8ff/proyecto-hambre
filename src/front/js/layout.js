import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Context } from "./store/appContext.js";

import { Home } from "./pages/home";

import injectContext from "./store/appContext";
import { Registro } from "./pages/registro.jsx";

import { Header } from "./component/partials/header.jsx";
import { Footer } from "./component/footer";
import { Login } from "./pages/login.jsx";
import { Profile } from "./component/profile.jsx";
import { TemplateTwo } from "./pages/templates/template-two.jsx";//
import { AddMenu } from "./pages/admin/addMenu.jsx";

const Layout = () => {
	const basename = process.env.BASENAME || "";
	const { store, actions } = useContext(Context);
	return (
		<BrowserRouter basename={basename}>
			<ScrollToTop>
				{store.showNavigation ? <Header /> : null}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/place/:id">
						<Profile />
					</Route>
					<Route exact path="/register">
						<Login />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/template-two">
						<TemplateTwo />
					</Route>
					<Route exact path="/place/:id/addmenu">
						<AddMenu />
					</Route>
					<Route>
						<h1>Not found!</h1>
					</Route>
				</Switch>
				{store.showNavigation ? (
					<Footer
						footer_text="¿Tienes Hambre?"
						footer_url="https://coolors.co/191919-cdcdcd-ffffff-f44708-ed750b-f6b983-58c7e0"
					/>
				) : null}
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default injectContext(Layout);
