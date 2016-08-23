import React from 'react';
import ReactDOM from 'react-dom';
import Util from './Util';
import ImageFigure from './ImageFigure';

require('normalize.css/normalize.css');
require('styles/App.scss');

let imageDataArr = require('../data/imageData.json');
Util.generateImageURL(imageDataArr);

class AppComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                imgArrangeArr: []
            };
            this.constants = {
                centerPos: { // 中心图片位置点
                    left: 0,
                    top: 0
                },
                hPosRange: {
                    leftSecX: [0, 0],
                    rightSecX: [0, 0],
                    y: [0, 0]
                },
                vPosRange: {
                    x: [0, 0],
                    topY: [0, 0]
                }
            }
            this.inverse = this.inverse.bind(this);
            this.center = this.center.bind(this);
        }

        /**
         * 翻转图片
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        inverse(index) {
            return () => {
                let imgArrangeArr = this.state.imgArrangeArr;
                imgArrangeArr[index].inverse = !imgArrangeArr[index].inverse;

                this.setState({
                    imgArrangeArr: imgArrangeArr
                });
            }
        }

        /**
         * 重新布局所有图片
         * @param  {int} centerIndex 
         * @return {undefined}
         */
        rearrange(centerIndex) {
            let imgArrangeArr = this.state.imgArrangeArr,
                constants = this.constants,
                centerPos = constants.centerPos,
                hPosRange = constants.hPosRange,
                vPosRange = constants.vPosRange,
                hPosRangeLeftSecX = hPosRange.leftSecX,
                hPosRangeRightSecX = hPosRange.rightSecX,
                hPosRangeY = hPosRange.y,
                vPosRangeTopY = vPosRange.topY,
                vPosRangeX = vPosRange.x,

                imgArrangeTopArr = [],
                topImgNum = Math.floor(Math.random() * 2),
                topImgSpliceIndex = 0,

                imgArrangeCenterArr = imgArrangeArr.splice(centerIndex, 1);

            // 居中的图片
            imgArrangeCenterArr[0] = {
                pos: centerPos,
                rotate: 0,
                center: true
            }

            // 布局上侧的图片
            topImgSpliceIndex = Math.floor(Math.random() * (imgArrangeArr.length - topImgNum));
            imgArrangeTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);

            imgArrangeTopArr.forEach(function(value, index) {
                imgArrangeTopArr[index] = {
                    pos: {
                        top: Util.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                        left: Util.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                    },
                    rotate: Util.getRandomDeg(),
                    center: false
                };
            })

            // 布局左右两侧的图片
            for (let i = 0, j = imgArrangeArr.length, k = j / 2; i < j; i++) {
                let hPosRangeLORX = null;
                if (i < k) {
                    hPosRangeLORX = hPosRangeLeftSecX;
                } else {
                    hPosRangeLORX = hPosRangeRightSecX;
                }

                imgArrangeArr[i] = {
                    pos: {
                        top: Util.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                        left: Util.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                    },
                    rotate: Util.getRandomDeg(),
                    center: false
                };
            }

            if (imgArrangeTopArr && imgArrangeTopArr[0]) {
                imgArrangeArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
            }

            imgArrangeArr.splice(centerIndex, 0, imgArrangeCenterArr[0])

            this.setState({
                imgArrangeArr: imgArrangeArr
            });
        }

        center(index) {
            return () => {
                this.rearrange(index);
            }
        }

        // 组件加载后为每张图片计算位置
        componentDidMount() {
            let stageDom = this.refs.stage,
                stageW = stageDom.scrollWidth,
                stageH = stageDom.scrollHeight,
                halfStageW = Math.floor(stageW / 2),
                halfStageH = Math.floor(stageH / 2);
            let imageFigureDom = ReactDOM.findDOMNode(this.refs.imageFigure0),
                imgW = imageFigureDom.scrollWidth,
                imgH = imageFigureDom.scrollHeight,
                halfImgW = Math.floor(imgW / 2),
                halfImgH = Math.floor(imgH / 2);

            this.constants.centerPos = {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            };
            this.constants.hPosRange.leftSecX[0] = -halfImgW;
            this.constants.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
            this.constants.hPosRange.rightSecX[0] = halfStageW + halfImgW;
            this.constants.hPosRange.rightSecX[1] = stageW - halfImgW;
            this.constants.hPosRange.y[0] = -halfImgH;
            this.constants.hPosRange.y[1] = stageH - halfImgH;

            this.constants.vPosRange.topY[0] = -halfImgH;
            this.constants.vPosRange.topY[1] = halfStageH - halfImgH * 3;
            this.constants.vPosRange.x[0] = halfStageW - imgW;
            this.constants.vPosRange.x[1] = halfStageW;

            this.rearrange(0);
        }

        render() {

            let controllerUnits = [],
                imageFigures = [];

            imageDataArr.forEach((imageData, index) => {
                    if (!this.state.imgArrangeArr[index]) {
                        this.state.imgArrangeArr[index] = {
                            pos: {
                                left: 0,
                                top: 0
                            },
                            rotate: 0,
                            inverse: false,
                            center: false
                        };
                    }
                    imageFigures.push( < ImageFigure key = { imageData.url }
                        imageData = { imageData }
                        ref = { 'imageFigure' + index }
                        arrange = { this.state.imgArrangeArr[index] }
                        inverseFunc = { this.inverse }
                        centerFunc = { this.center }
                        index = { index }
                        />);
                    });

                return ( < section className = "stage"
                    ref = "stage" >
                    < section className = "img-sec" > { imageFigures } < /section> < nav className = "controller-nav" > { controllerUnits } < /nav> < /section>
                );
            }
        }

        AppComponent.defaultProps = {};

        export default AppComponent;
