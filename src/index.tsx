import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

class Cust extends React.Component {
    render() {
        return (
            <div id="customElem">Custom Element</div>
        );
    }
}

ReactDOM.render(<Cust />, document.getElementById('custom'));