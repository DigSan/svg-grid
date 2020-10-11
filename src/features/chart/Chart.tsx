import React from 'react';
import styles from './Chart.module.css';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

export interface Point { x: number, y: number };
export interface ChartParams { rotation: number };
export interface ChartState { zoom: number, position: Point, rotation: number }
export interface ZoomParams { zoom?: number }

export class Chart extends React.Component<ChartParams, ChartState> {
    mouseUp = new Subject();
    mouseLeave = new Subject();

    mouseDown = new Subject();
    wheelMoves = new Subject<React.WheelEvent<HTMLDivElement>>();
    destroy = new Subject();

    mouseMove = new Subject<Point>();

    constructor(props: any) {
        super(props);

        this.state = { zoom: 1, position: { x: 0, y: 0 }, rotation: 0 };
    }

    componentDidMount() {
        this.mouseDown.pipe(
            switchMap(() => this.mouseMove.pipe(takeUntil(this.mouseUp), takeUntil(this.mouseLeave))),
            takeUntil(this.destroy))
            .subscribe(x => {
                this.setState({
                    zoom: this.state.zoom,
                    position: {
                        x: this.state.position.x + x.x,
                        y: this.state.position.y + x.y
                    }
                });
            });

        this.wheelMoves.pipe(takeUntil(this.destroy))
            .subscribe(e => {
                var viewBounds = e.currentTarget.getBoundingClientRect();
                var mousePosition = {
                    x: e.clientX - viewBounds.x,
                    y: e.clientY - viewBounds.y
                };
                console.log(mousePosition);
                this.setState({ zoom: this.state.zoom - e.deltaY / 1000 })
            });
    }

    componentWillUnmount() {
        this.destroy.next();
        this.destroy.complete();
    }

    render() {
        const zoomedChildren = React.Children.map(this.props.children, child => {

            const props = { zoom: this.state.zoom, position: this.state.position };
            if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
            }
            return child;
        });

        return (
            <div className={styles.chart} onWheel={(e) => this.wheelMoves.next(e)}
                onMouseDown={(e) => { this.mouseDown.next(); e.stopPropagation() }}
                onMouseUp={() => this.mouseUp.next()}
                onMouseLeave={() => this.mouseUp.next()}

                onMouseMove={e => this.mouseMove.next({ x: e.movementX, y: e.movementY })}>
                {zoomedChildren}
                {/* <svg className={styles.background}>

                </svg> */}

            </div>
        );
    }
}