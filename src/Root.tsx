import * as React from 'react';
import { ajax } from 'jquery';

import { Login } from './Login';
import { Registro } from './Registro';
import { Create } from './CreatePostIt';
import { Home } from './Home';
import { Perfil } from './Perfil';

export class Root extends React.Component<any, any>{
  state = {
    usuarios: null,
    usuario: null,
    pagina: 'login'
  };

  irA(page) {
    this.setState({
      pagina: page
    });
  }

  setUsuario(user) {
    this.setState({
      usuario: user
    });
  }

  componentWillMount() {
    fetch('http://localhost:3003/api/users')
      .then(res => res.json())
      .then((res) => {
        if (res.mensaje == 'ok') {
          this.setState({
            usuarios: res.users
          });
          console.log(this.state.usuarios);
        }
      });
  }

  render() {
    switch (this.state.pagina) {
      case 'login':
        return <Login irA={page => this.irA(page)} setUsuario={user => this.setUsuario(user)} />;
      case 'registro':
        return <Registro irA={page => this.irA(page)} usuario={this.state.usuario} />;
      case 'home':
        return <Home irA={page => this.irA(page)} usuario={this.state.usuario} />;
      case 'create':
        return <Create usuario={this.state.usuario} irA={page => this.irA(page)} />;
      case 'perfil':
        return <Perfil usuario={this.state.usuario} irA={page => this.irA(page)} />;
    };
  }
}
