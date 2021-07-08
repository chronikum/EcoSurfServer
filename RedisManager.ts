const redis = require("redis");

/**
 * The Redis Manager Instance
 */
export default class RedisManager {

	/**
	 * The general purpose redis client
	 */
	client = redis.createClient();

	/**
	 * Instance logic
	 */
	static instance = RedisManager.getInstance();

	public static getInstance(): RedisManager {
		if (!RedisManager.instance) {
			RedisManager.instance = new RedisManager();
		}

		return RedisManager.instance;
	}

	/**
	 * Configure redis (if necessary)
	 */
	configure() {
		// nothing todo yet :)
	}

	/**
	 * Checks the cache for the key. if it is not available, it will return null
	 * @param key to lookup
	 * @returns any
	 */
	checkCache(key: string): Promise<string> {
		return new Promise(resolve => {
			RedisManager.instance.client.get(key, function (err, data) {
				console.log(data);
				resolve(data)
			});
		})
	}

	/**
	 * Set Cache for object
	 * 
	 * @param data to set for 
	 * @param key provided
	 */
	setCache(key: string, data: any) {
		console.log(key)
		this.client.set(key, JSON.stringify(data), 'EX', 3600 * 72); // TODO make this much longer
		console.log("Cache set!");
	}
}