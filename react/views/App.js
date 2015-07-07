var React = require('react');
var NoteActions = require('../actions/NoteActions');
var NoteStore = require('../stores/NoteStore');
var Form = require('./Form');
var Grid = require('./Grid');

var App = React.createClass({

  getInitialState: function() {
    return {
      notes: []
    };
  },

  componentDidMount: function() {
    NoteStore.on('change', function(){
      this.setState({
        notes: NoteStore.getAll()
      });
    }.bind(this));

    NoteActions.readNotes();
  },

  render: function() {
    return (
        <div id="wrapper">
        <Form />
        <Grid notes={this.state.notes} />
        </div>
    );
  }

});

module.exports = App;
