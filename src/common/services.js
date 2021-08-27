import instance from "./axios-instance";

const APIUrl = "https://research-fields.herokuapp.com";

const ApiService = {
	postLattes: (lattesZIP) => {
		let formData = new FormData();
		formData.append("file", lattesZIP);

		return instance.post(`${APIUrl}/fields/`, formData, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "multipart/form-data"
			},
			params: {
				format: 'json'
			}
		})
	}
};

export default ApiService;
