/**
 * Created by hea on 6/13/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setNewsCountry, setNewsCategory,setNewsContent}from '../actions/index';

class SearchSelect extends Component {
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.searchkey = React.createRef();
        this.state = {open: false, searchResults: this.props.set};
        //-1 means unset
        this.index = -1;
    }

    handleOpen(){
        this.setState({open: !this.state.open});
    }

    handleSearch(event){
        let key = event.target.value.toLowerCase();
        if(key.length>0){
            let set =[];
            for(let i=0;i<this.props.set.length;i++){
                    if(this.props.set[i].toLowerCase().indexOf(key)!==-1){
                        set.push(this.props.set[i]);
                    }
            }
            this.setState({searchResults: set});
        }else{
            this.setState({searchResults: this.props.set});
        }
        //reset
        this.index = -1;
        if(document.querySelector('.keySelect')){
            document.querySelector('.keySelect').classList.remove('keySelect');
        }
    }

    handleKeyDown(event){
        console.log(event.keyCode);
        if(this.state.open){

            if (event.keyCode === 38) {
                event.preventDefault();
                // up arrow
                if(this.index === -1){
                    this.index = 0;
                    this.refs[this.props.name+0].classList.add('keySelect');
                    this.refs[this.props.name+0].focus();
                }else{
                    this.refs[this.props.name+this.index].classList.remove('keySelect');
                    if(this.index === 0){
                    }else{
                        this.index--;
                    }
                    this.refs[this.props.name+this.index].classList.add('keySelect');
                    //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                    this.refs[this.props.name+this.index].scrollIntoView(false);
                }
            } else if (event.keyCode === 40) {
                event.preventDefault();
                // down arrow
                if(this.index === -1){
                    this.index = 0;
                    this.refs[this.props.name+0].classList.add('keySelect');
                }else{
                    this.refs[this.props.name+this.index].classList.remove('keySelect');
                    if(this.index === this.state.searchResults.length-1){
                    }else{
                        this.index++;
                    }
                    this.refs[this.props.name+this.index].classList.add('keySelect');
                    //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                    this.refs[this.props.name+this.index].scrollIntoView(false);
                }

             }else if(event.keyCode === 13){
                //enter key
                if(document.querySelector('.keySelect')){
                    this.setState({open:false});
                    if(this.props.name ==='country'){
                        this.props.setNewsCountry(document.querySelector('.keySelect').innerHTML);
                    }else{
                        this.props.setNewsCategory(document.querySelector('.keySelect').innerHTML);
                    }
                    this.props.setNewsContent();
                }


            }

        }
    }

    handleSelect(event){
        this.setState({open:false});
        if(this.props.name ==='country'){
            this.props.setNewsCountry(event.target.innerHTML);
        }else{
            this.props.setNewsCategory(event.target.innerHTML);
        }
        this.props.setNewsContent();
    }
    render(){
        return <div className ={this.state.open?"selectBox active": "selectBox"} >
            <p onClick={this.handleOpen}>{this.props.name ==='country'?(this.props.news.country?this.props.news.country:'Please select a country'):(this.props.news.category?this.props.news.category:'Please select a category')} <i className="fas fa-sort-down"></i></p>
            <div className="options">
                <div className="search"><input type="text" ref={this.searchkey} onChange={this.handleSearch} onKeyDown={this.handleKeyDown}/><i className="fas fa-search"></i></div>
                {
                    this.state.searchResults.map(function (item, index, items) {
                        return <p key={this.props.name+index} ref={this.props.name+index}  onClick={this.handleSelect}>{item}</p>;
                    }, this)
                }
            </div>
        </div>;
    }

}


//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setNewsCountry: setNewsCountry, setNewsCategory: setNewsCategory, setNewsContent:setNewsContent}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {news: state.news};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSelect);

