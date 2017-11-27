import * as React from 'react';

export class Registro extends React.Component<any, any>{

  registrarme(event) {
    event.preventDefault();
    var params = new URLSearchParams();
    params.append('usuario', event.target.user.value);
    params.append('password', event.target.pass.value);
    params.append('correo', event.target.email.value);
    params.append('nombre', event.target.name.value);
    params.append('apellido', event.target.subName.value);
    params.append('cargo', event.target.cargo.value);

    fetch(`http://localhost:3003/api/registro`, {
      method: 'POST',
      body: params
    })
      .then(e => e.json())
      .then(res => {
        console.log(res.mensaje);
      });
  }

  render() {
    return <div id='registro'>
      < form id="registro" onSubmit={ e => this.registrarme(e)}>
      <input type="text" name="name" placeholder='Nombre' /> <br />
      <input type="text" name="subName" placeholder='Apellidos' /> <br />
        <input type="text" name="user" placeholder='Usuario' /> <br />
        <input type="password" name="pass" placeholder='Contraseña' /> <br />
        <input type="email" name="email" placeholder='E-mail' /> <br />
        <select id="cargo" name="cargo">
          <option value="CEO">CEO</option>
          <option value="Diseñador">Diseñador</option>
          <option value="Programador">Programador</option>
          <option value="Mercadeo">Mercadeo</option>
          <option value="Logistica">Logistica</option>
          <option value="Administrador">Administrador</option>
          <option value="Secretario">Secretario</option>
        </select> <br />
        <input type="submit" value="Registrarme" />
      </form >
    </div >;
  }
}
