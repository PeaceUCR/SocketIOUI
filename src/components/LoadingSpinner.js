/**
 * Created by hea on 8/6/18.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

class LoadingSpinner extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div className={this.props.loading?"lds-roller":" hide lds-roller"}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }


}


//use this to get app state in class by props
function mapStateToProps(state) {
    return {loading: state.loading};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps)(LoadingSpinner);