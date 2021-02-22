const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			profile: [],
			menus: []
		},
		actions: {
			getProfile: place_id => {
				fetch(`https://3001-blush-wallaby-9vwtj6or.ws-eu03.gitpod.io/api/place/1`)
					.then(async res => {
						const response = await res.json();
						console.log(response);
						setStore({
							profile: response.place_name,
							menus: response.menus
						});
					})
					.catch(err => {
						throw err;
					});
			}
		}
	};
};

export default getState;
