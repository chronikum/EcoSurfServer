import RedisManager from "./RedisManager";

export default class ValidationManager {

	redisClient = RedisManager.instance;

	/**
	 * Instance logic
	 */
	static instance = ValidationManager.getInstance();

	public static getInstance(): ValidationManager {
		if (!ValidationManager.instance) {
			ValidationManager.instance = new ValidationManager();
		}

		return ValidationManager.instance;
	}

	/**
	 * Get Validation for link by hostname
	 */
	async getLinkInformation(link) {
		if (link.split(".")[0] = "www") {
			link = `${link.split(".")[0]}.${link.split(".")[1]}`
			console.log("Requested:" + link)
		}
		if (await this.redisClient.checkCache(link)) {

		} else {
			// Later on we will also set own validation
		}
	}
}