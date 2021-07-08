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
		if (await this.redisClient.checkCache(this.extractHostname(link))) {
			return this.redisClient.checkCache(this.extractHostname(link))
		} else {
			// TODO eva
			return null;
		}
	}

	/**
	 * Thanks
	 * https://stackoverflow.com/a/23945027
	 */
	extractHostname(url) {
		url = url.replace("http://", "");
		url = url.replace("https://", "");
		url = url.replace("www.", "");
		return url;
	}
}