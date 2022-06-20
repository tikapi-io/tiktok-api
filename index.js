import API from "./api.js";

const TikAPI = (
    /** @type {string} */
    apiKey
) => {
    if (!apiKey) {
        throw new Error("The API Key is required.");
    }

    return API.set({
        apiKey: apiKey
    });
}

//module.exports = TikAPI;
export default TikAPI;