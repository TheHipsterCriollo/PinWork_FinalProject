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
        this.props.irA('login');
      });
  }

  render() {
    return <div id='containerR'>
    <div className='logo2'></div>
      < form id="formu2" onSubmit={ e => this.registrarme(e)}>
      <input type="text" name="name" placeholder='Nombre' id='texto' /> <br />
      <input type="text" name="subName" placeholder='Apellidos' id='texto'/> <br />
        <input type="text" name="user" placeholder='Usuario' id='texto'/> <br />
        <input type="password" name="pass" placeholder='Contraseña' id='texto'/> <br />
        <input type="email" name="email" placeholder='E-mail' id='texto'/> <br />
        <select name="cargo" id='texto'>
          <option value="CEO">CEO</option>
          <option value="Diseñador">Diseñador</option>
          <option value="Programador">Programador</option>
          <option value="Mercadeo">Mercadeo</option>
          <option value="Logistica">Logistica</option>
          <option value="Administrador">Administrador</option>
          <option value="Secretario">Secretario</option>
        </select> <br />
        <input type="submit" value="Registrarme" className='btn2'/>
      </form >
    </div >;
  }
}
