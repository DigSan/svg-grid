import React from 'react';
import { Point, ZoomParams } from './Chart';
import styles from './Chart.module.css';

export interface GridProps { position?: Point, zoom?: number }

export class Grid extends React.Component<GridProps> {
    size = 80;

    render() {
        const baseWidth = 1500;
        const baseHieght = 500;

        let zoom: number;
        if (!this.props.zoom)
            zoom = 1;
        else
            zoom = this.props.zoom

        let position: Point;
        if (!this.props.position)
            position = { x: 0, y: 0 };
        else
            position = this.props.position

        const viewBox = `${-position.x} ${-position.y} ${baseWidth} ${baseHieght}`;

        let lines = Array(80).fill(1).map((element, index) => index - 25)
        console.log(lines);
        return (
            <svg className={styles.background} width={baseWidth} height={baseHieght} viewBox={viewBox}>
                {lines.map(x => <line vectorEffect="non-scaling-stroke"
                    fill="none" stroke="white" strokeWidth="0.5px" y1={x * this.size / zoom} y2={x * this.size / zoom} x1={-10000} x2={10000}></line>)}
                <line ></line>
                {lines.map(x => <line vectorEffect="non-scaling-stroke"
                    fill="none" stroke="white" strokeWidth="0.5px" x1={x * this.size / zoom} x2={x * this.size / zoom} y1={-10000} y2={10000}></line>)}
                <line ></line>
            </svg>
        );
    }
}