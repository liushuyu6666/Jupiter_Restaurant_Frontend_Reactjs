import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class LoginAndRegister extends Component{

    constructor(props) {
        super(props);
    }

    login = (event) => {
        event.preventDefault();

        this.props.history.push("/login");

    }

    render(){
        return(
            <>
                <button onClick={this.login}>login</button>
                <br/>
                <p>don't have account?register here</p>
            </>
        )
    }
}

export default withRouter(LoginAndRegister);
