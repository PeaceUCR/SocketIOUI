/**
 * Created by hea on 4/1/18.
 */

import axios from 'axios';
import {push} from 'react-router-redux';
import {constant} from '../constants';


/*
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
*/

export const uploadFile = function (formData) {

    return function (dispatch, getState) {
        dispatch(startLoading());
        return axios.post(constant.server+'/upload',formData, {
            headers: {  "Content-Type": "multipart/form-data"}
        }).then(function (res) {
            console.log(res);


            setTimeout(function () {
                dispatch(stopLoading());
            },2000);
        }).catch(error => {
            console.log(error);

            dispatch(getURL([
                "http://www.acuraofmilford.com/",
                "http://www.smithtownacura.com/",
                "http://www.continentalacura.com/",
                "http://www.acuraofrochester.com/",
                "http://www.acuraofthousandoaks.com/",
                "http://www.acuraofavon.com/",
                "http://www.mycrownacura.com/",
                "http://www.acuraofchattanooga.com/",
                "http://www.bobhowardacura.com/",
                "http://www.rosenthalacura.com/"
            ]));
            setTimeout(function () {
                dispatch(stopLoading());
            },2000);
        });
    }
}

export const getURL = function (urls) {
    return function (dispatch, getState) {
        dispatch({
            type: "getURL",
            payload: urls
        });
    }
}

//handle redirect instead of using a tag href
//https://stackoverflow.com/questions/44246856/redux-loses-state-when-navigating-to-another-page
export  const redirect = function (url) {
    return function (dispatch, getState) {
        dispatch(push(url));
    };
}

export const startLoading = function () {
    return function (dispatch) {
        dispatch({
            type: "startLoading",
            payload: true
        });
    }
}

export const stopLoading = function () {
    return function (dispatch) {
        dispatch({
            type: "stopLoading",
            payload: false
        });
    }
}

