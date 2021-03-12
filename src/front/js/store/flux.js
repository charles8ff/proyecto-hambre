import jwt_decode from "jwt-decode";
import Geocode from "react-geocode";
const URLBACKEND = "https://project-hunger.herokuapp.com";

Geocode.setApiKey(process.env.REACT_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("es");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			material_ui_is_user_exist: false,
			is_first_step: true,
			material_ui_is_user_active: false,
			material_ui_is_correct_password: false,
			singUp_User: false,
			showNavigation: true,
			singUp_profile: [],
			loggedBusiness: localStorage.getItem("place") ? JSON.parse(localStorage.getItem("place")) : false,
			menus_type: [],
			templates: [],
			sections: [],
			selectedTemplate: 0,
			loginToken: localStorage.getItem("loginToken") ? localStorage.getItem("loginToken") : false,
			titleSections: [],
			allSections: [],
			map: undefined,
			templatePreview: false
		},
		actions: {
			renameKey: (object, key, newKey) => {
				const clonedObj = Object.assign({}, object);
				const targetKey = clonedObj[key];
				delete clonedObj[key];
				clonedObj[newKey] = targetKey;
				return clonedObj;
			},
			getLatitudeLongitude: address => {
				Geocode.fromAddress(address).then(
					response => {
						const { lat, lng } = response.results[0].geometry.location;
						setStore({
							map: {
								lat: lat,
								lng: lng
							}
						});
						console.log(lat, lng);
					},
					error => {
						console.error(error);
					}
				);
			},
			getMenuType: () => {
				setStore({ userSelectTemplate: 0 });
				setStore({
					menus_type: []
				});
				fetch(URLBACKEND + `/api/menutype`)
					.then(async res => {
						const response = await res.json();
						for (let menu_type of response) {
							menu_type = getActions().renameKey(menu_type, "id", "value");
							menu_type = getActions().renameKey(menu_type, "menu_type", "label");
							setStore({
								menus_type: [...getStore().menus_type, menu_type]
							});
						}
					})
					.catch(err => {
						throw err;
					});
			},
			getTemplates: menu_type => {
				setStore({
					templates: []
				});
				fetch(URLBACKEND + `/api/${menu_type}/templates`)
					.then(async res => {
						const response = await res.json();
						for (let template of response) {
							template = getActions().renameKey(template, "id", "value");
							template = getActions().renameKey(template, "title", "label");
							setStore({
								templates: [...getStore().templates, template]
							});
						}
					})
					.catch(err => {
						throw err;
					});
			},

			getSections: template_id => {
				setStore({
					sections: []
				});
				fetch(URLBACKEND + `/api/${template_id}/section`)
					.then(async res => {
						const response = await res.json();
						console.log(response);
						for (let section of response) {
							setStore({
								sections: [...getStore().sections, section.name]
							});
						}
					})
					.catch(err => {
						throw err;
					});
			},
			userSelectTemplate: data => {
				setStore({ userSelectTemplate: data });
			},
			postMeal: async data => {
				let place_id = getActions().decodeToken(getStore().loginToken).sub.id;
				let template_id = getStore().userSelectTemplate;
				let response = await fetch(URLBACKEND + `/api/place/${place_id}/template/${template_id}`, {
					method: "POST",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify(data)
				});
				if (response.status == 404) {
				} else if (response.status == 409) {
				} else {
					if (response.ok) {
						response = await response.json();
					}
				}
			},
			getProfile: place_id => {
				setStore({
					loggedBusiness: false
				});
				fetch(URLBACKEND + `/api${place_id}`)
					.then(async res => {
						const response = await res.json();
						console.log(response);
						localStorage.setItem("place", JSON.stringify(response));
						setStore({
							loggedBusiness: response
						});
					})
					.catch(err => {
						throw err;
					});
			},

			googleAPI: place_id => {
				fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
+Mountain+View,+CA&key=${process.env.REACT_GOOGLE_MAPS_API_KEY}`)
					.then(async res => {
						const response = await res.json();
						console.log(response);
					})
					.catch(err => {
						throw err;
					});
			},

			userWantToSingUp: data => {
				if (data) {
					setStore({
						singUp_User: true
					});
				} else {
					setStore({
						singUp_User: false
					});
				}
			},
			isPreviewTemplate: data => {
				if (data) {
					setStore({
						templatePreview: true
					});
				} else {
					setStore({
						templatePreview: false
					});
				} //añadir en appcontext para que inicie en false
			},

			hideNavigation: data => {
				if (data) {
					setStore({
						showNavigation: false
					});
				} else {
					setStore({
						showNavigation: true
					});
				}
			},

			changeStep: () => {
				setStore({
					is_first_step: true
				});
			},

			getUserbyEmail: user_email => {
				fetch(URLBACKEND + `/api/user/${user_email}`)
					.then(async res => {
						if (res.status == 409) {
							setStore({
								material_ui_is_user_exist: true,
								is_first_step: true
							});
						} else {
							setStore({
								material_ui_is_user_exist: false,
								is_first_step: false
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
					setStore({
						loginToken: response.access_token
					});
					let data = getActions().decodeToken(response.access_token);
					const dataURL = "/place/" + data.sub.id;
					getActions().getProfile(dataURL);
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
						material_ui_is_user_active: true
					});
				} else if (response.status == 409) {
					setStore({
						material_ui_is_correct_password: true
					});
				} else {
					if (response.ok) {
						response = await response.json();
						localStorage.setItem("loginToken", response.access_token);
						setStore({
							loginToken: response.access_token
						});
						let data = getActions().decodeToken(response.access_token);
						const dataURL = "/place/" + data.sub.id;
						getActions().getProfile(dataURL);
					}
				}
			},
			decodeToken: token => {
				return (token = jwt_decode(token));
			},
			doLogOut: () => {
				localStorage.removeItem("loginToken");
				setStore({
					loginToken: false
				});
			},
			loadMenu: async (place_id, template_id) => {
				let res = await fetch(URLBACKEND + `/api/place/${place_id}/template/${template_id}`);
				let responseAsJson = await res.json();
				setStore({ allSections: responseAsJson });
				return responseAsJson;
			},
			loadSections: async template_id => {
				let res = await fetch(URLBACKEND + `/api/template/${template_id}`);
				let responseAsJson = await res.json();
				let sections = responseAsJson.map(elem => {
					return elem.name;
				});
				console.log(sections);
				setStore({ titleSections: sections });
				return sections;
			},
			changeProfile: async (place_id, data) => {
				let response = await fetch(URLBACKEND + `/api/place/${place_id}`, {
					method: "PATCH",
					headers: new Headers({
						"Content-Type": "application/json",
						Authorization: `Bearer ${loginToken}`
					}),
					body: JSON.stringify(data)
				});
				response = await response.json();
			}
		}
	};
};

export default getState;
