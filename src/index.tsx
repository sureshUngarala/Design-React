import * as React from 'react';
import { render } from 'react-dom';
import { Sidebar } from './scripts/components/header/Sidebar';
import { Menu } from './scripts/components/header/Menu';
import { TileSet } from './scripts/components/TileSet';
import './index.scss';


render(<Sidebar ref={(sidebar) => {
    (window as any).sidebarComponent = sidebar;
}} />, document.getElementById('home-sidebar'));

render(<Menu />, document.getElementsByClassName('home-menu-rel')[0]);
render(<TileSet size='3' />, document.getElementById('content-tiles'));

// window.setTimeout(() => {
//     (window as any).sidebarComponent.toggleHomeMenu();
// }, 2000);