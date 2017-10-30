import * as React from 'react';

export class Root extends React.Component<any,any>{
  
    state = {
      lista: [],
      nuevo: '',
    }
    
    agregarEstudiante(){
      this.state.lista.push({
        nombre: this.state.nuevo,
        asistio: false
      });
      this.setState({ nuevo: '' });
    }
    
    tacharEstudiante(index){
      this.state.lista[index].asistio = !this.state.lista[index].asistio;
      this.forceUpdate();
    }

    render(){
      return <div>
        {this.state.nuevo && <h2>Estudiante nuevo = {this.state.nuevo}</h2>}
        
        <input value={this.state.nuevo} onChange={(e) => this.setState({ nuevo: e.target.value })} />
        
        <button onClick={() => this.agregarEstudiante()}>agregar</button>

        {this.state.lista.map((obj, i) => {
          return <Estudiante key={obj.nombre}
            onClick={() => this.tacharEstudiante(i)}
            asistio={obj.asistio}
            nombre={obj.nombre} />;
        })}
      </div>
    }
}

class Estudiante extends React.Component<any, any>{
  render(){
    return <div 
    
    style={{ 
      textDecoration: this.props.asistio && 'line-through',
    }}>
      {this.props.nombre} <button onClick={this.props.onClick}>
        {this.props.asistio ? 'destachar' : 'tachar'}
      </button>
    </div>
  }
}