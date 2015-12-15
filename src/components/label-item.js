import React from 'react';
import app from 'ampersand-app';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
  displayName: 'LabelItem',
  mixins: [ampersandMixin],
  onEditClick(event) {
    event.preventDefault();
    this.props.label.editing = true;
  },

  onCancelClick(event) {
    event.preventDefault();
    const {label} = this.props;
    if (label.saved) {
      label.editing = false;
      this.setState(this.getInitialState());
    } else {
      label.destroy();
    }
  },
  onDeleteClick(event) {
    event.preventDefault();
    this.props.label.destroy() //optimistically destroys model
    // can pass {wait: true} for unoptimistic, waits for a response from the server;
  },
  getInitialState() {
    const {name, color} = this.props.label;
    return {name, color};
  },
  onNameChange(event) {
    this.setState({
      name: event.target.value
    });
  },
  onColorChange(event) {
    this.setState({
      color: event.target.value.slice(1) // keep the hash visible in the UI
    });
  },
  onSubmit(event) {
    event.preventDefault();
    const {label} = this.props;
    if (label.saved) {
      label.update(this.state);
    } else {
      label.save(this.state, {
        success: function() {
          label.saved = true;
        }
      }); // can pass attributes to save with the model
    }
    label.editing = false;
  },
  render() {
    const {label} = this.props;
    const {color} = this.state;
    const cssColor = '#' + color;
    let content;
    // editing
    if (label.editing) {
      content = (
        <form onSubmit={this.onSubmit} className='label'>
          <span style={{backgroundColor: cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
          <input name='name' onChange={this.onNameChange} value={this.state.name}/>
          <input name='color' onChange={this.onColorChange} value={cssColor}/>
          <button type='submit' className='button button-small'>Save</button>
          <button type='button'
            className='button button-small button-unstyled'
            onClick={this.onCancelClick}>cancel</button>
        </form>
      );
    } else {
      content = (
        <div>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <span>{label.name}</span>
          <span className='octicon octicon-pencil' onClick={this.onEditClick}></span>
          <span className='octicon octicon-x' onClick={this.onDeleteClick}></span>
        </div>
      );
    }
    return (
      <div>
        {content}
      </div>
    );
  }
});