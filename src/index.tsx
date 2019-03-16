import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { reducer } from './scripts/reducers/index';
import { Sidebar } from './scripts/components/header/Sidebar';
import Menu from './scripts/components/header/Menu';
import { TileSet } from './scripts/components/TileSet';
import { Contact } from './scripts/components/Contact';
import { Signup } from './scripts/components/Signup';
import { NotFound } from './scripts/components/NotFound';
import './index.scss';


// render(<Sidebar ref={(sidebar) => {
//     (window as any).sidebarComponent = sidebar;
// }} />, document.getElementById('home-sidebar'));

//render(<Menu />, document.getElementsByClassName('home-menu-rel')[0]);
//render(<TileSet size='3' />, document.getElementById('content-tiles'));

const store = createStore(reducer);

const body = (
    <Provider store={store}>
        <Router>
            <div>
                <div className="header fixed-header">
                    <div id="home-logo"><Link to="/">Home</Link></div>
                    <div id="home-sidebar">
                        <Sidebar ref={(sidebar) => { (window as any).sidebarComponent = sidebar; }} />
                    </div>
                    <div className="home-menu-rel">
                        <Menu />
                    </div>
                </div>
                <div id="home-body">
                    <div id="content-tiles"></div>
                    <div id="routing">
                        <Switch>
                            <Route path="/" component={TileSet} exact />
                            <Route path="/signup" component={Signup} />
                            <Route path="/contact" component={Contact} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router >
    </Provider>
);
render(body, document.getElementById('body'));

// window.setTimeout(() => {
//     (window as any).sidebarComponent.toggleHomeMenu();
// }, 2000);