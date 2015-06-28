var React = require('react');

var Note  = React.createClass({

  render: function() {
    return (
        <div className="note">
        <div className="note-text">Lorem Ipsum</div>
        <div className="note-toolbar">
        <a className="note-btn-delete" />
        </div>
        </div>
    );
  }
});

module.exports = Note;
