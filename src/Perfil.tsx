import * as React from 'react';
import Dropzone from 'react-dropzone';

export class Perfil extends React.Component<any, any>{

  state = {
    usuario: this.props.usuario,
    archivo: null,
    isImage: this.props.usuario.img
  }

  setProfImg(img) {
    event.preventDefault();
    var params = new FormData();
    params.append('file', img);
    params.append('correo', this.state.usuario.correo);
    fetch(`http://localhost:3003/api/${this.props.usuario.usuario}/perfil/profileImg`, {
      method: 'POST',
      body: params
    })
      .then(e => e.json())
      .then(res => {
        console.log(res.mensaje);
      });
  }

  cargarArchivo(accepted, rejected) {
    this.setState({
      archivo: accepted[0]
    });
  }

  render() {
    return <div id='containerH'>
    <div className='rectangle'>
    <button id='homeb' onClick={e => this.props.irA('home')}></button>
    <button id='add' onClick={e => this.props.irA('create')}></button>
    <button id='perfil' onClick={e => this.props.irA('perfil')}></button>
    </div>
      <div id='profImage'>
      {!this.state.isImage ?
        <form onSubmit={e => this.setProfImg(this.state.archivo)}>
          {!this.state.archivo && <Dropzone onDrop={(accepted, rejected) => this.cargarArchivo(accepted, rejected)} />}
          {this.state.archivo && <div>
            <img src={this.state.archivo.preview} style={{ width: 300, display: 'block' }} />
            <button onClick={() => this.setState({ archivo: null })}> Cancelar </button>
          </div>}
          <h3>Sube tu imagen de perfil</h3>
          <input type="submit" className="submitPost" />
        </form>
        :
      <img src={'http://localhost:3003/fotos/'+this.state.isImage} width='150'/>}
      </div>
      <div id='info' onClick={ e => console.log(this.state.isImage)}>
      </div>
      <div className='rec'>
      <h1>{this.state.usuario.nombre}</h1>
      <h2>{this.state.usuario.cargo}</h2>
      <h2>{this.state.usuario.correo}</h2>
      </div>
    </div>;
  }
}
