import React from 'react';
import { Point, ZoomParams } from './Chart';


export class ScalableText extends React.Component<Point & ZoomParams> {
    constructor(props: any) {
        super(props);

        this.state = { zoom: 1, position: { x: 0, y: 0 } };
    }

    render() {
        let zoom: number;
        if (!this.props.zoom)
            zoom = 1;
        else
            zoom = this.props.zoom
            
        const divStyle: React.CSSProperties = {
            font: `italic ${(14 * (Math.abs(zoom)))}px sans-serif`,
            color: "white"
        };

        return (<text style={divStyle} x={this.props.x} y={this.props.y}>{(-this.props.y).toFixed(2)}</text>);
    }
}