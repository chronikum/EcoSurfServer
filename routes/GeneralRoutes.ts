import DatabaseManager from "../core/DatabaseManager";
import RedisManager from "../RedisManager";
import GreenWebFoundationFetcher from "../sources/GreenWebFoundationFetcher";
import HttpArchiveFetcher from "../sources/HttpArchiveFetcher";
import ValidationManager from "../ValidationManager";

const express = require('express');

/**
 * Express
 */
const generalRouter = express.Router();

const gwfManager = new GreenWebFoundationFetcher();

const validationManager = ValidationManager.instance;

const archiveFetcher = HttpArchiveFetcher.instance;

/**
 * Gets the system status
 */
generalRouter.get('/status', async (req, res) => {
	res.send({
		success: true,
		message: "System Online! EcoSurf v0.0.1"
	})
});

generalRouter.get('/updateDatabase2', async (req, res) => {
	gwfManager.fetchDatabase();
	// archiveFetcher.parseLinebyLine();
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
		const redisResult = await validationManager.getLinkInformation(keys);
		return res.send({
			success: true,
			validations: redisResult
		})
		// for (var keyRef in keys) {
		// 	const key = keys[keyRef]
		// 	console.log("Looking at key: " + key)
		// 	if (key) {
		// 		// const redisResult: string = await redisManager.checkCache(key);
		// 		const redisResult = await validationManager.getLinkInformation(key);
		// 		// Success, key was cached and is available
		// 		if (redisResult) {
		// 			results.push(
		// 				{ validation: redisResult }
		// 			)
		// 		} else {
		// 			results.push(
		// 				{
		// 					validation: {
		// 						isGreen: 0,
		// 					}
		// 				}
		// 			)
		// 		}
		// 	}
		// }
		// return res.send({
		// 	success: true,
		// 	validations: results
		// })
	} else {
		return res.send({
			success: false,
			message: "Keys not found in your request"
		})
	}
});



export default generalRouter;