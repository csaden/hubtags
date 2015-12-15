import Model from 'ampersand-model';
import githubMixin from '../helpers/github-mixin';
import xhr from 'xhr';

export default Model.extend({
  idAttribute: 'name',
  props: {
    name: 'string',
    color: 'string'
  },
  session: {
  	editing: {
  		type: 'boolean',
  		default: false
  	},
    saved: {
      type: 'boolean',
      default: true
    }
  },
  isNew() {
    return !this.saved;
  },
  update(attributes) {
    const oldAttributes = this.getAttributes({props: true, session: false});
    xhr({
      url: this.url(),
      json: attributes,
      method: 'PATCH',
      headers: { //refactor as you go, make a util method to keep code DRY
        Authorization: 'token ' + app.me.token
      }
    }, (err, req, body) => {
      if (err) {
        this.set(oldAttributes);
        console.error('something went wrong, check your wifi');
      }
    });
    this.set(attributes);
  }
});
