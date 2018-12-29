import * as React from 'react';
import { Icon } from './Icon';

function tile(index: number) {
    return <div className="tile" key={index}></div>;
}

interface MyProps {
    size?: string;
}
export class TileSet extends React.Component<MyProps, {}> {
    render() {
        const tiles = [];
        for (let i = 0; i < +this.props.size; i++)
            tiles.push(tile(i));
        return (
            <div className="tileSet">{tiles}</div>
        );
    }
}