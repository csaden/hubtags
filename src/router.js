import Router from 'ampersand-router'
import React from 'react'
import ReactDOM from 'react-dom'
import qs from 'qs'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import Layout from './layout'

export default Router.extend({
	renderPage(page, opts = {layout: true}) {
		if (opts.layout) {
			page = (
				<Layout>
					{page}
				</Layout>
			)
		}
		ReactDOM.render(page, document.getElementById("root"))
	},
	routes: {
		'': 'public',
		'repos':'repos',
		'login': 'login',
		'auth/callback?:query': 'authCallback'
	},
	public() {
		this.renderPage(<PublicPage/>, {layout: false})
	},
	repos() {
		this.renderPage(<ReposPage/>)
	},
	login() {
		window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
			client_id: '8f4feb86402dd31f1486',
			redirect_uri: window.location.origin + '/auth/callback', //dynamic and ready for production
			scope: 'user,repo'
		})
	},
	authCallback(query) {
		query = qs.parse(query)
		console.log(query)
	}
})
