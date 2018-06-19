/**
 * Created by hea on 3/30/18.
 */

import React, {Component} from 'react';
import {constant} from '../constants';
import axios from 'axios';

class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.email = React.createRef();
        this.name = React.createRef();
        this.password = React.createRef();
        this.repassword = React.createRef();
        this.state = {error: null, signup: null};
    }

    //return error
    validate(){
      if(this.password.current.value!==this.repassword.current.value){
          return ['Two password not match!'];
      }

      return null;
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.validate()){
            this.setState({error: this.validate()});
        }else {
            this.setState({error: null});

            let that = this;
            let formData = {
                email: this.email.current.value,
                username: this.name.current.value,
                password: this.password.current.value
            };
            //we must set this headers, then in req.xhr can identify the xmlrequest
            axios.post(constant.server+'/signup',formData, {
                headers: { "X-Requested-With": "XMLHttpRequest"}
            }).then(function (data) {
                console.log(data);
                if(data.data.msg ==="sign up success"){
                    that.setState({signup: 'sign up success, please sign in'});
                }else{
                    that.setState({error: data.data});
                }
            }).catch(error => {
                console.log(error);
            });
        }

    }

    renderMsg(){
        if(this.state.error){
            console.log(this.state.error);
            if(this.state.error)
            return this.state.error.map(function(item, index, items){
                return <p key={index+"err"} className="error">{item}</p>
            });
        }
    }

    render() {
        return <form onSubmit={this.handleSubmit} method="POST"  className="form sign-up">
            <h1 className="title">Sign UP</h1>
            <label htmlFor="remail">Email</label>
            <input ref={this.email} type="email" name="email"  placeholder="" required/>
            <label htmlFor="remail">Name</label>
            <input ref={this.name} type="text" name="name"  placeholder="" required/>
            <label htmlFor="rpassword">Password</label>
            <input ref={this.password} type="password" name="password"  placeholder="" required/>
            <label htmlFor="repassword">RePassword</label>
            <input ref={this.repassword} type="password" name="Password"  placeholder="" required/>
            <input type="submit" name="Submit" value="Submit"/>
            {this.renderMsg()}
            <p className="signupsuccess">{this.state.signup}</p>
        </form>;

    }
}


export default RegisterForm;