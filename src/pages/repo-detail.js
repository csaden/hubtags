import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import LabelItem from '../components/label-item';

export default React.createClass({
  displayName: 'RepoDetail',
  mixins: [ampersandMixin],
  onAddClick(event) {
    this.props.labels.add({
      name: '',
      color: '',
      editing: true,
      saved: false
    }, {at: 0}); //can specify where to add the label to the collection
  },
  render() {
    const {repo, labels} = this.props;
    return (
      <div className='container'>
        <h1>{repo.full_name}</h1>
        <p>
        <button className='button' onClick={this.onAddClick}>Add New Label</button>
        </p>
        <ul>
          {labels.map((label) => {
            return (
              <LabelItem key={label.name} label={label}></LabelItem>
            );
          })}
        </ul>
      </div>
    );
  }
});