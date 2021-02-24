import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "holi",
			profile: [],
			profile_id: 0,
			loggedBusiness: ""
		},
		actions: {
			getProfile: place_id => {
				fetch(`https://3001-blush-wallaby-9vwtj6or.ws-eu03.gitpod.io/api/place/${place_id}`)
					.then(async res => {
						const response = await res.json();
						console.log(response);
						setStore({ profile: response });
					})
					.catch(err => {
						throw err;
					});
			},
			deleteProfile: async place_id => {
				let response = await fetch(
					`https://3001-blush-wallaby-9vwtj6or.ws-eu03.gitpod.io/api/place/${place_id}`,
					{
						method: "DELETE",
						headers: new Headers({
							"Content-Type": "application/json"
						})
					}
				);
				response = await response.json();
			},
			doLogin: async (emailgiven, passwordgiven) => {
				let response = await fetch("https://3001-blush-wallaby-9vwtj6or.ws-eu03.gitpod.io/api/login", {
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
			},
			decodeToken: token => {
				return (token = jwt_decode(token));
			}
		}
	};
};

export default getState;
