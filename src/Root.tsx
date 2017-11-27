import * as React from 'react';
import { ajax } from 'jquery';

import { Login } from './Login';
import { Registro } from './Registro';
import { Create } from './CreatePostIt';
import { Home } from './Home';



export class Root extends React.Component<any, any>{
  state = {
    usuarios: null,
    pagina: 'home'
  };

  irA(page) {
    this.setState({
      pagina: page
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
          console.log(this.state.usuarios)
        }
      });
  }

  render() {
    switch (this.state.pagina) {
      case 'login':
        return <Login irA={page => this.irA(page)} />;
      case 'registro':
        return <Registro />;
      case 'home':
      return <Home />;
      case 'create':
        return <Create />;
    };
  }
}
