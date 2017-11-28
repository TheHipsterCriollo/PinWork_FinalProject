import * as React from 'react';
import { PostIt } from './postIt';

export class Home extends React.Component<any, any>{

  state = {
    postits: null,
    filtrados: null
  }

  componentWillMount() {
    fetch('http://localhost:3003/api/home')
      .then(res => res.json())
      .then((res) => {
        if (res.mensaje == 'ok') {
          this.setState({
            postits: res.posts,
            filtrados: res.posts
          });
          console.log(this.state.postits);
        }
      });
  }

  filtrado(e) {
    e.preventDefault();
    var filtrados = this.state.postits.filter((f) => {
      if (e.target.value == 'todos') {
        return true;
      } else { return f.tipo == e.target.value };
    });
    this.setState({
      filtrados: filtrados
    });
  }

  render() {
    return <div id='containerH'>
    <nav className='rectangle'>
    <button id='homeb' onClick={e => this.props.irA('home')}></button>
    <button id='addP' onClick={e => this.props.irA('create')}></button>
    <button id='perfil' onClick={e => this.props.irA('perfil')}></button>
    </nav>
      <div id='filtros'>
        <form onChange={e => this.filtrado(e)}>
          <input type='radio' name='typePost' value='txt' /> Texto
        <input type='radio' name='typePost' value='img' /> Imagen
        <input type='radio' name='typePost' value='file' /> Archivo
        <input type='radio' name='typePost' value='todos' /> Todos
      </form>
      </div>
      <div id='contenido'>
        {!this.state.postits ? <div> <h1> Sube tus post-its </h1> </div> : this.state.filtrados.map((obj, index) => <PostIt key={index}
          autor={obj.autor}
          archivo={obj.archivo}
          texto={obj.texto}
          tipo={obj.tipo} />)}
      </div>
      <nav>

      </nav>
    </div>;
  }
}
