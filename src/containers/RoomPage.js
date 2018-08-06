/**
 * Created by hea on 6/18/18.
 */
import React, {Component} from 'react';
import Header from '../components/Header';
import PrivateRoom from  '../components/PrivateRoom';


class RoomPage extends Component {
    constructor(props){
        super(props);
       // console.log(this.props.match.params.roomname);
    }
    //get route params only in top component set in the router
    render() {
        return <div>
            <Header/>
            <PrivateRoom room = {this.props.match.params.roomname}/>
        </div>;
    }
}


export default RoomPage;