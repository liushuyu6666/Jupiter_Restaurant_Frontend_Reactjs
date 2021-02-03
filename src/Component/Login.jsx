import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Dropdown, FormGroup} from "./Widgets";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {username : "", password : "", role : "customer"},
            errors: {value: "", color: "red"},
            errorsFromServer: {value: "", color: ""},
            buttonEnabled: false,
        }
        this.roles = ["customer", "owner", "admin"]
    }

    // change values of input except role value
    change = (event) => {
        event.preventDefault();

        this.setState({
            formValue:{
                ...this.state.formValue,
                [event.target.id] : event.target.value,
            },
            errorsFromServer: {value: "", color: ""},
        }, () => this.check())
    }

    // change values of role value, listen which role is selected
    selectedItemFromDropdown = (event) =>{
        event.preventDefault();
        this.setState({
            formValue: {
                ...this.state.formValue,
                role: event.target.id,
            },
            errorsFromServer: {value: "", color: ""},
        }, () => this.check());
    }

    check = () => {
        if(this.state.formValue.username.trim() === ""
        || this.state.formValue.password.trim() === ""
        || this.state.errorsFromServer.color.trim() !== ""){
            this.setState({
                buttonEnabled: false
            })
        }
        else{
            this.setState({
                buttonEnabled: true
            })
        }
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
            <form className={"d-flex justify-content-around"}>
                <div>

                </div>
                <div className={"d-flex flex-column"}>
                    <h4 className={"d-flex"}
                        style={{color:"#00635a"}}><strong>login</strong>
                    </h4>
                    <FormGroup
                        id={"username"}
                        inputValue={this.state.formValue["username"]}
                        show={"username"}
                        type={"text"}
                        change={this.change}
                    />
                    <FormGroup
                        id={"password"}
                        inputValue={this.state.formValue["password"]}
                        show={"password"}
                        type={"password"}
                        change={this.change}
                    />
                    <Dropdown
                        id={"role"}
                        show={"role"}
                        dropdownItems={this.roles}
                        selectedItemFromDropdown={this.selectedItemFromDropdown}
                    />
                    <p className={"text-center"} style={{color:this.state.errorsFromServer.color}}>
                        {this.state.errorsFromServer.value}
                    </p>
                    <div className={"form-group"}>
                        <button type="button"
                                className={"btn btn-primary btn-sm active"}
                                disabled={!this.state.buttonEnabled}
                                onClick={this.submit}>login</button>
                    </div>
                </div>
                <div>

                </div>
            </form>
        )
    }
}



export default withRouter(Login);