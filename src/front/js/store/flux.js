import jwt_decode from "jwt-decode";
const URLBACKEND = "https://3001-silver-narwhal-dcgq8rgc.ws-eu03.gitpod.io"; //no slash at end
//no slash at end//no slash at end//no slash at end//no slash at end//no slash at end//no slash at end

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userSingUp: {
				is_user_exist: false,
				is_first_step: true,
				is_user_active: false,
				is_correct_password: false
			},
			singUp_profile: [],
			loggedBusiness: localStorage.getItem("loggedBusiness")
				? JSON.parse(localStorage.getItem("loggedBusiness"))
				: false
		},
		actions: {
			getProfile: place_id => {
				fetch(URLBACKEND + `/api/place/${place_id}`)
					.then(async res => {
						const response = await res.json();
						setStore({
							profile: response,
							menus: response.menus
						});
					})
					.catch(err => {
						throw err;
					});
			},

			getUserbyEmail: user_email => {
				fetch(URLBACKEND + `/api/user/${user_email}`)
					.then(async res => {
						if (res.status == 409) {
							setStore({
								userSingUp: {
									is_user_exist: true,
									is_first_step: true
								}
							});
						} else {
							setStore({
								userSingUp: {
									is_user_exist: false,
									is_first_step: false
								}
							});
						}
						const response = await res.json();
					})
					.catch(err => {
						throw err;
					});
			},

			registerProfile: data => {
				setStore({ singUp_profile: data });
			},

			registerPlace: data => {
				const the_profile = { ...getStore().singUp_profile, ...data };
				setStore({ singUp_profile: the_profile });
				getActions().addNewProfile(getStore().singUp_profile);
			},

			addNewProfile: async user_profile => {
				let response = await fetch(URLBACKEND + "/api/user", {
					method: "POST",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify(user_profile)
				});
				if (response.ok) {
					response = await response.json();
					localStorage.setItem("loginToken", response.access_token);
					let data = getActions().decodeToken(response.access_token);
					setStore({
						loggedBusiness: data.sub
					});
					localStorage.setItem("loggedBusiness", JSON.stringify(getStore().loggedBusiness));
				}
			},

			deleteProfile: async place_id => {
				let response = await fetch(URLBACKEND + `/api/place/${place_id}`, {
					method: "DELETE",
					headers: new Headers({
						"Content-Type": "application/json"
					})
				});
				response = await response.json();
				getActions().doLogOut();
			},

			login: async (emailgiven, passwordgiven) => {
				let response = await fetch(URLBACKEND + "/api/login", {
					method: "POST",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify({
						email: emailgiven,
						password: passwordgiven
					})
				});
				if (response.status == 404) {
					setStore({
						userSingUp: {
							is_user_active: true
						}
					});
				} else if (response.status == 409) {
					setStore({
						userSingUp: {
							is_correct_password: true
						}
					});
				} else {
					if (response.ok) {
						response = await response.json();
						localStorage.setItem("loginToken", response.access_token);
						let data = getActions().decodeToken(response.access_token);
						setStore({
							loggedBusiness: data.sub
						});
						localStorage.setItem("loggedBusiness", JSON.stringify(getStore().loggedBusiness));
					}
				}
			},
			decodeToken: token => {
				return (token = jwt_decode(token));
			},
			doLogOut: () => {
				localStorage.removeItem("loginToken");
				localStorage.removeItem("loggedBusiness");
				setStore({
					loggedBusiness: false
				});
			}
		}
	};
};

export default getState;
