import jwt_decode from "jwt-decode";
const URLBACKEND = "https://3001-moccasin-snipe-gf2wcqia.ws-eu03.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userSingUp: {
				is_user_exist: false,
				is_first_step: true
			},
			profile: [],
			singUp_profile: [],
			profile_id: 0,
			loggedBusiness: localStorage.getItem("loggedBusiness")
				? JSON.parse(localStorage.getItem("loggedBusiness"))
				: ""
		},
		actions: {
			getProfile: place_id => {
				fetch(URLBACKEND + `/api/place/${place_id}`)
					.then(async res => {
						const response = await res.json();
						setStore({ profile: response });
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
				response = await response.json();
				localStorage.setItem("loginToken", response.access_token);
				let data = getActions().decodeToken(response.access_token);
				setStore({ loggedBusiness: data.sub });
				localStorage.setItem("loggedBusiness", JSON.stringify(getStore().loggedBusiness));
			},

			deleteProfile: async place_id => {
				let response = await fetch(URLBACKEND + `api/place/${place_id}`, {
					method: "DELETE",
					headers: new Headers({
						"Content-Type": "application/json"
					})
				});
				response = await response.json();
			},

			doLogin: async (emailgiven, passwordgiven) => {
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
				response = await response.json();
				localStorage.setItem("loginToken", response.access_token);
				let data = getActions().decodeToken(response.access_token);
				setStore({ loggedBusiness: data.sub });
				localStorage.setItem("loggedBusiness", JSON.stringify(getStore().loggedBusiness));
			},
			decodeToken: token => {
				return (token = jwt_decode(token));
			}
		}
	};
};

export default getState;
