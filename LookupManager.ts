import mongoose, { Connection, mongo } from 'mongoose';
import DatabaseManager from './core/DatabaseManager';
import Validation from './interfaces/Validation';
import ValidationModel from './models/ValidationModel';

export default class LookUpManager {

	connection?: mongoose.Connection;

	/**
	 * Instance logic
	 */
	static instance = LookUpManager.getInstance();


	public static getInstance(): LookUpManager {
		if (!LookUpManager.instance) {
			LookUpManager.instance = new LookUpManager();
		}

		return LookUpManager.instance;
	}


	constructor() {

	}

	/**
	 * Checks the cache for the key. if it is not available, it will return null
	 * @warning Will NOT sha256-hash the object before setting the cache.
	 * @param key to lookup
	 * @returns any
	 */
	async checkCache(key: string): Promise<Validation[]> {
		console.log("Looking at key: " + key)
		const matches = await ValidationModel.find({
			f: { $regex: key, $options: 'i' },
		}) as unknown as Validation[];
		console.log(matches)
		return Promise.resolve(matches)
	}

	/**
	 * Checks the cache for the key. if it is not available, it will return null
	 * @warning Will NOT sha256-hash the object before setting the cache.
	 * @param key to lookup
	 * @returns any
	 */
	async checkMultiCache(keys: String[]): Promise<Validation[]> {
		var regexExp = new RegExp(keys.join("|"), 'gi') as unknown as string;
		regexExp = "^" + regexExp;
		const matches = await ValidationModel.find({
			f: { $regex: regexExp, $options: 'm' },
		}) as unknown as Validation[];
		console.log(matches)
		return Promise.resolve(matches)
	}

	/**
	 * Set Cache for object.
	 * 
	 * @param data to set
	 */
	async setCache(data: any): Promise<any> {
		ValidationModel.updateOne({ f: data.f }, data, {
			upsert: true
		}).exec();
	}

	async setManyCache(datas: any[]): Promise<any> {
		ValidationModel.insertMany(datas);
	}
}