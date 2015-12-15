import React from 'react';
import ampersandMixin from 'ampersand-react-mixin'
import NavHelper from './components/nav-helper';

export default React.createClass({
  displayName: 'Layout',
  mixins: [ampersandMixin],
  // the mixin, React has lifecycle methods for when things occur
  // hook in points, componentWillMount, componentDidMount
  // observes items (auto-watches collections or models if they were passed to
  // the React component) and forces an update on the components
  // this is not traditional React
  // https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.xqq4qz621
  // Flux pattern or Redux pattern to manage state from the Server
  // Alt is a clean, simple Flux implementation

  render() {
    const {me} = this.props; // destructure using ES2015
    return (
      <NavHelper>
        <nav className='top-nav top-nav-light cf' role='navigation'>
          <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
          <label htmlFor='menu-toggle'>Menu</label>
          <ul className='list-unstyled list-inline cf'>
            <li>HubTags</li>
            <li><a href='/repos'>Repos</a></li>
            <li className='pull-right'><a href='/logout'>Logout</a> {me.login} </li>
          </ul>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </NavHelper>
    );
  }
});