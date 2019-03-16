import { Action } from "redux";

export interface AppState {
    data: Readonly<{
        menu?: {    //setting it optional
            icon: string,
            hideInput: boolean,
        }
    }>;
}

const searchIcon = 'search', closeIcon = 'close', 
    initState = {
        data: {
            menu: {
                icon: searchIcon,
                hideInput: true,
            },
        },
    };

export function reducer(state: AppState = initState, action: Action): AppState {
    switch (action.type) {
        case 'Toggle_home_search':
            return {
                ...state,
                data: {
                    menu: {
                        icon: state.data.menu.icon === searchIcon ? closeIcon : searchIcon,
                        hideInput: !state.data.menu.hideInput,
                    },
                },
            };
        case 'update':
            return {
                ...state,
                data: {
                },
            };
        default:
            return state;
    }
}