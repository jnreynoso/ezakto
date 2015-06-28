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

    save: function(e) {
        e.preventDefault();

        // Obtenemos los valores del formulario
        var note = {
            title: React.findDOMNode(this.refs.title).value,
            text: React.findDOMNode(this.refs.text).value
        };

        // Enviamos la nota al controller view
        this.props.onSave(note);

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
