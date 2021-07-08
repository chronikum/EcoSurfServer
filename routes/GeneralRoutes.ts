import RedisManager from "../RedisManager";
import GreenWebFoundationFetcher from "../sources/GreenWebFoundationFetcher";
import ValidationManager from "../ValidationManager";

const express = require('express');

/**
 * Express
 */
const generalRouter = express.Router();

const gwfManager = new GreenWebFoundationFetcher();

const validationManager = ValidationManager.instance;

/**
 * Gets the system status
 */
generalRouter.get('/status', async (req, res) => {
	res.send({
		success: true,
		message: "System Online! EcoSurf v0.0.1"
	})
});

generalRouter.get('/updateDatabase', async (req, res) => {

	gwfManager.fetchDatabase();
	res.send({
		success: true,
		message: "Running database update"
	})
});

/**
 * Returns the website validation
 */
generalRouter.post('/getValidations', async (req, res) => {
	const keys: string[] = req?.body?.keys;

	let results = [];
	if (keys) {
		for (var keyRef in keys) {
			const key = keys[keyRef]
			console.log("Looking at key: " + key)
			if (key) {
				// const redisResult: string = await redisManager.checkCache(key);
				const redisResult = await validationManager.getLinkInformation(key);
				// Success, key was cached and is available
				if (redisResult) {
					results.push(
						{ validation: JSON.parse(redisResult) }
					)
				} else { // Not available yet
					// const validationData = await validationManager.getLinkInformation(key);
					// console.log(validationData);
					// redisManager.setCache(key, validationData);
					results.push(
						{
							validation: {
								isGreen: 0,
							}
						}
					)
				}
			}
		}
		return res.send({
			success: true,
			validations: results
		})
	} else {
		return res.send({
			success: false,
			message: "Keys not found in your request"
		})
	}
});



export default generalRouter;