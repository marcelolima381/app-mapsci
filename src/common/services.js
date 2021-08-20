import instance from "./axios-instance";

const APIUrl = "https://research-fields.herokuapp.com";

const ApiService = {
	postLattes: (lattesZIP) => {
		return instance.post(`${APIUrl}/fields`, lattesZIP, {
			params: {
				format: 'json'
			}
		})
	}
};

export default ApiService;
