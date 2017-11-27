import * as React from 'react';
import Dropzone from 'react-dropzone';

export class Create extends React.Component<any, any>{

  state = {
    tipo: 'txt',
    archivo: null
  }

  tipoDePost(event) {
    this.setState({ tipo: event.target.value, archivo: null });
    console.log(this.state.tipo);
  }

  crearPostIt(img, event) {
    event.preventDefault();
    var params = new FormData();
    params.append('usuario', this.props.usuario.usuario);
    params.append('tipo', this.state.tipo);
    params.append('texto', event.target.mensaje.value);
    params.append('file', img);
    fetch(`http://localhost:3003/api/${this.props.usuario.usuario}/subir`, {
      method: 'POST',
      body: params
    })
      .then(e => e.json())
      .then(res => {
        console.log(res.mensaje);
        this.props.irA('home');
      });
  }

  cargarArchivo(accepted, rejected) {
    this.setState({
      archivo: accepted[0]
    });
    //console.log(accepted[0].name.substring(accepted[0].name.lastIndexOf('.')));
    // console.log(accepted[0]);
  }

  render() {
    return <div id='create'>
      <h3> {this.props.usuario.nombre} selecciona tu tipo de post-it </h3>
      <div className='btnTypes'>
        <form onChange={e => this.tipoDePost(e)}>
          <input type='radio' name='typePost' value='txt' defaultChecked /> Texto
          <input type='radio' name='typePost' value='img' /> Imagen
          <input type='radio' name='typePost' value='file' /> Archivo
        </form>
      </div>
      <div id='creator'>
        {this.state.tipo == 'txt' ?
          <div>
            <form onSubmit={e => this.crearPostIt(this.state.archivo, e)}>
              <input type='text' name='mensaje' />
              <input type="submit" className="submitPost" />
            </form>
          </div>
          : this.state.tipo == 'img' ?
            <form onSubmit={e => this.crearPostIt(this.state.archivo, e)}>
              <h3>Sube tu imagen</h3>
              {!this.state.archivo && <Dropzone onDrop={(accepted, rejected) => this.cargarArchivo(accepted, rejected)} />}
              {this.state.archivo && <div>
                <img src={this.state.archivo.preview} style={{ width: 300, display: 'block' }} />
                <button onClick={() => this.setState({ archivo: null })}> Cancelar </button>
              </div>}
              <h3>Comenta:</h3>
              <input type="text" name="mensaje" className="desc" /><br />
              <input type="submit" className="submitPost" />
            </form> :
            <form onSubmit={e => this.crearPostIt(this.state.archivo, e)}>
              <h3>Sube tu archivo</h3>
              {!this.state.archivo && <Dropzone onDrop={(accepted, rejected) => this.cargarArchivo(accepted, rejected)} />}
              {this.state.archivo && <div>
                <p>{this.state.archivo.name}</p>
                <button onClick={() => this.setState({ archivo: null })}> Cancelar </button>
              </div>}
              <h3>Comenta:</h3>
              <input type="text" name="mensaje" className="desc" /> <br />
              <input type="submit" className="submitPost" />
            </form>}
      </div>
      <nav>
        <button id='add' onClick={e => this.props.irA('create')}>Crear</button>
        <button id='homeb' onClick={e => this.props.irA('home')}>Home</button>
        <button id='perfil' onClick={e => this.props.irA('perfil')}>Perfil</button>
      </nav>
    </div>;
  }
}
