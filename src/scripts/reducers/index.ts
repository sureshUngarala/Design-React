import { Action, combineReducers, Reducer } from "redux";
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from "history";
import { any } from "prop-types";

export interface AppState {
    data: Readonly<{
        menu?: {    //setting it optional
            icon: string,
            hideInput: boolean,
        }
    }>;
}

const searchIcon = 'search', closeIcon = 'close';
export const initState: AppState = {
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

export interface AppStore{
    router?: RouterState;
    reducer: AppState;
}
export const createRootReducer = (history: History) => {
    return combineReducers({
        router: connectRouter(history),
        reducer,
    });
};