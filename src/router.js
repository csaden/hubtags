import Router from 'ampersand-router';
import app from 'ampersand-app';
import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';
import xhr from 'xhr';
import Layout from './layout';
import PublicPage from './pages/public';
import ReposPage from './pages/repos';
import RepoDetailPage from './pages/repo-detail';
import MessagePage from './pages/message';
import config from './config';

function requiresAuth(handlerName) {
  return function() {
    if (app.me.token) {
      this[handlerName].apply(this, arguments);
    } else {
      this.redirectTo('/');
    }
  }
}

export default Router.extend({
  renderPage(page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      );
    }
    ReactDOM.render(page, document.getElementById("root"));
  },
  routes: {
    '': 'public',
    'repos': requiresAuth('repos'),
    'login': 'login',
    'logout': 'logout',
    'repo/:owner/:name': requiresAuth('repoDetail'),
    'auth/callback?:query': 'authCallback',
    '*catchall': 'catchall', //catchall route to display 404 not found
  },
  public() {
    this.renderPage(<PublicPage/>, {layout: false});
  },
  repos() {
    this.renderPage(<ReposPage repos={app.me.repos}/>);
  },
  repoDetail(owner, name) {
    const model = app.me.repos.getByFullName(owner + '/' + name);
    this.renderPage(<RepoDetailPage repo={model} labels={model.labels}/>);
  },
  login() {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: config.clientId,
      redirect_uri: window.location.origin + '/auth/callback', //dynamic and ready for production
      scope: 'user,repo'
    });
  },
  authCallback(query) {
    query = qs.parse(query);
    xhr({
      url: config.authUrl + '/' + query.code,
      json: true

    }, (err, req, body) => {
      app.me.token = body.token;
      this.redirectTo('/repos');
      //same as this.history.navigate('/path', {replace: true})
      //don't want the auth.callback route to be apart of the history
      //matters for the back button in the browser for history
    });

    this.renderPage(<MessagePage title="Fetching your GitHub data..."/>);

  },
  logout() {
    window.localStorage.clear();
    window.location = '/';
  },
  catchall() {
    this.renderPage(<MessagePage title="Not Found"
      body="Sorry, you requested a webpage that does not exist.
      Check the url you typed in the browser"/>, {layout: true});
  }
});
