import RedisManager from "../RedisManager";
import GreenWebFoundationFetcher from "../sources/GreenWebFoundationFetcher";
import ValidationManager from "../ValidationManager";

const express = require('express');

/**
 * Express
 */
const generalRouter = express.Router();


const redisManager = new RedisManager();

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

generalRouter.get('/update', async (req, res) => {

	gwfManager.fetchDatabase();
	res.send({
		success: true,
		message: "Running database update"
	})
});

/**
 * Gets the websites validation
 */
generalRouter.post('/getValidation', async (req, res) => {
	const key: string = req?.body?.key;
	console.log(req.body)
	if (key) {
		// const redisResult: string = await redisManager.checkCache(key);
		const redisResult = await validationManager.getLinkInformation(key);
		// Success, key was cached and is available
		if (redisResult) {
			res.send({
				success: true,
				message: "Cached",
				validation: JSON.parse(redisResult)
			})
		} else { // Not available yet
			// const validationData = await validationManager.getLinkInformation(key);
			// console.log(validationData);
			// redisManager.setCache(key, validationData);
			res.send({
				success: true,
				message: "Not cached",
				validation: {
					isGreen: 0,
				}
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