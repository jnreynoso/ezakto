var React = require('react');
var Note = require('./Note');

var Grid = React.createClass({
  render: function() {
    return (
        <div className="grid">
        <Note />
        <Note />
        <Note />
        </div>

    );
  }
});

module.exports = Grid;
