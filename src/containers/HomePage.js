/**
 * Created by hea on 6/18/18.
 */
import React, {Component} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div>
            <Header/>
            <div className="home">
                <div className="homeimg">
                    <img src ="/home.jpg"/>
                    <p className="chat">Type message to chat</p>
                    <i className="chatArrow fas fa-arrow-down"></i>
                    <p className="country">Select Country to get news</p>
                    <i className="countryArrow fas fa-arrow-down"></i>
                    <p className="category">Select Category to get news</p>
                    <i className="categoryArrow fas fa-arrow-down"></i>
                    <div id="go"><a href="/room/private">Get Started</a></div>
                </div>
            </div>
            <Footer/>
        </div>;
    }
}


export default HomePage;
