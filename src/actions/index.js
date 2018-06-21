/**
 * Created by hea on 4/1/18.
 */

import axios from 'axios';
import {push} from 'react-router-redux';
import {constant} from '../constants';
import store from '../store';

import io from 'socket.io-client';

let chatSocket =null;
let notificationSocket = null;



export const setUser = function (formData) {
    return function (dispatch, getState) {
        return axios.post(constant.server+'/login',formData, {
            headers: { "X-Requested-With": "XMLHttpRequest"}
        }).then(function (res) {
            console.log(res);
            if(res.data.user){
                dispatch({
                    type: "setUser",
                    payload: res.data.user
                });

                if(res.data.user.request&&res.data.user.request.length>0){

                    dispatch({
                        type: "setNotification",
                        payload: res.data.user.request
                    });

                }
            }else{
                dispatch({
                    type: "setError",
                    payload: res.data
                });
            }

        }).catch(error => {
            console.log(error);
        }).then(function () {
            //redirect after has user
            if(getState().user){

                //connect only when notification socket not connect
                if(notificationSocket&&notificationSocket.connected&&(!notificationSocket.disconnected)){

                }else{
                    joinNotification({sender: getState().user}, dispatch);
                }

                dispatch(push('/room/private'));
                //dispatch(push('/user/5b1ef15661922b2146b5b29f'));
            }
        });
    }
};

//get Current User from session
export  const getUser =  function () {
    return function (dispatch, getState) {
        return axios.get(constant.server+'/currentuser').then(function (res) {
            console.log(res);
            if(res.data.user){

                //connect only when notification socket not connect
                if(notificationSocket&&notificationSocket.connected&&(!notificationSocket.disconnected)){

                }else{
                    joinNotification({sender: res.data.user}, dispatch);
                    console.log(notificationSocket);
                }

                dispatch({
                    type: "setUser",
                    payload: res.data.user
                });

                if(res.data.user.request&&res.data.user.request.length>0){
                    dispatch({
                        type: "setNotification",
                        payload: res.data.user.request
                    });

                }
            }else{
                dispatch(push('/gate'));
            }

        });
    }
};

/*
export const addMessage =  function (message) {
    return function (dispatch) {
        //console.log(message);
        return dispatch({
            type: "addMessage",
            payload: message
        });
    }
};

export const setRoomUser =  function (list) {
    return function (dispatch) {
        //console.log(message);
        return dispatch({
            type: "setRoomUser",
            payload: list
        });
    }
};

*/
//chat socket emit actions
export const joinChat = function (params) {

    return function (dispatch, getState) {
        //why can't assign outside action?????
        //otherwise the emit will not work
        //may be first join->no user redirect(disconnect)->back to room not join now
        //chatSocket =io('http://localhost:5000/chat', { path: '/socket.io', transports: ['websocket'], upgrade: false});
        chatSocket =io('/chat', { path: '/socket.io', transports: ['websocket'], upgrade: false});

        chatSocket.emit('join', params, function (error) {
            console.log('Join room err '+params.room) ;
        });

        chatSocket.emit('fetchRoomUserList', params, function (error) {
            console.log('fetch room list error:'+error);
        });

        chatSocket.on('getRoomUserList',function (data) {
            console.log('roomlist'+data);
            //setRoomUser(data);
            dispatch({
                type: "setRoomUser",
                payload: data
            });
        });

        chatSocket.on('newMessage',function (data) {
            console.log('newMessage room:'+data.room);
            console.log('newMessage:'+data.text);
            //console.log('newMessage:'+data.sender);
            //addMessage(data);
            dispatch({
                type: "addMessage",
                payload: data
            });
        });

        chatSocket.on('addRoomUser',function (data) {
            // console.log(data);
            let users = store.getState().roomuser.slice(0);
            users.push(data.user);
            //setRoomUser(users);
            dispatch({
                type: "setRoomUser",
                payload: users
            });
        });

        chatSocket.on('removeRoomUser',function (data) {
            // console.log(data);
            let roomUsers = store.getState().roomuser;
            let users = [];
            for(let i=0; i<roomUsers.length; i++){
                if(roomUsers[i].id !==data.user.id){
                    users.push(roomUsers[i]);
                }
            }

            // setRoomUser(users);

            dispatch({
                type: "setRoomUser",
                payload: users
            });
        });

        let status = getState().socketStatus;
        status.chatSocket = 'join';
        dispatch({
            type: "updateSocketStatus",
            payload: status
        });
    };

}

