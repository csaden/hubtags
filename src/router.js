import Router from 'ampersand-router'
import React from 'react'
import ReactDOM from 'react-dom'
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
	},
	public() {
		this.renderPage(<PublicPage/>, {layout: false})
	},
	repos() {
		this.renderPage(<ReposPage/>)
	}
})
