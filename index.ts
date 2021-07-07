import express from 'express';

export class Server {
	app = express();

	port = 8080; // default port to listen

	endpoint: String = "localhost"

	/**
	 * Starts the server
	 */
	startServer() {
		this.app.listen(this.port, async () => {
			console.log(`backend online at ${this.endpoint}:${this.port}`);
		});
	}
}


const server = new Server()
server.startServer();