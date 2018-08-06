/**
 * Created by hea on 3/30/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logOut, redirect, disconnectNotifSocket }from '../actions/index';

class Header extends Component {
    constructor(props){
        super(props);

        this.menu =React.createRef();
        this.renderUser = this.renderUser.bind(this);
        this.renderNotification =this.renderNotification.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);
      //  this.props.joinNotification();

        this.state ={showNotif: false};
    }

    toggleNotification(){
        this.setState({showNotif : !this.state.showNotif});
    }

    //https://stackoverflow.com/questions/44246856/redux-loses-state-when-navigating-to-another-page
    //use push instead of href
    renderUser(){
        if(this.props.user){
            let that = this;
            return <div className="rightheader">
                <i className={this.props.notification.length>0?"fas fa-bell yes":"fas fa-bell no"} onClick={this.toggleNotification}></i>
                <div className={this.state.showNotif?"notifications yes":"notifications"} ref={this.menu}>
                    {this.renderNotification()}
                </div>
                <div className="userDiv" onClick={this.handleClick}><img src={this.props.user.userImage}></img><span>{this.props.user.username}</span><i className="fas fa-sort-down"></i>
                    <div className="menu" >
                        <div><a onClick = {function () {
                            that.props.redirect("/user/"+that.props.user.id);
                        }}>Profile</a></div>
                        <div> <a onClick={this.props.logOut}>Logout</a></div>
                    </div>
                </div>
            </div>;
        }
    }

    renderNotification(){
        if(this.props.notification.length>0){
            return this.props.notification.map(function (item, index, items) {
                return <div key={index+"notification"}className="notification"><p className="type">{item.type}</p><a className="avatar"><img src={item.sender.userImage}/><span>{item.sender.username}</span></a></div>
            });
        }

        return <p>No Notifications</p>
    }
    render() {
        return <div className="header"><h1><i className="fas fa-comments"></i>Chatting<span>-a place to view and chat</span></h1>
                {this.renderUser()}
        </div>;
    }


    componentWillUnmount(){
       // this.props.disconnectNotifSocket();
    }
}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({logOut: logOut, redirect: redirect, disconnectNotifSocket:disconnectNotifSocket}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user, notification: state.notification};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
