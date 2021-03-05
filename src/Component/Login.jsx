import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {AlertText, FormGroup} from "./Widgets";
import {login} from "../Services/auth";
import {setProfile} from "../Redux/user/actionCreator"
import {connect} from "react-redux";


class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                username : "",
                password : ""},
            errors: {
                username: {isValid: false, message: ""},
                password: {isValid: true, message: ""},
            },
            errorsFromServer: {isValid: true, message: ""},
            buttonEnabled: false,
        }
    }

    // change values of input
    change = (event) => {
        event.preventDefault();
        this.setState({
            formValue:{
                ...this.state.formValue,
                [event.target.id] : event.target.value,
            },
        })
    }

    submit = () => {
        let username = this.state.formValue.username;
        let password = this.state.formValue.password;
        login(username,password)
            .then(res => {
                if(res.result != null){
                    localStorage.setItem("Authorization", "Bearer " + res.result.jwt);
                    this.setState({
                        errorsFromServer: {
                            isValid: true,
                            message: res.msg}
                    });
                    this.props.setProfile({
                        "username": res.result.username,
                        "email": res.result.email,
                        "roles": res.result.roles,
                    });
                    setTimeout(()=>
                            this.setState({
                                errorsFromServer: {
                                    isValid: true,
                                    message: "jumping to home page..."}
                            }),
                        3000);
                    setTimeout(()=>this.props.history.push("/"),
                        5000);
                }
                else{
                    this.setState({
                        errorsFromServer: {
                            isValid: false,
                            message: "login fail"}
                    })
                }
            })
            .catch(err => {
                this.setState({
                    errorsFromServer: {
                        isValid: false,
                        message: "error from server!"}
                })
            })
    }

    render(){
        return(
            <div className={"login-register-container"}>
                <div className={"login-register-content"}>
                    <form>
                        <h4 className={"d-flex"}
                            style={{color:"#00635a"}}><strong>log in</strong>
                        </h4>
                        {
                            ["username", "password"].map(item => (
                                <FormGroup
                                    key={item}
                                    id={item}
                                    inputValue={this.state.formValue[item]}
                                    show={item}
                                    type={"text"}
                                    isValid={this.state.errors[item].isValid}
                                    errorMessage={this.state.errors[item].message}
                                    change={this.change}
                                />
                            ))
                        }
                        <AlertText isValid={this.state.errorsFromServer.isValid}
                                   message={this.state.errorsFromServer.message}/>
                        <div className={"form-group"}>
                            <button type="button"
                                    className={"btn btn-primary btn-sm active"}
                                    disabled={!this.state.buttonEnabled}
                                    onClick={this.submit}>register</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // check the input box validation
        if(this.state.formValue.username !== prevState.formValue.username){
            let username = {};
            if (this.state.formValue.username.trim() === "") {
                username.isValid = false;
                username.message = "username can't be empty";
            } else if (this.state.formValue.username.length > 50) {
                username.isValid = false;
                username.message = "username should be less than 50";
            } else if (this.state.formValue.username.indexOf(' ') >= 0) {
                username.isValid = false;
                username.message = "username can't contain white space";
            } else {
                username.isValid = true;
                username.message = "";
            }
            this.setState({
                errors: {
                    ...this.state.errors,
                    username: username,
                },
            })
        }
        // update the errors from server
        if(this.state.formValue !== prevState.formValue){
            this.setState({
                errorsFromServer: {isValid: true, message: ""},
            })
        }
        // submit button validation
        if(this.state.errors !== prevState.errors
            || this.state.errorsFromServer !== prevState.errorsFromServer){
            let buttonEnabled = true;
            for (const [key, val] of Object.entries(this.state.errors)){
                buttonEnabled = buttonEnabled && val.isValid;
            }
            this.setState({
                buttonEnabled: buttonEnabled && this.state.errorsFromServer.isValid,
            })
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        currentUser: state.profile,
    }
}

const mapDispatchToProps = {
    setProfile
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login));