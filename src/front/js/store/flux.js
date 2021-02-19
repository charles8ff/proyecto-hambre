const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "holi",
			profile: []
		},
		actions: {
			getProfile: () => {
				fetch("https://3001-coral-silkworm-mp9fnk8u.ws-eu03.gitpod.io/api/profile/1")
					.then(async res => {
						const response = await res.json();
						setStore({ profile: response });
						console.log(getStore().profile);
					})
					.catch(err => {
						throw err;
					});
			},
			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			}
		}
	};
};

export default getState;
