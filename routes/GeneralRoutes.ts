import RedisManager from "../RedisManager";
import GreenWebFoundationFetcher from "../sources/GreenWebFoundationFetcher";
import ValidationManager from "../ValidationManager";

const express = require('express');

require('dotenv').config();
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

generalRouter.post('/updateDatabase', async (req, res) => {
	const key = process.env.KEY;
	const providedKey = req.body?.key;
	if (providedKey == key) {
		gwfManager.fetchDatabase();
		return res.send({
			success: true,
			message: "Running database upgrade! this will take a few minutes."
		})
	}
	return res.send({
		success: false,
		message: "Don't do that"
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
			if (key) {
				const redisResult = await validationManager.getLinkInformation(key);
				// Success, key was cached and is available
				if (redisResult) {
					results.push(
						{ validation: JSON.parse(redisResult) }
					)
				} else { // Not available yet
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