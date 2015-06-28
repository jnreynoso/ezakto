var React = require('react');

var Note  = React.createClass({

  render: function() {
    return (
        <div className="note">
        <div className="note-text">
        <strong>{this.props.title}</strong>
        <p>{this.props.text}</p>
        </div>
        <div className="note-toolbar">
        <a className="note-btn-delete" />
        </div>
        </div>
    );
  }
});

module.exports = Note;
