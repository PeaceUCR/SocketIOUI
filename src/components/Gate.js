/**
 * Created by hea on 6/1/18.
 */


/**
 * Created by hea on 3/30/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import axios from 'axios';

class Gate extends Component {
    constructor(props){
        super(props);
        this.state = {status: 'login'};
        this.handleClick = this.handleClick.bind(this);
        this.loginForm =  React.createRef();
        this.signupForm =  React.createRef();
    }

    handleClick(){
        let s = this.state.status ==='login'? 'signup':'login' ;
        this.setState({status: s});
    }



    //this.state.status==='login'?'cont':'cont s--signup'
    render() {
        return <div className={this.state.status==='login'?'cont': 'cont s--signup'} >
            <LoginForm ref={this.loginForm}/>
            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--up">
                        <h2>New here?</h2>
                        <p>Sign up and discover great amount of new opportunities!</p>
                    </div>
                    <div className="img__text m--in">
                        <h2>One of us?</h2>
                        <p>If you already has an account, just sign in. We've missed you!</p>
                    </div>
                    <div className="img__btn" onClick={this.handleClick}>
                        <span className="m--up">Sign Up</span>
                        <span className="m--in">Sign In</span>
                    </div>
                </div>
                <RegisterForm ref={this.signupForm}/>
            </div>
        </div>;
    }
}



export default Gate;