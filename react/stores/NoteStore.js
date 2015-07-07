var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

// Store
var _notes = [];

// El callback será siempre ejecutado pasandole el mensaje como primer argumento
function callback(payload) {
  // Basándonos en la propiedad type del mensaje, podemos inferir qué datos
  // contiene el mensaje y qué debemos hacer con ellos
  switch (payload.type) {

    case 'READ':
        _notes.push.apply(_notes, payload.notes);
        break;
    case 'CREATE':
        _notes.unshift(payload.note);
        break;
    case 'DELETE':
        for (var i = 0, l = _notes.length; i < l; i++) {
          if (_notes[i].id === payload.id) {
              _notes.splice(i, 1);
              break;
          }
        }
        break;

    // Si se ignora el mensaje, directamente termina
    default: return true;
  }

  // Si no se ignora el mensaje, emitimos el evento
  NoteStore.emit('change');

  // Es necesario devolver true para que el Dispatcher sepa que las operaciones han terminado
  return true;
}

var NoteStore = new EventEmitter();

NoteStore.get = function(id) {
  // Recorremos el array en busca de la nota
  for (var i = 0, l = _notes.length; i < l; i++) {
    // Si la encontramos, la devolvemos
    if (_notes[i].id === id) {
      return _notes[i];
    }
  }
  return false;
};

// Obtener todas las notas
NoteStore.getAll = function() {
  // Usamos slice para devolver el propio array, sino una copia
  return _notes.slice();
};

AppDispatcher.register(callback);

module.exports = NoteStore;
