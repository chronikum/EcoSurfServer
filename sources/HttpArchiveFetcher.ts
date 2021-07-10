import Validation from "../interfaces/Validation";
import LookUpManager from "../LookupManager";
var forge = require('node-forge');

var readline = require('linebyline')

export default class HttpArchiveFetcher {


	static instance = HttpArchiveFetcher.getInstance();

	public static getInstance(): HttpArchiveFetcher {
		if (!HttpArchiveFetcher.instance) {
			HttpArchiveFetcher.instance = new HttpArchiveFetcher();
		}

		return HttpArchiveFetcher.instance;
	}
	/**
	 * Parse the file line by line
	 */
	parseLinebyLine(path: string) {
		let rl = readline('assets/bigquerydata.json');
		rl.on('line', function (line, lineCount, byteCount) {
			let validation = JSON.parse(line)
			validation.url = HttpArchiveFetcher.instance.extractHostname(validation.url)
			let hashedValidation: Validation = {
				sp: validation?.SpeedIndex, // Speed
				si: validation?.bytesTotal, // Size
				f: HttpArchiveFetcher.instance.hashSha256(validation.url).substring(0, 10),
			}
			LookUpManager.instance.setCache(hashedValidation);
		}).on('error', function (e) {
			console.log("Error: " + e)
		});
	}

	/**
	 * Removes protocol and www
	 * @param url 
	 * @returns 
	 */
	extractHostname(url) {
		url = url.replace("http://", "");
		url = url.replace("https://", "");
		url = url.replace("www.", "");
		return url;
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