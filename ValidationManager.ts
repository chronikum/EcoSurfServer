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
		var hostname;

		if (url.indexOf("//") > -1) {
			hostname = url.split('/')[2];
		}
		else {
			hostname = url.split('/')[0];
		}
		// hostname = hostname.replace(/^www\./, '').split('.').slice(0, -1).join('.');
		hostname = hostname.replace("www.", "");
		return hostname;
	}
}