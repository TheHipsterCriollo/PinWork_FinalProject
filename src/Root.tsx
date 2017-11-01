import * as React from 'react';

import { General } from './General';
import { Episodios } from './Episodios';

export class Root extends React.Component<any,any>{
  
  state = {
    serie: {
      nombre: '',
      resumen: '',
      img: '',
    },
    activo: 'General'
  }
  
  componentWillMount(){
    this.getGeneral();
  }
  
  getGeneral(){
    fetch('http://api.tvmaze.com/shows/1128')
    .then(data => data.json())
    .then(data => {
      console.log(data)
      this.setState({
        serie: {
          nombre: data.name,
          resumen: data.summary,
          img: data.image.original
        }
      })
    });
  }
  
  
  
  render(){
    const { activo } = this.state
    const { nombre, resumen, img } = this.state.serie;
    
    const tabs = ['General', 'Episodios', 'Reparto'];
    
    return <div>
      <div className="container">
        <div className="row" style={{ marginBottom: 20 }}>
          <div className="col-sm-12">
            <h2 className="display-3 my-5">{nombre}</h2>
            
            <ul className="nav nav-tabs">
              {tabs.map((tab, i) => 
                <li className="nav-item" key={tab}>
                <a className={`nav-link ${activo == tab && 'active'}`} 
                href="#"
                onClick={() => this.setState({ activo: tab })}>{tab}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        {/* comentario */}
        
        {activo == 'General' && <General img={img} resumen={resumen} />}
        {activo == 'Episodios'  && <Episodios />}
        
      </div>
    </div>;
  }
}
