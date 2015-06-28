var React = require('react');
var Note = require('./Note');

var Grid = React.createClass({

  render: function() {
    var notes = this.props.notes.map(function(note, idx){
      return (
          <Note title={note.title} text={note.text} key={idx} />
      );
    });

    return (
        <div className="grid">
        {notes}
      </div>
    );
  }

});

module.exports = Grid;
