import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { SearchInput } from './SearchInput';
import { AppState } from './../../reducers/index';
import { toggleHomeSearch } from './../../actions/index';
import * as $ from 'jquery';

const MenuItems: React.FunctionComponent<{ isHidden: boolean }> = (props) => {
    return !props.isHidden && <div className="nav-items">
        <Link to="/"><div>Stock</div></Link>
        <Link to="/random"><div>Menu1</div></Link>
        <Link to="/randomAgain"><div>Menu2 </div></Link>
        <Link to='/contact'><div>Contact</div></Link>
    </div>;
};

interface MenuCompProps {
    icon: string;
    hideInput: boolean;
    toggleSearch: () => {};
}

class Menu extends React.Component<MenuCompProps> {

    searchInput: SearchInput;

    constructor(props: MenuCompProps) {
        super(props);
        //this.toggleInput = this.toggleInput.bind(this);
    }

    toggleInput() {
        this.props.toggleSearch();
        if (!this.props.hideInput)
            this.searchInput.focusInput();
    }


    // toggleInput(event?: { type: string }) {
    //     //console.log(event && event.type);
    //     this.setState({
    //         icon: this.state.icon === 'search' ? 'close' : 'search',
    //         hideInput: !this.state.hideInput,
    //     }, () => {
    //         if (!this.state.hideInput)
    //             this.searchInput.focusInput();
    //     });
    // }

    render() {
        const { icon, hideInput } = this.props;
        return (
            <div id="home-menu">
                <div className="portaitSearch flex-row">
                    <i className="material-icons searchIcon">search</i>
                    <input placeholder="search something ..." />
                </div>
                <MenuItems isHidden={!hideInput} />
                <div className="searchInput flex-row">
                    <SearchInput isHidden={hideInput} onBlur={() => this.toggleInput} ref={
                        (input) => {
                            this.searchInput = input;
                        }
                    } />
                    <i className="material-icons searchIcon" onClick={() => {
                        window.requestAnimationFrame(() => {
                            this.toggleInput();
                        });
                    }}>{icon}</i>
                </div>
                <Link to='/signup'><button>Sign in</button></Link>
            </div>
        );
    }
}

interface MapStateToProps {
    icon: string;
    hideInput: boolean;
}

interface MapDispatchToProps {
    toggleSearch: () => {};
}

const mapStateToProps = (state: AppState) => ({
    icon: state.data.menu.icon,
    hideInput: state.data.menu.hideInput,
});

const mapDispatchToProps = {    //If mapDispatchToProps is object, dispatchProps will be merged to component's props.
    toggleSearch: toggleHomeSearch,
};

// function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
//     return (Object as any).assign({}, ownProps, stateProps, dispatchProps);
// }

// function mapDispatchToProps(dispatch: Dispatch) {
//     return {
//         toggleSearch: toggleHomeSearch,
//     };
// }

export default connect<MapStateToProps, MapDispatchToProps>(mapStateToProps, mapDispatchToProps)(Menu);