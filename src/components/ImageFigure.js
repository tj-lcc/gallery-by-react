import React from 'react';

class ImageFigure extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        let index = this.props.index;
        if (this.props.arrange.center) {
            this.props.inverseFunc(index)();
        } else {
            this.props.centerFunc(index)();
        }
    }

    render() {

        let styleObj = {};

        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

		if (this.props.arrange.center) {
            styleObj['zIndex'] = 11;
        }        

        if (this.props.arrange.rotate > 0) {
            styleObj['transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
        }

        let className = 'img-figure' + (this.props.arrange.inverse ? ' inverse' : '');

        return ( 
        	< figure className = { className } style = { styleObj } onClick = { this.handleClick } >
            	< img src = { this.props.imageData.url } alt = { this.props.imageData.title }/> 
            	<figcaption>
            		<h2 className="img-title"> {this.props.imageData.title}</h2>
            		<h2 className="img-desc"> {this.props.imageData.description}</h2>
            	</figcaption> 
            < /figure>
        );
    }
}

export default ImageFigure;
