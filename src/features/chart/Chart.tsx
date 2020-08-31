import React, { useEffect } from 'react';
import styles from './Chart.module.css';
import { fromEvent, Subject, of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

interface Point { x: number, y: number };
interface ChartState { zoom: number, position: Point }

export class Chart extends React.Component<{}, ChartState> {
    mouseUpDown = new Subject<number>();
    mouseMove = new Subject<Point>();
    testChart: Point[] = [
        { x: 10, y: 20 },
        { x: 20, y: 25 },
        { x: 30, y: 15 },
        { x: 35, y: 15 },
        { x: 45, y: 5 }
    ]
    constructor(props: any) {
        super(props);

        this.state = { zoom: 1, position: { x: 0, y: 0 } };

        this.mouseUpDown.pipe(
            switchMap(x => x === 1 ? this.mouseMove : new Subject<Point>()))
            .subscribe(x => {
                this.setState({ zoom: this.state.zoom, position: { x: this.state.position.x + x.x, y: this.state.position.y + x.y } });
            });
    }

    render() {
        const baseWidth = 1500;
        const baseHieght = 500;


        const t2 = this.testChart.map((e) => `${e.x},${e.y}`).join(' ');

        const maxX = Math.max(...this.testChart.map(x => x.x));
        const maxY = Math.max(...this.testChart.map(x => x.y));
        const minX = Math.min(...this.testChart.map(x => x.x));
        const minY = Math.min(...this.testChart.map(x => x.y));

        const width = maxX / (Math.abs(this.state.zoom) + 1);
        const hieght = maxY / (Math.abs(this.state.zoom) + 1);

        const zoom = 1 / Math.pow(this.state.zoom, 2);

        const viewBox = `${-this.state.position.x * zoom} ${-this.state.position.y * zoom} ${baseWidth * zoom} ${baseHieght * zoom}`;

        const divStyle = {
            font: `italic ${(14 * (Math.abs(zoom) ))}px sans-serif`
        };

        const t1 = this.testChart.map(e => <text style={divStyle} x={e.x} y={e.y}>{zoom.toFixed(2)}</text>)

        return (
            <div className={styles.chart} onWheel={(e) => this.setState({ zoom: this.state.zoom - e.deltaY / 1000 })}
                onMouseDown={() => this.mouseUpDown.next(1)}
                onMouseUp={() => this.mouseUpDown.next(2)}
                onMouseMove={e => this.mouseMove.next({ x: e.movementX, y: e.movementY })}
            >
                <svg width={baseWidth} height={baseHieght} viewBox={viewBox}>
                    <polyline points={t2} vectorEffect="non-scaling-stroke" fill="none" stroke="white" strokeWidth="1px" />
                    {t1}
                </svg>
            </div>
        );
    }
}