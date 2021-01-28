import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {username : "", password : "", role : "customer"},
            errors: {value: "", color: "red"},
            errorsFromServer: {value: "", color: "red"}
        }
    }

    change = (event) => {
        event.preventDefault();

        this.setState({
            formValue:{
                ...this.state.formValue,
                [event.target.id] : event.target.value,
            }
        })
    }

    radio = (event) => {

        // clear errorsFromServer and fill in the radio values
        this.setState({
            formValue:{
                ...this.state.formValue,
                role: event.target.id
            },
        }, )
    }

    submit = (event) => {
        event.preventDefault();

        let loginRequestBody = {};
        // check the username and password
        loginRequestBody = {"username": this.state.formValue.username,
                            "password": this.state.formValue.password,
                            "role": this.state.formValue.role}

        // console.log(loginRequestBody);
        fetch("/v1/login",{
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginRequestBody)
        }).then(res => res.json())
            // .then(res => console.log(res))
            .then(res => {
                if(res.result !== null){
                    localStorage.setItem('token', res.result);
                    this.setState({
                        errorsFromServer: {
                            value: "please waiting...",
                            color: "green",
                        }
                    })
                    this.props.history.push('/')
                }
                else{
                    this.setState({
                        errorsFromServer: {
                            value: res.msg,
                            color: "red",
                        }
                    })
                }
            })
            // .catch(err => this.setState({
            //     errorsFromServer: {
            //         value: err.msg,
            //         color: "red",
            //     }
            // }))
    }

    render(){
        return(
            <form>
                <h4>login</h4>
                <div className={"form-group"}>
                    <label htmlFor={"username"}>username:</label>
                    <input
                        className={"form-control"}
                        type={"text"}
                        id={"username"}
                        name={"username"} // to pair label
                        onChange={this.change}
                    />
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"password"}>password:</label>
                    <input
                        className={"form-control"}
                        type={"password"}
                        id={"password"}
                        name={"password"} // to pair label
                        onChange={this.change}
                    />
                </div>
                <div className={"form-group"} onChange={this.radio}>
                    <label>register as:</label>
                    <br/>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customer" name="role"
                               className="custom-control-input" defaultChecked/>
                        <label className="custom-control-label" htmlFor="customer">
                            a customer
                        </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="owner" name="role"
                               className="custom-control-input"/>
                        <label className="custom-control-label" htmlFor="owner">
                            a shop owner
                        </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="admin" name="role"
                               className="custom-control-input"/>
                        <label className="custom-control-label" htmlFor="admin">
                            an admin
                        </label>
                    </div>
                </div>
                <p className={"text-center"} style={{color:this.state.errorsFromServer.color}}>
                    {this.state.errorsFromServer.value}
                </p>
                <div className={"form-group"}>
                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.submit}>login</button>
                </div>
            </form>
        )
    }
}



export default withRouter(Login);