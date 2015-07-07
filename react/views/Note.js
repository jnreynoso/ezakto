var React = require('react');
var NoteActions = require('../actions/NoteActions');

var Note  = React.createClass({

  remove: function() {
    NoteActions.deleteNote(this.props.id);
  },

  setPosition: function(top, column) {
    var element = React.findDOMNode(this);
    element.style.top = top + 'px';
    element.style.left = (column * 25) + '%';
  },

  getHeight: function() {
    var element = React.findDOMNode(this);
    var computedStyle = window.getComputedStyle(element);
    var height = computedStyle.getPropertyValue('height');
    return parseInt(height);
  },

  render: function() {

    var type = 'text-shortest';

    if (this.props.text.length > 240) type = 'text-longest';
    else if (this.props.text.length > 120) type = 'text-long';
    else if (this.props.text.length > 60) type = 'text-medium';
    else if (this.props.text.length > 30) type = 'text-short';

    return (
        <div className="note">
        <div className="note-text">
        <strong>{this.props.title}</strong>
        <p>{this.props.text}</p>
        </div>
        <div className="note-toolbar">
        <a className="note-btn-delete" onClick={this.remove} />
        </div>
        </div>
    );
  }

});

module.exports = Note;
