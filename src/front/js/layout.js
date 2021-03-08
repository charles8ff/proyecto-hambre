import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";

import injectContext from "./store/appContext";
import { Register } from "./pages/register/register.jsx";

import { Header } from "./component/navbar";
import { Footer } from "./component/footer";
import { NewLogin } from "./pages/login/newlogin.jsx";
import { Profile } from "./component/profile.jsx";

const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<BrowserRouter basename={basename}>
			<ScrollToTop>
				<Header />
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
						<NewLogin />
					</Route>
					<Route>
						<h1>Not found!</h1>
					</Route>
				</Switch>
				<Footer
					footer_text="¿Tienes Hambre?"
					footer_url="https://coolors.co/191919-cdcdcd-ffffff-f44708-ed750b-f6b983-58c7e0"
				/>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default injectContext(Layout);
