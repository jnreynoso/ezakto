var AppDispatcher = require('../dispatcher/AppDispatcher');

// Esta función se encargará de cargar y decodificar la base de datos localStorage
// cada vez que queramos modificar algo. El código es muy similar al que veníamos usando
function loadDatabase() {
    var notes = window.localStorage.getItem('notes');

    if (notes === null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    return notes;
}

// Esta otra función realizará el proceso inverso, codificar la base de datos
// para almacenarla una vez que hayamos realizado las operaciones
function saveDatabase(notes) {
    window.localStorage.setItem('notes', JSON.stringify(notes));
}

var NoteActions = {

    // Este método realizará la carga inicial de notas
    readNotes: function() {
        var notes = loadDatabase();

        // Enviamos un objeto plano como mensaje a las stores
        AppDispatcher.dispatch({
            type: 'READ', // esta propiedad servirá para identificar el mensaje en la store y actuar acorde
            notes: notes
        });
    },

    // Usaremos el nombre 'create' en vez 'save' para concordar con "CRUD"
    createNote: function(title, text) {
        // Creamos una id única rápida
        var id = new Date().getTime();

        // Construimos el objeto a almacenar
        var note = {
            id: id,
            title: title,
            text: text
        };

        // Abrimos la base de datos
        var notes = loadDatabase();

        // Insertamos la nota nueva
        notes.unshift(note);

        // Guardamos
        saveDatabase(notes);

        // Enviamos como mensaje la nota que hemos creado
        AppDispatcher.dispatch({
            type: 'CREATE',
            note: note
        });
    },

    // Finalmente para eliminar una nota por su id
    deleteNote: function(id) {
        // Abrimos db
        var notes = loadDatabase();

        // Recorremos el array en busca de la nota
        for (var i = 0, l = notes.length; i < l; i++) {
            // Si la encontramos, la eliminamos, sincronizamos y salimos del ciclo
            if (notes[i].id === id) {
                notes.splice(i, 1);

                saveDatabase(notes);

                break;
            }
        }

        // Enviamos al Dispatcher la id de la nota eliminada
        AppDispatcher.dispatch({
            type: 'DELETE',
            id: id
        });
    }

};

module.exports = NoteActions;
