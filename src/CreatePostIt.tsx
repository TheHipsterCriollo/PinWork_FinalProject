import * as React from 'react';

export class Create extends React.Component<any, any>{

  state = {
    tipo: 'txt'
  }

  tipoDePost(event) {
    event.preventDefault();
    var form: any = event.target;
    this.setState({ tipo: form.value });
    console.log(this.state);
  }

  crearPostIt(event){
    event.preventDefault();
    
  }

  render() {
    return <div id='create'>
      <h3> Selecciona tu tipo de texto </h3>
      <div className='btnTypes'>
        <form onChange={e => this.tipoDePost(e)}>
          <input type='radio' name='typePost' value='txt' /> Texto
          <input type='radio' name='typePost' value='img' /> Imagen
          <input type='radio' name='typePost' value='file' /> Archivo
        </form>
      </div>
      <div id='creator'>
        {this.state.tipo == 'txt' &&
          <div>
            <form>
              <input type='text' name='mensaje' />
              <input type="submit" className="submitPost" />
            </form>
          </div>}
        {this.state.tipo == 'img' &&
          <form>
            <h3>Sube tu imagen</h3>
            <input type="file" id="images" name="img"
              accept=".jpg, .jpeg, .png" />
            <h3>Comenta:</h3>
            <input type="text" name="description" className="desc" /><br />
            <input type="submit" className="submitPost" />
          </form>}
        {this.state.tipo == 'file' &&
          <form>
            <h3>Sube tu archivo</h3>
            <input type="file" id="files" name="file"
              accept=".pdf, .doc, .docx" />
            <h3>Comenta:</h3>
            <input type="text" name="description" className="desc" /><br />
            <input type="submit" className="submitPost" />
          </form>}
      </div>
    </div>;
  }
}
