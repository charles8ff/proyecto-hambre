const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userSingUp: [],
			profile: [],
			profile_id: 0
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

			registerProfile: data => {
				setStore({ userSingUp: data });
			},

			registerPlace: data => {
				const the_profile = { ...getStore().userSingUp, ...data };
				setStore({ userSingUp: the_profile });
				getActions().addNewProfile(getStore().userSingUp);
			},

			addNewProfile: async user_profile => {
				let response = await fetch("https://3001-moccasin-snipe-gf2wcqia.ws-eu03.gitpod.io/api/user", {
					method: "POST",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify(user_profile)
				});
				response = await response.json();
			},

			deleteProfile: async place_id => {
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
			}
		}
	};
};

export default getState;
