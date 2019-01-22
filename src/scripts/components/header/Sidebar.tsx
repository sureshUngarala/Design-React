import * as React from 'react';
import * as $ from 'jquery';
type myState = { icon: string };

export class Sidebar extends React.Component<{}, myState> {

    constructor(props: any) {
        super(props);
        this.state = {
            icon: 'view_headline',
        };
        this.toggleHomeMenu = this.toggleHomeMenu.bind(this);
    }

    toggleHomeMenu() {
        const homeMenu = $('#home-menu');
        const display = homeMenu.css('display');

        if (display === 'none')
            window.requestAnimationFrame(() => {
                homeMenu.slideDown(600, () => {
                    homeMenu.css('display', 'block');
                });
            });
        else
            window.requestAnimationFrame(() => {
                homeMenu.slideUp(600, () => {
                    homeMenu.css('display', 'none');
                });
            });

        this.setState({
            icon: this.state.icon === 'view_headline' ? 'close' : 'view_headline',
        });
    }

    render() {
        return (
            <i className="material-icons" onClick={this.toggleHomeMenu}>{this.state.icon}</i>
        );
    }
}

