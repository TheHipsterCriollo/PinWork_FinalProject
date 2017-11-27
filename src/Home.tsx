import * as React from 'react';

export class Home extends React.Component<any, any>{

  state = {
    postits: null
  }

  componentWillMount() {
    fetch('http://localhost:3003/api/home')
      .then(res => res.json())
      .then((res) => {
        if (res.mensaje == 'ok') {
          this.setState({
            postits: res.postits
          });
          console.log(this.state.postits);
        }
      });
  }

  render() {
    return <div>

      <div id='contenido'>
        {!this.state.postits ? <div> <h1> Sube tus post-its </h1> </div> : this.state.postits.map((hue) => <div>

        </div>)}
      </div>
      <nav>
        <button id='add'>Crear</button>
        <button id='homeb'>Home</button>
        <button id='perfil'>Perfil</button>
      </nav>
    </div>;
  }
}
