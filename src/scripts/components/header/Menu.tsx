import * as React from 'react';
import { SearchInput } from './SearchInput';
import { Link } from 'react-router-dom';
import * as $ from 'jquery';

const MenuItems: React.FunctionComponent<{ isHidden: boolean }> = (props) => {
    return !props.isHidden && <div className="nav-items">
        <Link to="/"><div>Stock</div></Link>
        <Link to="/random"><div>Menu1</div></Link>
        <Link to="/randomAgain"><div>Menu2 </div></Link>
        <Link to='/contact'><div>Contact</div></Link>
    </div>;
};

export class Menu extends React.Component<{}, { icon: string, hideInput: boolean }>{

    searchInput: SearchInput;

    constructor(props: {}) {
        super(props);
        this.state = {
            icon: 'search',
            hideInput: true,
        };
        this.toggleInput = this.toggleInput.bind(this);
    }

    toggleInput(event?: { type: string }) {
        //console.log(event && event.type);
        this.setState({
            icon: this.state.icon === 'search' ? 'close' : 'search',
            hideInput: !this.state.hideInput,
        }, () => {
            if (!this.state.hideInput)
                this.searchInput.focusInput();
        });
    }

    render() {
        return (
            <div id="home-menu">
                <div className="portaitSearch flex-row">
                    <i className="material-icons searchIcon">search</i>
                    <input placeholder="search something ..." />
                </div>
                <MenuItems isHidden={!this.state.hideInput} />
                <div className="searchInput flex-row">
                    <SearchInput isHidden={this.state.hideInput} onBlur={this.toggleInput} ref={
                        (input) => {
                            this.searchInput = input;
                        }
                    } />
                    <i className="material-icons searchIcon" onClick={() => {
                        window.requestAnimationFrame(() => {
                            this.toggleInput();
                        });
                    }}>{this.state.icon}</i>
                </div>
                <Link to='/signup'><button>Sign in</button></Link>
            </div>
        );
    }
}