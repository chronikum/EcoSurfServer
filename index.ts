import express from 'express';
import DatabaseManager from './core/DatabaseManager';
import generalRouter from './routes/GeneralRoutes';
import HttpArchiveFetcher from './sources/HttpArchiveFetcher';
const cors = require('cors');


export class Server {
	app = express();

	port = 8080; // default port to listen

	endpoint: String = "localhost"

	/**
	 * Database Manager
	 */
	dbManager = DatabaseManager.instance;

	/**
	 * Starts the server
	 */
	startServer() {
		this.configureServer();
		this.setupRoutes();
		this.exceptionCallback();
		this.app.listen(this.port, async () => {
			console.log(`backend online at ${this.endpoint}:${this.port}`);
			this.dbManager.statusObservable.subscribe(status => {
				console.log(status)
			})
		});
	}


	/**
	 * Configures headers and general setup
	 */
	configureServer() {
		this.app.use(express.json());
		// We are allowing everything actually
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin');
			next();
		});
		this.app.use(cors({ origin: "*" }));
	}

	/**
	 * Setting up the routes
	 */
	setupRoutes() {
		this.app.use('/api', generalRouter);
	}

	/**
	 * Here we catch exceptions and errors. We also log directly to the console
	 */
	exceptionCallback() {
		this.app.use((err, req, res, next) => {
			res.status(500);
			console.log('Request failed with critical error.');
			res.send({ success: false, message: 'Sorry, we ran into an critically error.' });
		});
	}
}


const server = new Server()
server.startServer();