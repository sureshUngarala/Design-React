import * as React from 'react';
import { render } from 'react-dom';
import { Sidebar } from './scripts/components/Sidebar';
import { TileSet } from './scripts/components/tiles';
import './index.scss';


render(<Sidebar ref={(sidebar) => {
    (window as any).sidebarComponent = sidebar;
}} />, document.getElementById('home-sidebar'));

render(<TileSet size='3' />, document.getElementById('content-tiles'));

// window.setTimeout(() => {
//     (window as any).sidebarComponent.toggleHomeMenu();
// }, 2000);