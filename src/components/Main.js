import React from 'react';
import Util from './Util';
import ImageFigure from './ImageFigure';

require('normalize.css/normalize.css');
require('styles/App.scss');

let imageDataArr = require('../data/imageData.json');
Util.generateImageURL(imageDataArr);

class AppComponent extends React.Component {
  render() {

    let controllerUnits = [],
        imageFigures = [];

    imageDataArr.forEach(function(imageData) {
      imageFigures.push(<ImageFigure key={imageData.url} imageData={imageData}/>);
    });

    return (
      <section className="stage">
      	<section className="img-sec">
          {imageFigures}
        </section>
      	<nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
