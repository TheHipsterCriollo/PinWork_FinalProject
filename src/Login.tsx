import * as React from 'react';

export class Login extends React.Component<any, any>{

  state = {

  }

  ingresarUsuario(event) {
    event.preventDefault();

    var params = new URLSearchParams();
    params.append('usuario', event.target.user.value);
    params.append('password', event.target.pass.value);

    fetch(`http://localhost:3003/api/login`, {
      method: 'POST',
      body: params
    })
      .then(e => e.json())
      .then(res => {
        if (res.mensaje == 'logged') {
          localStorage.setItem('usuario', JSON.stringify(res.user));
          this.props.setUsuario(res.user);
          this.props.irA('home');
          console.log(res.mensaje);
        } else {
          alert(res.mensaje);
        }
      });
  }

  render() {
    return <div id='containerL'>
    <div className='logo' />
      <form id='formu' onSubmit={e => this.ingresarUsuario(e)}>
        <input id='texto' type="text" name="user" placeholder="Usuario" /><br />
        <input id='texto' type="password" name="pass" placeholder="Contraseña" /><br />
        <input className='btn' type="submit" value='Login' /><br />
        <a id='registro' onClick={e=>this.props.irA('registro')}><u>Registro</u></a>
      </form>
    </div>;
  }
}
