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
    return <div id={this.state.tipo} >
      {this.state.tipo == 'txt' ? <div className='postit' style={{ backgroundColor: '#EEDE27' }}>
        <h1>{this.props.autor}</h1>
        <p>{this.props.texto}</p>
      </div> : this.state.tipo == 'file' ? <div className='postit' style={{ backgroundColor: '#CF757F' }}>
        <h1>{this.props.autor}</h1>
        <p>{this.props.texto}</p>
        <a>{this.props.archivo}</a>
      </div> : <div className='postit' style={{ backgroundColor: '#7A82CB' }}>
            <h1>{this.props.autor}</h1>
            <p><strong>{this.props.texto}</strong></p>
            <img src={'http://localhost:3003/fotosp/' + this.props.archivo} width='200' />
          </div>
      }
    </div>;
  }
}
