import Model from 'ampersand-model';
import githubMixin from '../helpers/github-mixin';
import RepoCollection from './repo-collection';

export default Model.extend(githubMixin, {
	'url': 'https://api.github.com/user', // fetch user data from GitHub

	initialize() {
		// have a token and want to save it
		this.token = window.localStorage.token;
		this.on('change:token', this.onTokenChange);
	},
	//come from the server and persist back to the server
	props: {
		id: 'number',
		login: 'string',
		avatar_url: 'string'
	},
	//keep data around in the browser
	session: {
		token: 'string'
	},
	collections: {
		repos: RepoCollection
	},
	onTokenChange() {
		window.localStorage.token = this.token;
		this.fetchInitialData();
	},
	fetchInitialData() {
		if (this.token) {
			this.fetch(); // method of the model with ampersand-model
			this.repos.fetch();
		}
	}
});