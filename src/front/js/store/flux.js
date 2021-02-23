const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "holi",
			profile: [],
			profile_id: 0,
			loginEmail: "",
			loginPassword: "",
			loginToken: ""
		},
		actions: {
			getProfile: place_id => {
				fetch(`https://3001-coral-silkworm-mp9fnk8u.ws-eu03.gitpod.io/api/place/${place_id}`)
					.then(async res => {
						const response = await res.json();
						setStore({ profile: response });
					})
					.catch(err => {
						throw err;
					});
			},
			deleteProfile: async place_id => {
				//setStore({ contact: getStore().contact.filter(index => index !== item) });
				let response = await fetch(
					`https://3001-coral-silkworm-mp9fnk8u.ws-eu03.gitpod.io/api/place/${place_id}`,
					{
						method: "DELETE",
						headers: new Headers({
							"Content-Type": "application/json"
						})
					}
				);
				response = await response.json();
			},
			setLoginEmail: email => {
				setStore({ loginEmail: email });
			},
			setLoginPassword: password => {
				setStore({ loginPassword: password });
			},
			doLogin: async (emailgiven, passwordgiven) => {
				let response = await fetch("https://3001-blush-wallaby-9vwtj6or.ws-eu03.gitpod.io/api/login", {
					method: ["POST"],
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify({
						email: emailgiven,
						password: passwordgiven
					})
				});
				response = await response.json();
				setStore({ contact: response });
			}
		}
	};
};

export default getState;
