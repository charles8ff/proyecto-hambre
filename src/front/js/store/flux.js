const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			profile: [],
			menus: []
		},
		actions: {
			getProfile: place_id => {
				fetch(`https://3001-blush-wallaby-9vwtj6or.ws-eu03.gitpod.io/api/place/${place_id}`)
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
			}
		}
	};
};

export default getState;
