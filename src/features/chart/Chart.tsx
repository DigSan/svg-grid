import React, { useEffect } from 'react';
import styles from './Chart.module.css';

interface Point { x: number, y: number };


export class Chart extends React.Component<{}, { zoom: number }> {
    constructor(props: any) {
        super(props);

        this.state = { zoom: 0 };
        useEffect(() => {
            const clicky = fromEvent(this.chart.current, 'click').subscribe(clickety =>
                console.log({ clickety })
            );
        }
        );

    }
    chart = React.useRef(null);
    render() {

        const testChart: Point[] = [
            { x: 10, y: 20 },
            { x: 20, y: 25 },
            { x: 30, y: 15 },
            { x: 35, y: 15 },
            { x: 45, y: 5 }
        ]

        const maxY = Math.max(...testChart.map(x => x.y));
        const maxX = Math.max(...testChart.map(x => x.x));
        const minX = Math.min(...testChart.map(x => x.x));
        const minY = Math.min(...testChart.map(x => x.y));

        const t2 = testChart.map((e) => `${e.x},${e.y}`).join(' ');

        const divStyle = {
            font: `italic ${(10 / (Math.abs(this.state.zoom) * 10 + 1) * 2)}px sans-serif`
        };

        const t1 = testChart.map(e => <text style={divStyle} x={e.x} y={e.y}>{this.state.zoom.toFixed(2)}</text>)


        return (
            <div className={styles.chart} onWheel={(e) => this.setState({ zoom: this.state.zoom + e.deltaY / 2000 })}>
                <svg width="500" viewBox={`${minX} ${minY} ${maxX / Math.abs(this.state.zoom)} ${maxY / Math.abs(this.state.zoom)}`}>
                    <line x1="1" x2=""></line>

                    <polyline points={t2} vectorEffect="non-scaling-stroke" fill="none" stroke="white" strokeWidth="1px" />
                    {t1}
                </svg>
            </div>
        );
    }
}