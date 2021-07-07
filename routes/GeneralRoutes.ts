import RedisManager from "../RedisManager";
import GreenWebFoundationFetcher from "../sources/GreenWebFoundationFetcher";

const express = require('express');

/**
 * Express
 */
const generalRouter = express.Router();


const redisManager = new RedisManager();

const gwfManager = new GreenWebFoundationFetcher();

/**
 * Gets the system status
 */
generalRouter.get('/status', async (req, res) => {
	res.send({
		success: true,
		message: "System Online! EcoSurf v0.0.1"
	})
});

/**
 * Gets the websites validation
 */
generalRouter.post('/getValidation', async (req, res) => {
	const key = req?.body?.key;

	gwfManager.fetchDatabase();
	if (key) {
		const redisResult: string = await redisManager.checkCache(key);
		// Success, key was cached and is available
		if (redisResult) {
			res.send({
				success: true,
				validation: JSON.parse(redisResult)
			})
		} else { // Not available yet
			const validationData = `Hallo Welt String ${key}` // TODO: Implement validation and rating of website

			redisManager.setCache(key, validationData);
			res.send({
				success: true,
				validation: validationData,
			})
		}
	} else {
		res.send({
			success: false,
			message: "Cannot find the key in your body. Check your request!"
		})
	}
});


export default generalRouter;