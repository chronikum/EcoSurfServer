import LookUpManager from "./LookupManager";
import RedisManager from "./RedisManager";

export default class ValidationManager {

	redisClient = RedisManager.instance;

	lookupManager = LookUpManager.instance;

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
	async getLinkInformation(key) {
		if (await this.lookupManager.checkCache(key)) {
			return await this.lookupManager.checkCache(key)
		} else {
			console.log("Key not found!")
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