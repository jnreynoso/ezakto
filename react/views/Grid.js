var React = require('react');
var Note = require('./Note');

var Grid = React.createClass({

  calculatePositions: function() {
    // Array de alturas por columna, inicializadas en 0
    var grid_heights = [0, 0, 0, 0];

    // Recorremos todas las notas
    for (var i = 0, l = this.props.notes.length; i < l; i++) {
        // Obtengo el componente de esta nota por medio de su referencia
        var note = this.refs['note-'+this.props.notes[i].id];

        // Aplicamos un algoritmo sencillo de determinación de menor
        var min = grid_heights[0]; // Acumulador, asumimos que la menos alta es la primera
        var min_col = 0; // Índice de la menos alta

        // Recorremos cada columna
        for (var col = 1; col < grid_heights.length; col++) {
            // Si la columna actual tiene menor altura que la anterior guardada, la guardo
            if (grid_heights[col] < min) {
                min = grid_heights[col];
                min_col = col;
            }
        }

        // Posicionamos la nota en el menor altura obtenida, y en su columna correspondiente
        note.setPosition(min, min_col);

        // Sumamos la altura de esta nota a la columna, para la próxima iteración
        grid_heights[min_col] += note.getHeight();
    }
  },
  componentDidMount: function() {
    this.calculatePositions();
  },

  componentDidUpdate: function() {
    this.calculatePositions();
  },

  render: function() {
    var notes = this.props.notes.map(function(note, idx){
      return (
          <Note id={note.id} title={note.title} text={note.text} key={note.id} ref={'note-'+note.id} />
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
