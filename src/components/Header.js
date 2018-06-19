/**
 * Created by hea on 3/30/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logOut }from '../actions/index';

class Header extends Component {
    constructor(props){
        super(props);
        this.menu = React.createRef();
    }



    renderUser(){
        if(this.props.user){
            return <div className="userDiv" onClick={this.handleClick}><img src={this.props.user.userImage}></img><span>{this.props.user.username}</span><i className="fas fa-sort-down"></i>
                    <div className="menu" ref={this.menu}>
                        <div><a href={"/user/"+this.props.user.id}>Profile</a></div>
                        <div> <a onClick={this.props.logOut}>Logout</a></div>
                    </div>
            </div>;
        }
    }
    render() {
        return <div className="header"><h1><i className="fas fa-comments"></i>Chatting<span>-a place to view and chat</span></h1>
                {this.renderUser()}
        </div>;
    }
}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({logOut: logOut}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
