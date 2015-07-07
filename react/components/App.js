var React = require('react');
var Form = require('./Form');
var Grid = require('./Grid');

var App = React.createClass({

  getInitialState: function() {
    // Leemos la lista de notas guardadas o creamos una vacía
    var notes = window.localStorage.getItem('notes');

    if (notes === null) {
      notes = []; // Creamos una nueva lista vacía
    } else {
      notes = JSON.parse(notes); // Decodificamos la cadena
    }

    return {
      notes: notes
    };
  },

  onSave: function(note) {
    // Copiamos la lista de notas almacenada en el state
    var notes = this.state.notes.slice();

    // Insertamos la nueva nota al principio de la lista
    notes.unshift(note);

    // Actualizamos el state
    this.setState({
      notes: notes
    });

    // Codificamos la lista como cadena de texto
    notes = JSON.stringify(notes);

    // Guardamos en localStorage
    window.localStorage.setItem('notes', notes);
  },

  render: function() {
    return (
        <div id="wrapper">
        <Form onSave={this.onSave} />
        <Grid notes={this.state.notes} />
        </div>
    );
  }

});

module.exports = App;
