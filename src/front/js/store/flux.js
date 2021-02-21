const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			templates: [
				//hardcoded
				{
					title: "FIRST",
					background: "white",
					text: "white"
				},
				{
					title: "SECOND",
					background: "white",
					text: "white"
				}
			]
		},
		actions: {
			//getTemplates()from api
		}
	};
};

export default getState;
