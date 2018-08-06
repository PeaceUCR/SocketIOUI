/**
 * Created by hea on 8/6/18.
 */

import React, {Component} from 'react';

class URLItem extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div className="url-item">
            <div className="title"><span>Dealer URL:</span><a href={this.props.item.url}>{this.props.item.url}</a><div className="lds-dual-ring"></div></div>
            <div className="result">{this.props.item.isFinish?<p>Result here</p>:<p>Waiting Result...</p>}</div>
        </div>;
    }
}


export default URLItem;