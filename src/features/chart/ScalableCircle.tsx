import React from 'react';
import { Point, ZoomParams } from './Chart';


export class ScalableCircle extends React.Component<Point & ZoomParams> {
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
            
        return (<circle cx={this.props.x} cy={this.props.y} r={20 * zoom}></circle>);
    }
}