import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Context } from "./store/appContext.js";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { Register } from "./pages/register/register.jsx";

import { Header } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login/login.jsx";
import { Profile } from "./component/profile.jsx";
import { TemplateTwo } from "./pages/templates/template-two.jsx";
const Layout = () => {
	const basename = process.env.BASENAME || "";
	const { store, actions } = useContext(Context);
	console.log(store.showNavigation);
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
						<Register />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/template-two">
						<TemplateTwo />
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
