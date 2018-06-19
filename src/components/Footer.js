/**
 * Created by hea on 6/18/18.
 */

/**
 * Created by hea on 6/18/18.
 */
import React, {Component} from 'react';

class Footer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div className="footer">
            <h1>This is the test app developed by Ping He/Peace/Adam</h1>
            <div className="icons">
                <p><i className="fab fa-qq"></i>940814202</p>
                <p><i className="fab fa-weixin"></i>pinghe_2016</p>
                <p><i className="fas fa-envelope"></i>peace940814202@gmail.com</p>
                <p><i className="fas fa-envelope"></i>phe004@ucr.edu</p>
                <p><i className="fas fa-envelope"></i>adam.he@cdk.com</p>
            </div>
        </div>;
    }
}


export default Footer;