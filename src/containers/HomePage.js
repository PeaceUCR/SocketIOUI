/**
 * Created by hea on 6/18/18.
 */
import React, {Component} from 'react';
import Uploader from '../components/Uploader'
import URLCollection from '../components/URLCollection'

class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div>
            <div className="global-header"><img src="http://api-int.connectcdk.com/api/dm-websites-vendor-mapping/v1/cdk-global.png"></img><h1>Welcome to Retail Insight</h1></div>
            <Uploader/>
            <URLCollection />
            <div className="download"><button><i className="fas fa-download"></i>Download Report</button></div>
        </div>;
    }
}


export default HomePage;
