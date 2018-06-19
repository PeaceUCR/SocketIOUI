/**
 * Created by hea on 6/18/18.
 */
import React, {Component} from 'react';
import Header from '../components/Header';
import UserDetails from  '../components/UserDetails';


class UserPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div>
            <Header />
            <UserDetails uid = {this.props.match.params.id?this.props.match.params.id: null}/>
        </div>;
    }
}


export default UserPage;