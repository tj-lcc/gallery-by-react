import React from 'react';

export default class ImageFigre extends React.Component {
	render() {
		return (
			<figure className="img-figure">
				<img src={this.props.imageData.url} alt={this.props.imageData.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.imageData.title}</h2>
				</figcaption>
			</figure>
		);
	}
}