import * as React from 'react';

interface Sprite {
    name?: string;
    width?: string;
    height?: string;
    fill?: string;
}

export const Icon: React.FunctionComponent<Sprite> = (props) => {
    const spritemap = "src/sprites/finance.svg#" + props.name;
    const style = {
        width: props.width ? props.width : '20px',
        height: props.height ? props.height : '20px',
        fill: props.fill ? props.fill : '#000',
    };
    return <svg style={style}>
        <use xlinkHref={spritemap} ></use>
    </svg >;
};

