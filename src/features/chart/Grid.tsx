import React from 'react';
import { Point, ZoomParams } from './Chart';
import styles from './Chart.module.css';

export interface GridProps { position?: Point, zoom?: number }

export class Grid extends React.Component<GridProps> {

    render() {
        const baseWidth = 1500;
        const baseHieght = 500;

        let zoom: number;
        if (!this.props.zoom)
            zoom = 1;
        else
            zoom = this.props.zoom

        const size = 80 * zoom;

        let position: Point;
        if (!this.props.position)
            position = { x: 0, y: 0 };
        else
            position = this.props.position

        const viewBox = `${-position.x} ${-position.y} ${baseWidth} ${baseHieght}`;

        const viewBoxRight = `${0} ${-position.y} ${60} ${baseHieght}`;

        const viewBoxBottom = `${-position.x} ${-25} ${baseWidth} ${60}`;

        let lines = Array(80).fill(1).map((element, index) => index - 25)
        console.log(lines);
        return (
            <div>
                <svg className={styles.background} width={baseWidth} height={baseHieght} viewBox={viewBox}>
                    {lines.map(x => <line vectorEffect="non-scaling-stroke"
                        fill="none" stroke="white" strokeWidth="1px" y1={x * size / zoom} y2={x * size / zoom} x1={-10000} x2={10000}></line>)}
                    {lines.map(x => <line vectorEffect="non-scaling-stroke"
                        fill="none" stroke="white" strokeWidth="0.5px" x1={x * size / zoom} x2={x * size / zoom} y1={-10000} y2={10000}></line>)}
                </svg>

                <svg style={{ right: 0, top: 0, position: "absolute", background: "red" }} width={60} height={baseHieght} viewBox={viewBoxRight}>
                    {lines.map(x => <text vectorEffect="non-scaling-stroke"
                        fill="none" stroke="white" strokeWidth="0.2px" y={x * size / zoom} x={0}>{(-x * size).toFixed(2)}</text>)}
                </svg>

                <svg style={{ left:0, bottom: 0, width: '100%', position: "absolute", background: "red" }} width={baseWidth} height={60} viewBox={viewBoxBottom}>
                    {lines.map(x => <text vectorEffect="non-scaling-stroke"
                        fill="none" stroke="white" strokeWidth="0.2px" x={x * size / zoom} y={0}>{(x * size).toFixed(2)}</text>)}
                </svg>
            </div>
        );
    }
}