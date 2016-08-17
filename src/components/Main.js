import React from 'react';
import Util from './Util';

require('normalize.css/normalize.css');
require('styles/App.scss');

let imageDataArr = require('../data/imageData.json');
Util.generateImageURL(imageDataArr);

let imgDOMs = (function(imageDataArr) {
	return imageDataArr.map((imageData, index)=>{
		return <img src={imageData.url} key={index} style={{maxHeight: '50px'}}/>;
	});
})(imageDataArr);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec"></section>
      	<nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
