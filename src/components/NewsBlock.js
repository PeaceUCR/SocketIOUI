/**
 * Created by hea on 6/13/18.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {constant} from '../constants';

import SearchSelect from './SearchSelect';



class NewsBlock extends Component {
    constructor(props){
        super(props);
        this.country = React.createRef();
        this.category = React.createRef();
        this.renderNewsContent = this.renderNewsContent.bind(this);
    }

    renderNewsContent(){
        if(this.props.news.content){
           return this.props.news.content.map(function (item, index ,items) {
                return <div key ={'news'+index} className="newsItem" onClick={()=>window.location.href = item.url}>
                    <p className="title">{item.title}</p>
                    <p className="description">{item.description}</p>
                    <div className="newsImg">{item.urlToImage?<img src ={item.urlToImage}/>:''}</div>
                    <p className="source">{item.source.name}</p>
                    <p className="date">{new Date(item.publishedAt).toLocaleString()}</p>
                </div>;
            })
        }
    }

    render(){
        return  <div className="newsBlock"><div className="select">
            <SearchSelect  ref={this.country} name="country" set ={Object.keys(constant.country)} />
            <SearchSelect  ref={this.category} name="category" set ={Object.keys(constant.category)}/>
            </div>
            <div className="newsContent">
                {this.renderNewsContent()}
            </div>
        </div>;
    }

}



//use this to get app state in class by props
function mapStateToProps(state) {
    return {news: state.news};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps)(NewsBlock);
