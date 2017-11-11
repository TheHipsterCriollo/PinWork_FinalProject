import * as React from 'react';
import { ajax } from 'jquery';



export class Root extends React.Component<any,any>{
    state = {
        projects: [],
    };

    componentWillMount(){
        this.getProjects();
    }
    
    getProjects(){
        ajax({
            url: 'https://api.behance.net/v2/projects?q=motorcycle&client_id=UqSBClMILi0xJ2QvW7dPM5ppzqIpybVh',
            dataType: 'jsonp'
        }).done((data) => {
            console.log(data.projects);
            this.setState({
                projects: data.projects
            });
        })
    }
    
  render(){
    return <div>
        <Header imagen="https://compass-ssl.xbox.com/assets/57/2d/572dc161-0e1c-4ff2-ae9f-bfc4d03ecb08.jpg?n=Cuphead_GLP-Page-Hero-1084_1920x600.jpg">
            <h1>Showcase & Discover <br /> Creative Work</h1>
        </Header>
        
        <div className="row">
            {this.state.projects.map((obj, index) => 
                <Preview key={index}
                    imagen={obj.covers['404']}
                    titulo={obj.name}
                    texto={obj.fields[0]}
                    url={obj.url}
                    btn="Go!"
                    />
            )}
        </div>
        
    </div>;
  }
}



export class Header extends React.Component<any,any>{
  render(){
    return <div style={{
            background: 'url('+this.props.imagen+')',
            backgroundSize: 'cover',
            textAlign: 'center',
            color: 'red'
        }}>
        <h1 style={{ whiteSpace: 'pre' }}>{this.props.titulo}</h1>
        {this.props.children}
    </div>;
  }
}


export class Preview extends React.Component<any,any>{
  render(){
    return <div className="col-sm-4">
        <div className="card">
            <img src={this.props.imagen} className="card-img-top" />
            <div className="card-body">
                <h4 className="card-title">{this.props.titulo}</h4>
                <p className="card-text">{this.props.texto}</p>
                <a href={this.props.url} className="btn btn-primary">{this.props.btn}</a>
              </div>
            
        </div>
    </div>;
  }
}



