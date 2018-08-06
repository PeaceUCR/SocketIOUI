/**
 * Created by hea on 6/7/18.
 */


/**
 * Created by hea on 3/30/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser, logOut ,sendRequest}from '../actions/index';
import {constant} from '../constants';
import axios from 'axios';


class UserDetails extends Component {
    constructor(props){
        super(props);
        this.state ={loading: true};
        this.conditionalRender = this.conditionalRender.bind(this);
        this.conditionalRenderHistory = this.conditionalRenderHistory.bind(this);
        this.handleClick = this.handleClick.bind(this);
       // console.log(this.props.id);
        //console.log(this.props.match.params.id);
        let uid =null;
        if(this.props.uid){
            uid = this.props.uid;
        }

        if(this.props.match&&this.props.match.params&&this.props.match.params.id){
            uid = this.props.match.params.id;
        }
        console.log(uid);
        let that = this;
        axios.post(constant.server+'/user',{id:  uid}, {
            headers: { "X-Requested-With": "XMLHttpRequest"}
        }).then(function (data) {
            console.log(data);
            if(data.data.user){
                that.setState({ loading: false,user: data.data.user});

                axios.post(constant.server+'/message',{id:  uid}, {
                    headers: { "X-Requested-With": "XMLHttpRequest"}
                }).then(function (data) {
                    that.setState({ msgs: data.data.msgs });
                    console.log(data.data.msgs);
                })
            }else{
                that.setState({ loading: false});
            }
        });
    }


    handleClick(){
        //if(this.state.user&&this.props.user)
        console.log('click');

        if(this.state.user){
            let params = {sender:this.props.user, target: this.state.user};
            this.props.sendRequest(params);
        }
    }


    conditionalRender(){
        if(this.state.user){
            return <div className="userDetails">
                <img src={this.state.user.userImage}/>
                <p className="name">{this.state.user.username}</p>
                <p className="email">{this.state.user.email}</p>
                <p className="date">Date Created: {new Date(this.state.user.timeCreated).toLocaleDateString()}</p>
                <p className={this.state.user.isOnline? "online": "offline"}><i className="fas fa-circle"></i>{this.state.user.isOnline?"Online":"Offline"}</p>
                <button onClick={this.handleClick}>Add Friend</button>
            </div>;
        }else {
            return <p>Invalid User</p>
        }
    }

    conditionalRenderHistory(){
        if(this.state.msgs&&this.state.msgs.length>0){
            return this.state.msgs.map(function (item, index ,items) {
                return <div key={"historymsg"+index} className="historymsg">
                    <div><p className="room">room:{item.room}</p>
                        <p className="date">date:{new Date(item.date).toLocaleDateString()}</p></div>
                    <p className="content">content:{item.content}</p>

                </div>
            })

        }else{
            return <h2>No History Messages</h2>
        }

    }
    render() {
        return <div className="profile">
            {this.conditionalRender()}

            <div className="history">
                <h2>History Messages</h2>
                {this.conditionalRenderHistory()}
            </div>
        </div>

    }
}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({setUser: setUser, logOut: logOut,sendRequest: sendRequest }, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user, error: state.error};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);