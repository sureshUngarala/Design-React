import * as React from 'react';

type myProps = {
    isHidden: boolean,
    onBlur: (event: { type: string }) => void
};

export class SearchInput extends React.Component<myProps, {}> {

    inputRef: HTMLElement;

    constructor(props: myProps) {
        super(props);
        this.changeHandler.bind(this);
    }

    focusInput() {
        this.inputRef.focus();
    }

    changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
    }

    render() {
        return (
            !this.props.isHidden && <React.Fragment>
                <i className="material-icons searchIcon">search</i>
                <input placeholder="search something ..." onChange={this.changeHandler}
                    /*onBlur={this.props.onBlur}*/
                    ref={(el) => {
                        this.inputRef = el;
                    }
                    }></input >
            </React.Fragment>
        );
    }
}