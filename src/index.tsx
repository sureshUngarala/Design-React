import * as React from 'react';
import { render } from 'react-dom';
import { Sidebar } from './scripts/components/Sidebar';
import './index.scss';


render(<Sidebar ref={(sidebar) => {
    (window as any).sidebarComponent = sidebar;
}} />, document.getElementById('home-sidebar'));