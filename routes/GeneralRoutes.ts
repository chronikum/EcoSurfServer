import RedisManager from "../RedisManager";

const express = require('express');

/**
 * Express
 */
const generalRouter = express.Router();


const redisManager = new RedisManager();

/**
 * Gets the system status
 */
generalRouter.get('/status', async (req, res) => {
	res.send({
		success: true,
		message: "Online!"
	})
});

/**
 * Gets the websites validation
 */
generalRouter.post('/getValidation', async (req, res) => {
	redisManager.checkCache("Test").then(result => {
		console.log("Test OK")
		console.log(result)
	})
	res.send({
		success: false,
	})
});


export default generalRouter;