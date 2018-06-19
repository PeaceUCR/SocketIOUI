/**
 * Created by hea on 4/1/18.
 */

import axios from 'axios';
import {push} from 'react-router-redux';
import {constant} from '../constants';

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
                dispatch(push('/room/private'));
                //dispatch(push('/user/5b1ef15661922b2146b5b29f'));
            }
        });
    }
};

//get Current User from session
export  const getUser =  function () {
    return function (dispatch) {
        return axios.get(constant.server+'/currentuser').then(function (res) {
            console.log(res);
            if(res.data.user){
                dispatch({
                    type: "setUser",
                    payload: res.data.user
                });
            }else{
                dispatch(push('/gate'));
            }

        });
    }
};


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


