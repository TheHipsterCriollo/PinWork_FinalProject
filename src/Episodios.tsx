import * as React from 'react';

export class Episodios extends React.Component<any, any> {
  
  componentWillMount(){
    this.getEpisodios();
  }
  
  getEpisodios(){
    fetch('http://api.tvmaze.com/shows/1871/episodes')
      .then(data => data.json())
      .then(data => {
        console.log(data)
        this.setState({
          serie: {
            nombre: data.name,
            resumen: data.summary,
            img: data.image.medium
          }
        })
      });
  }
  
  render() {
    return <div className="row">
      episodios
    </div>; 
  }
}