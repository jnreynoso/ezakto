var React = require('react');

var Form  = React.createClass({

  render: function(){
    return (
        <form className="addNote">
        <input className="addnote-title" type="text" placeholder="Titulo" />
        <textarea className="addnote-text" placeholder="Añadir nota" />
        <div className="addnote-toolbar">
        <button>Hecho</button>
        <a className="addnote-btn-list" />
        </div>
        </form>
    );
  }
});

module.exports = Form;
