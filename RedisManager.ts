const redis = require("redis");
var forge = require('node-forge');
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
	 * @warning Does not look for hashes, 
	 * @param key to lookup
	 * @returns any
	 */
	checkCache(key: string): Promise<string> {
		return new Promise(resolve => {
			RedisManager.instance.client.get(key, function (err, data) {
				if (data) {
					console.log(data);
					let dataJSON = JSON.parse(data)
					dataJSON.url = key;
					resolve(JSON.stringify(dataJSON))
				} else {
					resolve(null)
				}
			});
		})
	}

	/**
	 * Set Cache for object.
	 * @warning Will sha256-hash the object before setting the cache.
	 * 
	 * @param data to set for 
	 * @param key provided
	 */
	setCache(key: string, data: any) {
		this.client.set(this.hashSha256(key), JSON.stringify(data), 'EX', 3600 * 1314000); // TODO make this much longer
		console.log("Cache set!");
	}

	/**
	 * Returns the hash of the message
	 * @param message 
	 */
	hashSha256(message): string {
		var md = forge.md.sha256.create();
		md.update(message);
		return md.digest().toHex();
	}
}