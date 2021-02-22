import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Header } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<BrowserRouter basename={basename}>
			<ScrollToTop>
				<Header />
				<Switch>
					<Route exact path="/:id">
						<Home />
					</Route>
					<Route exact path="/demo">
						<Demo />
					</Route>
					<Route exact path="/single/:theid">
						<Single />
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
