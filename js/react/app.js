var React = require('react');
var Form = require('./components/Form.js');
var Grid = require('./components/Grid.js');
// No es necesario incluir Note, ya que las notas son incluidas dentro de Grid.

// Ahora, montamos los componentes en sus respectivos contenedores :
React.render(<Form />, document.getElementById('form'));
React.render(<Grid />, document.getElementById('grid'));
