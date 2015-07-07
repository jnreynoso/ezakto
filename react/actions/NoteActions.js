var AppDispatcher = require('../dispatcher/AppDispatcher');

// Creamos una referencia a un nodo "notes" en el almacenamiento firebase
var NotesRef = new Firebase('https://intense-heat-8517.firebaseio.com/notes');

var NoteActions = {

    readNotes: function() {
        // Escuchamos el evento "child_added", que se ejecutará cada vez
        // que se agregue un elemento al nodo
        NotesRef.on('child_added', function(snapshot) {
            // Extraemos la información obtenida
            var note = snapshot.val();

            // Usamos como id su key única en el almacenamiento
            note.id = snapshot.key();

            // Enviamos como mensaje al dispatcher la nota agregada
            AppDispatcher.dispatch({
                type: 'CREATE',
                note: note
            });
        });

        // Esuchamos el evento "child_removed", que es el inverso al anterior,
        // pues se ejecutará cada vez que un elemento sea eliminado del nodo
        NotesRef.on('child_removed', function(snapshot) {
            // Obtenemos la key única del elemento que se eliminó, que usamos como id
            var id = snapshot.key();

            // Enviamos al Dispatcher la id de la nota eliminada
            AppDispatcher.dispatch({
                type: 'DELETE',
                id: id
            });
        });
    },

    createNote: function(title, text) {
        // Insertamos la nota en el nodo
        NotesRef.push({
            title: title,
            text: text
        });
    },

    deleteNote: function(id) {
        // Accedemos al elemento y lo eliminamos
        NotesRef.child(id).set(null);
    }

};

module.exports = NoteActions;
