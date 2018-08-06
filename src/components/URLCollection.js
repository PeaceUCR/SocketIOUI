/**
 * Created by hea on 8/6/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URLItem from './URLItem'
import { uploadFile }from '../actions/index';
import {constant} from '../constants';
import axios from 'axios';

class URLCollection extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div className="url-collection">
            {this.props.urls.map(function (item, index, items) {
                return <URLItem key={index+"url"} item={{url: item, isFinish: false}}/>
            })}
        </div>;
    }
}


//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({uploadFile: uploadFile}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {urls: state.urls};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(URLCollection);

