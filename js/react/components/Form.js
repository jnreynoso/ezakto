var React = require('react');

var Form = React.createClass({

    getInitialState: function() {
        return {
            open: false
        };
    },

    open: function() {
        document.addEventListener('click', this.close);
        this.setState({
            open: true
        });
    },

    close: function() {
        document.removeEventListener('click', this.close);
        this.setState({
            open: false
        });
    },

    save: function() {
        // Obtenemos los valores del formulario
        var note = {
            title: React.findDOMNode(this.refs.title).value,
            text: React.findDOMNode(this.refs.text).value
        };

        // Leemos la lista de notas guardadas o creamos una vacía
        var notes = window.localStorage.getItem('notes');

        if (notes === null) {
            notes = []; // Creamos una nueva lista vacía
        } else {
            notes = JSON.parse(notes); // Decodificamos la cadena
        }

        // Insertamos la nueva nota al principio de la lista
        notes.unshift(note);

        // Codificamos la lista como cadena de texto
        notes = JSON.stringify(notes);

        // Guardamos en localStorage
        window.localStorage.setItem('notes', notes);

        // Vaciamos el formulario
        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.text).value = '';

        // Y finalmente lo cerramos
        this.close();
    },

    render: function() {
      return (
          <form className={"addnote" + (this.state.open ? ' open' : '')} onFocus={this.open} onSubmit={this.save}>
            <input className="addnote-title" type="text" placeholder="Título" ref="title" />
            <textarea className="addnote-text" placeholder="Añadir nota" ref="text" />
            <div className="addnote-toolbar">
                <button>Hecho</button>
                <a className="addnote-btn-list" />
            </div>
        </form>
        );
    },

    componentDidMount: function() {
        React.findDOMNode(this).addEventListener('click', function(e){
            e.stopPropagation();
        });
    }

});

module.exports = Form;
