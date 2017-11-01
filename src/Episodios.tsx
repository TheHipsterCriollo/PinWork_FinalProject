import * as React from 'react';

export class Episodios extends React.Component<any, any> {
  state = {
    episodios: []
  }

  componentWillMount(){
    this.getEpisodios();
  }
  
  getEpisodios(){
    fetch('http://api.tvmaze.com/shows/1128/episodes')
      .then(data => data.json())
      .then(data => {
        console.log(data)
        this.setState({
          episodios: data
        })
      });
  }
  
  render() {
    return <div className="row">
      {this.state.episodios.map(({ name, url, image, id }) => 
        <div className="col-sm-3" key={id}>
          <div className="card mb-4">
            {image && <img className="card-img-top" src={image.medium} />}
            <div className="card-body">
              <h4 className="card-title">{name}</h4>
              <a href={url} target="_blank" className="btn btn-info">ver</a>
            </div>
          </div>
        </div>
      )}
    </div>; 
  }
}