import * as React from 'react';

export class PostIt extends React.Component<any, any>{

  state = {
    tipo: '',
    usuario: null
  }

  componentWillMount() {
    this.setState({
      tipo: this.props.tipo
    })
    this.esteUsuario();
  }

  esteUsuario() {
    var param = new URLSearchParams();
    param.set('usuario', this.props.autor);
    fetch('http://localhost:3003/api/usuario', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          usuario: res.usuario
        });
      });
  }

  render() {
    return <div id={this.state.tipo}>
      {this.state.tipo == 'txt' ? <div >
        <h1>{this.props.autor}</h1>
        <p>{this.props.texto}</p>
      </div> : this.state.tipo == 'file' ? <div>
        <h1>{this.props.autor}</h1>
        <p>{this.props.texto}</p>
        <a>{this.props.archivo}</a>
      </div> : <div>
            <h1>{this.props.autor}</h1>
            <p>{this.props.texto}</p>
            <img src={'http://localhost:3003/fotosp/'+this.props.archivo} width='200' />
          </div>}
    </div>;
  }
}