export const sendChatMessage = function (params) {

    return function (dispatch, getState) {
        chatSocket.emit('createMessage',params);

        let status = getState().socketStatus;
        status.chatSocket = 'send';
        dispatch({
            type: "updateSocketStatus",
            payload: status
        });
    };
}
/*
//chat socket config
export const configChatListener = function () {
    //dispatch, getState

    return function (dispatch, getState) {

        let status = getState().socketStatus;
        status.chatSocket = 'config';
        dispatch({
            type: "updateSocketStatus",
            payload: status
        });
    };


};
*/

//join notification socket when header with user
//join when user here
export const joinNotification = function (params, dispatch) {
        //notificationSocket =io('http://localhost:5000/notification', { path: '/socket.io',transports: ['websocket'], upgrade: false});
        notificationSocket =io('/notification', { path: '/socket.io',transports: ['websocket'], upgrade: false});

        notificationSocket.once('connect', function () {
            notificationSocket.emit('join', params, function (error) {
                console.log('Join room err '+params.user);
            });
            notificationSocket.on('getRequest',function (data) {
                console.log('getRequest'+data);
                dispatch({
                    type: 'addNotification',
                    payload: data
                });
                //setRoomUser(data);
            });

            //try to reconnect
            notificationSocket.on('disconnect'), function () {
                notificationSocket.reconnect();
            }
        })
};


export const sendRequest = function (params) {
    return function (dispatch, getState) {
        if(notificationSocket&&notificationSocket.connected&&(!notificationSocket.disconnected)){
        }else {
            console.log(notificationSocket);
            console.log(' notif not connect');
            joinNotification({sender: getState().user}, dispatch);
        }
        console.log('send friend request');
        notificationSocket.emit('sendRequest',params);

        let status = getState().socketStatus;
        status.notificationSocket  = 'sendRequest';
        dispatch({
            type: "updateSocketStatus",
            payload: status
        });
    };
}

export const disconnectChatSocket = function () {
    return function (dispatch, getState) {
        if(chatSocket){
            chatSocket.disconnect();
            let status = getState().socketStatus;
            status.chatSocket = 'disconnect';
            dispatch({
                type: "updateSocketStatus",
                payload: status
            });
        }
    };
}

export const disconnectNotifSocket = function () {
    return function (dispatch, getState) {
        if(notificationSocket){
            notificationSocket.disconnect();
            let status = getState().socketStatus;
            status.notificationSocket = 'disconnect';
            dispatch({
                type: "updateSocketStatus",
                payload: status
            });
        }
    };
}
//set news
export const setNewsContent = function () {
    return function (dispatch, getState) {
        let country = getState().news.country;
        let category = getState().news.category;
        let qString;
        if(country&&category){
            qString = '?country='+constant.country[country]+'&category='+constant.category[category];
        }else{
            if(country&&!category){
                qString = '?country='+constant.country[country];
            }else if(!country&&category){
                qString = 'category='+constant.category[category];
            }else {
                qString=null;
            }

        }
        if(qString){
            return axios.get(constant.newsurl+qString+'&apiKey='+constant.newsapikey).then(
                function (data) {
                    console.log(data);
                    dispatch({
                        type: "setNewsContent",
                        payload: data.data.articles
                    });
                }
            );
        }

    }
};

export const setNewsCountry = function (country) {
    return function (dispatch) {
        return dispatch({
            type: "setNewsCountry",
            payload: country
        });
    }
};


export const setNewsCategory = function (category) {
    return function (dispatch) {
        return dispatch({
            type: "setNewsCategory",
            payload: category
        });
    }
};


export  const logOut =  function () {
    return function (dispatch) {
        return axios.get(constant.server+'/logout').then(function () {
            dispatch({
                type: "logOut",
                payload: null
            });

            dispatch(push('/'));
        });
    }
};

//handle redirect instead of using a tag href
//https://stackoverflow.com/questions/44246856/redux-loses-state-when-navigating-to-another-page
export  const redirect = function (url) {
    return function (dispatch, getState) {
        dispatch(push(url));
    };
}

