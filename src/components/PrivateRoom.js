 /**
 * Created by hea on 6/4/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser,getUser, logOut, joinChat, sendChatMessage,  disconnectChatSocket, redirect}from '../actions/index';
import {constant} from '../constants';
import UserDetails from './UserDetails';
import NewsBlock from  './NewsBlock';


class PrivateRoom extends Component {

    constructor(props){
        super(props);
        this.input = React.createRef();
        this.config = this.config.bind(this);
        this.handleSend =this.handleSend.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.renderRoomuser = this.renderRoomuser.bind(this);
        this.renderUserDetails = this.renderUserDetails.bind(this);
        this.renderEmojis =this.renderEmojis.bind(this);
        this.openEmojis =  this.openEmojis.bind(this);
        this.openChat = this.openChat.bind(this);

        //it's hard to put the socket to somewhere else not in this file, then the config() of socket will not be executed?
        //this.chatSocket =io('/chat', { path: '/socket.io', transports: ['websocket'], upgrade: false});
        //this.chatSocket =io('http://localhost:5000/chat', { path: '/socket.io', transports: ['websocket'], upgrade: false});

        this.state = {room: this.props.room, openEmoji: false ,loading: this.props.user?false:true, openChat:false};

        let that = this;

        //for session get user, the config should be excute after user has been set
        //we need to set a state in the component to indicate the user loading is finish
        //to render when loading finish, otherwise  'can't read property of null'
        if(this.props.user) {
            this.config();
        }else {
            this.props.getUser().then(function () {
                // if can't get user, should do nothing waiting redirect to /gate
                if(that.props.user){
                    that.config();
                    that.setState({loading:false});
                }
            });
        }


    }

    config(){
        //this.props.connectSocket();
        let that = this;

        //socket = io(constant.server);
        /*some part just socket configuration ,can't be treated as traditional actions*/
        /*
         constant.chatSocket.on('connect',function () {
         console.log('connect to the char server');

         let params = {room: that.state.room, sender:that.props.user};
         //Add room params
         constant.chatSocket.emit('join', params, function (error) {
         console.log('User has join room: '+params.room) ;
         });

         constant.chatSocket.emit('fetchRoomUserList', params, function (error) {
         console.log('fetch room list error:'+error);
         });

         });
         */

        /*always connect before reach room so no need to put in connect*/
        let params = {room: that.state.room, sender:that.props.user};
        console.log('config');
        console.log(params);


        this.props.joinChat(params);
        /*
        //Add room params
        this.chatSocket.emit('join', params, function (error) {
            console.log('Join room err '+params.room) ;
        });

        this.chatSocket.emit('fetchRoomUserList', params, function (error) {
            console.log('fetch room list error:'+error);
        });

        /*

        this.chatSocket.on('getRoomUserList',function (data) {
            console.log('roomlist'+data);
            that.props.setRoomUser(data);
        });

        this.chatSocket.on('newMessage',function (data) {
            console.log('newMessage room:'+data.room);
            console.log('newMessage:'+data.text);
            //console.log('newMessage:'+data.sender);
            that.props.addMessage(data);
        });

        this.chatSocket.on('addRoomUser',function (data) {
            // console.log(data);
            let users = that.props.roomuser.slice(0);
            users.push(data.user);
            that.props.setRoomUser(users);
        });

        this.chatSocket.on('removeRoomUser',function (data) {
            // console.log(data);

            let users = [];
            for(let i=0; i<that.props.roomuser.length; i++){
                if(that.props.roomuser[i].id !==data.user.id){
                    users.push(that.props.roomuser[i]);
                }
            }

            that.props.setRoomUser(users);
        });
        */
    }

    handleSend(){
        //console.log(this.props.user.username);
        // console.log(socket.emit);
        console.log('send click');
        let data = this.input.current.value;
        if(data.length>0){
            let params = {text: data, room: this.state.room, sender: this.props.user?this.props.user:null};
            this.props.sendChatMessage(params);
            this.input.current.value = '';
        }
    }


    onKeyPress(event){
        if(event.key ==='Enter'){
            this.handleSend();
        }
    }

    renderMessage(){
        //console.log(this.props.message);
        if(this.props.message){
            return this.props.message.map(function (item, index, items) {
                return <div className={this.props.user.id ===item.sender.id?'self msg': 'msg'} key={'msg'+index}>{item.sender?<div><a href={'/user/'+item.sender.id} className='avatar'><img src={item.sender.userImage}></img><span>{item.sender.username}</span></a></div>:<div><div className='avatar'><img src='/default.png'></img><span>unknown</span></div></div>}<div className="text"><span>{item.text}</span></div></div>
            }, this);
        }
    }

    renderRoomuser(){
        //console.log(this.props.message);
        if(this.props.roomuser){
            let that = this;
            return this.props.roomuser.map(function (item, index, items) {

                return <a onClick={function () {
                    that.props.redirect('/user/'+item.id);
                }} key={"user"+index} className='avatar'><img src={item.userImage}></img><span>{item.username}</span></a>
            }, this);
        }
    }

    renderUserDetails(){
        if(this.props.user){
            return <UserDetails uid = {this.props.user.id} />
        }
    }

    renderEmojis(){
        let that = this;
        return constant.emojiList.map(function (item, index, items) {
            return <span key={"emoji"+index} className="emoji" onClick={function() {
                that.input.current.value = that.input.current.value+item;
            }} >{item}</span>
        });
    }

    openEmojis(){
        this.setState({openEmoji: !this.state.openEmoji});
    }

    openChat(){
        this.setState({
            openChat: !this.state.openChat
        });
    }
    componentWillMount(){

    }

    render(){
        console.log(this.state);
        if(this.state.loading){
            return <div>Loading</div>;
        }else{
            return <div className="chatRoom">
                {this.renderUserDetails()}
                <div className={this.state.openChat?"main open":"main"}>
                    <i className="fas fa-times-circle" id="closeDialog" onClick={this.openChat}></i>
                    <p className="title">Current Room:{this.state?this.state.room: 'unknown'}</p>
                    <p className="title">Online Members:</p>
                    <div className="userList">
                        {this.renderRoomuser()}
                    </div>
                    <div className="msgs">
                        {this.renderMessage()}
                    </div>
                    <div className="send">
                        <input ref={this.input} type="text" placeholder="add message..." onKeyPress={this.onKeyPress}/><span onClick={this.openEmojis} className="emojiInput">😀</span><button onClick={this.handleSend}>Send</button>
                    </div>
                    <div className={this.state?(this.state.openEmoji?"emojiDiv open": "emojiDiv"):"emojiDiv"}>
                        {this.renderEmojis()}
                        <div className="pointer"></div>
                    </div>
                </div>
                <NewsBlock />
                <i className="fas fa-comments" id="chatIcon" onClick={this.openChat}></i>
            </div>;
        }
    }

    //scroll to bottom in chatting
    componentDidUpdate(){
        let dialog =document.querySelector('.msgs');
        if(dialog){
            dialog.scrollTop = dialog.scrollHeight;
        }
    }



    componentWillUnmount(){
        this.props.disconnectChatSocket();
    }

}


//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({setUser: setUser, getUser: getUser, logOut: logOut,joinChat: joinChat,sendChatMessage:sendChatMessage, disconnectChatSocket: disconnectChatSocket, redirect: redirect}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user, message: state.message[window.location.pathname.substring(6)], roomuser: state.roomuser};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoom);