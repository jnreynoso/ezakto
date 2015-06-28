var React = require('react');

var Note  = React.createClass({

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
        <p className={type}>{this.props.text}</p>
        </div>
        <div className="note-toolbar">
        <a className="note-btn-delete" />
        </div>
        </div>
    );
  }});

module.exports = Note;
