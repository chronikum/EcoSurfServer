import moment from "moment";
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import RedisManager from "../RedisManager";
import LookUpManager from "../LookupManager";
import HttpArchiveFetcher from "./HttpArchiveFetcher";
const gunzip = require('gunzip-file')

/**
 * Fetching weekly the websites provided by the Green Web Foundation
 */
export default class GreenWebFoundationFetcher {

	/**
	 * Instance logic
	 */
	static instance = GreenWebFoundationFetcher.getInstance();

	public static getInstance(): GreenWebFoundationFetcher {
		if (!GreenWebFoundationFetcher.instance) {
			GreenWebFoundationFetcher.instance = new GreenWebFoundationFetcher();
		}

		return GreenWebFoundationFetcher.instance;
	}

	/**
	 * Base Url and base suffix
	 */
	baseUrl = "https://tgwf-green-domains-live.s3.nl-ams.scw.cloud/green_urls_"
	baseUrlSuffix = ".db.gz"

	/**
	 * Fetching the database from GWF using the current date as matching pattern
	 * Saving the file downloaded in the temp folder.
	 */
	fetchDatabase() {
		// THe url where to current database is located
		let dateNow = moment()
		dateNow = dateNow.subtract(1, 'days')
		const totalUrl = `${this.baseUrl}${dateNow.format('YYYY-MM-DD')}${this.baseUrlSuffix}`
		const path = `./temp/${dateNow}.db.gz`;

		const file = fs.createWriteStream(path);
		// Write the file
		const request = http.get(totalUrl, function (response) {
			response.pipe(file);
		});
		// Called on completion of download
		// This code is incredible likely to break actually please watch out
		file.on('finish', function () {
			const unpackedPath = `./temp/${dateNow.format('YYYY-MM-DD')}.db`
			gunzip(path, unpackedPath, () => {
				open({
					filename: unpackedPath,
					driver: sqlite3.Database
				}).then(async (db) => {
					console.log("Database opened!")
					var counter = 0
					let datas = [];
					const rowsCount = await db.each(
						"SELECT * FROM 'greendomain'",
						async (err, row) => {
							if (err) {
								throw err
							}
							if (row?.url) {
								let url = GreenWebFoundationFetcher.instance.extractHostname(row?.url) || 'Error';
								datas.push(
									{
										g: true,
										f: HttpArchiveFetcher.instance.hashSha256(url).substring(0, 10)
									}
								)
								counter++;
								if (Math.random() > 0.9999)
									console.log(counter)
							}
						}
					).then(() => {
						console.log("Completed!")
						LookUpManager.instance.setManyCache(datas);
					})
				})
			})
		});
	}

	extractHostname(url) {
		url = url.replace("http://", "");
		url = url.replace("https://", "");
		url = url.replace("www.", "");
		return url;
	}

	/**
	 * Parse SQLite File
	 * 
	 * @param path to file which should be parsed
	 */
	parseSQLiteFile(path: string) {

	}
}