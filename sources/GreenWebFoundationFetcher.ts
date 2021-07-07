import moment from "moment";
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');


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

		const file = fs.createWriteStream(`./temp/${dateNow}.db.gz`);
		const request = http.get(totalUrl, function (response) {
			response.pipe(file);
		});

	}

	/**
	 * Parse SQLite File
	 * 
	 * @param path to file which should be parsed
	 */
	parseSQLiteFile(path: string) {

	}
}