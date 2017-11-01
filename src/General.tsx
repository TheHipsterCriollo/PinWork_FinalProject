import * as React from 'react';

export const General = ({ img, resumen }) => {
  return <div className="row">
    <div className="col-sm-4">
      <img src={img} className="img-fluid" />    
    </div>
    <div className="col-sm-8">
      <div dangerouslySetInnerHTML={{ __html: resumen }} />
    </div>
  </div>;
}