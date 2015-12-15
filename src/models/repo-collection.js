import Collection from 'ampersand-rest-collection';
import Repo from './repo';
import githubMixin from '../helpers/github-mixin';

export default Collection.extend(githubMixin, {
	// initialize() { // keep the data fresh by polling for updates
	// 	setInterval(() => {
	// 		this.fetch();
	// 	}, 5000);
	// },

	url: 'https://api.github.com/user/repos',

	model: Repo,

	getByFullName(fullName) {
		let model = this.findWhere({full_name: fullName});
		if (!model) {
			model = new Repo({full_name: fullName});
		}
		model.fetch();
		return model;
	}
});