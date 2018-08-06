/**
 * Created by hea on 8/6/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadFile }from '../actions/index';
import {constant} from '../constants';
import axios from 'axios';


class Uploader extends Component {
    constructor(props){
        super(props);

        this.input =React.createRef();

        this.handleFileUpload = this.handleFileUpload.bind(this);
    }






    render() {
        //console.log(this.state);
        return <div >
            <div className="file-upload"><label htmlFor="fileupload" ref ={this.input}><i className="fas fa-upload"></i>Upload your CSV file here</label><input id="fileupload" ref = {this.img} type="file" onChange={this.handleFileUpload} multiple/></div>
        </div>;
    }


    //https://github.com/PeaceUCR/FileSysDemo/blob/master/public/javascripts/index.js
    //unlike in jquery
    handleFileUpload(e){
        //console.log(e.target.files[0]);
        let myFormData = new FormData();
        myFormData.append('file',e.target.files[0]);

        this.props.uploadFile(myFormData);
        /*
        let that = this;
        let promises = [];
        for(let i=0;i<e.target.files.length;i++){
            let myFormData = new FormData();
            myFormData.append('file',e.target.files[i]);
            promises.push( axios.post(constant.server+'/files/addFile',
                myFormData,{
                    headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer "+that.props.token}
                }));

             axios.post(constant.server+'/files/addFile',
             myFormData,{
             headers: { "Content-Type": "multipart/form-data"}
             }).then(function (response) {
             console.log(response);
             }, function (err) {
             console.log(err);
             });

        }

         Promise.all(promises).then(function (responses) {

         let attchement = [];
         for(let j=0; j<responses.length; j++){
         console.log(responses[j].data);
         attchement.push(responses[j].data.url);
         }
         if(that.props.dialog.data){
         let temp = JSON.parse(JSON.stringify(that.props.dialog.data));
         temp["attachmentUrls"] = attchement;
         that.props.openDialog(temp);
         }else{
         that.setState({attachments: attchement,isLoading: false});
         }
         that.fileLable.current.innerHTML = responses.length+" files added success";
         });
        */
    }



}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({uploadFile: uploadFile}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user, dialog: state.dialog, token: state.token};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(Uploader);