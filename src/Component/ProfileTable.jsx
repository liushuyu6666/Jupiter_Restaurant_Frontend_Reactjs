import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class ProfileTable extends Component{

    logout = () => {
        localStorage.clear();
        this.props.changeLogoutStatus();
    }

    render() {
        return(
            <>
                {
                    (this.props.info)?
                    (
                        <>
                            <p>username:</p>
                            <label>{this.props.info.username}</label>
                            <p>email:</p>
                            <label>{this.props.info.email}</label>
                            <p>role:</p>
                            <label>{this.props.info.role}</label>
                            <br/>
                            <button onClick={this.logout}>logout</button>
                        </>
                    ):
                    (<label>there is no information so far!</label>)
                }
            </>
        )
    }

}

export default withRouter(ProfileTable);