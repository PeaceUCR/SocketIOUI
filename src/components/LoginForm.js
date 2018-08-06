/**
 * Created by hea on 3/30/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser, logOut }from '../actions/index';
import {constant} from '../constants';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.email = React.createRef();
        this.password = React.createRef();
    }

    handleSubmit(event){
        event.preventDefault();

        let formData = {
            email: this.email.current.value,
            password: this.password.current.value,
        }

        this.props.setUser(formData);
        /*
        //we must set this headers, then in req.xhr can identify the xmlrequest
        axios.post('http://localhost:5000/login',formData, {
            headers: { "X-Requested-With": "XMLHttpRequest"}
        }).then(function (data) {
            console.log(data);
            that.props.setUser(data.data.user);
        }).catch(error => {
            console.log(error);
        });
        */
    }

    componentWillMount(){
       // this.props.getUser();
    }

    renderMsg(){
        if(this.props.error){
            return this.props.error.map(function(item, index, items){
                return <p key={index+"err"} className="error">{item}</p>
            });
        }
    }
    render() {
        return <form onSubmit={this.handleSubmit} method="POST" className="loginForm form sign-in">
                    <h1 className="title">Welcome back</h1>
                    <label htmlFor="email">Email</label>
                    <input ref ={this.email} type="email" name="email"  required/>


                    <label htmlFor="password">Password</label>
                    <input ref ={this.password} type="password" name="password" required/>


                <input type="submit" name="Submit" id="loginsubmit" value="Submit"/>
                {
                    this.renderMsg()
                }
                <a className="forgot" href="/forgot">Forgot Password?</a>
                <a id="googleLogin" href={constant.server+"/auth/google"}><i className="fab fa-google-plus-square"></i></a>
            </form>;

    }
}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({setUser: setUser, logOut: logOut}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user, error: state.error};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);