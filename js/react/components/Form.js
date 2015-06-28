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

    render: function() {
        return (
            <form className={"addnote" + (this.state.open ? ' open' : '')} onFocus={this.open}>
                <input className="addnote-title" type="text" placeholder="Título" />
                <textarea className="addnote-text" placeholder="Añadir nota" />
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
