const config = {
	'localhost': {
		authUrl: 'https://labelr-local-server.herokuapp.com/authenticate',
		clientId: '8f4feb86402dd31f1486'
	},
	'labelr.surge.sh': {
		authUrl: '', // need to set up production clientId and secret on GitHub
		clientId: '' // also need heroku gatekeeper app for production
	}
}[window.location.hostname];

export default config;
