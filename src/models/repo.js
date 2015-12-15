import Model from 'ampersand-model';
import Labels from './label-collection';

export default Model.extend({
  url() {
    return 'https://api.github.com/repos/' + this.full_name;
  },
  props: {
    id: 'number',
    name: 'string',
    full_name: 'string'
  },
  derived: {
  	appUrl: {
  		deps: ['full_name'],
  		fn () {
  			return '/repo/' + this.full_name;
  		}
  	}
  },
  collections: {
    labels: Labels
  },
  fetch() {
    Model.prototype.fetch.apply(this, arguments);
    this.labels.fetch();
  }
});
