import React from 'react'
import local from 'local-links'

export default React.createClass({
  displayName: 'NavHelper',
  render() {
    return (
      <div {...this.props} onClick={this.onClick}>
        {this.props.children}
      </div>
    )
  },

  onClick(event) {
    const pathname = local.getLocalPathname(event);
    if (pathname) {
      event.preventDefault()
      app.router.history.navigate(pathname)
    }
  }
})