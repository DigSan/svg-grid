import React from 'react';
import styles from './Chart.module.css';
import { ChartState } from './Chart';

export class AutoScroll extends React.Component<ChartState> {
    render() {
        const baseWidth = 1500;
        const baseHieght = 500;

        const zoom = this.props.zoom;

        const viewBox = `${-this.props.position.x * zoom} ${-this.props.position.y * zoom} ${baseWidth * zoom} ${baseHieght * zoom}`;

        const zoomedChildren = React.Children.map(this.props.children, child => {
            const props = { zoom };
            if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
            }
            return child;
        });

        return (
            <svg className={styles.front} width={baseWidth} height={baseHieght} viewBox={viewBox}>
                <g transform={`rotate(${this.props.rotation} 50 50)`}>
                    {zoomedChildren}
                </g>
            </svg>
        );
    }
}