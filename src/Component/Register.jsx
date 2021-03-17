import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FormGroup, Dropdown, CheckBox, AlertText} from "./Widgets";
import {register} from "../Services/auth"

const ROLES = ["customer", "owner", "admin"];

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                username: "",
                email: "",
                password: "",
                confirm: "",
                roles: ROLES.reduce((acc,curr)=> (acc[curr]=false, acc),{}),
            },
            errors: {
                username: {isValid: false, message: ""},
                email: {isValid: true, message: ""},
                password: {isValid: false, message: ""},
                confirm: {isValid: false, message: ""},
            },
            buttonEnabled: false, // button will check all 5 isValid filed.
            errorsFromServer: {isValid: true, message: ""},
        }
    }

    // change values of input except role value
    change = (event) => {
        event.preventDefault();
        // clear errorsFromServer and fill in input values
        this.setState({
            formValue: {
                ...this.state.formValue,
                [event.target.id]: event.target.value},
        });
    }

    // change values of role value, listen which role is selected
    roleChange = (event) => {
        // console.log(event.target);
        this.setState({
            formValue: {
                ...this.state.formValue,
                roles: {
                    ...this.state.formValue.roles,
                    [event.target.value]: !this.state.formValue.roles[event.target.value]
                }
            },
            errorsFromServer: {isValid: true, message: ""},
        })
    }

    submit = () => {
        let rolesArray = [];
        let rolesObject = this.state.formValue.roles;
        Object.keys(rolesObject).map(k => {
            if(rolesObject[k]){
                rolesArray.push(k);
            }
        });
        register(
            this.state.formValue.username,
            this.state.formValue.email,
            this.state.formValue.password,
            rolesArray)
            .then(res => {
                if(res.result != null){
                    this.setState({
                        errorsFromServer: {
                            isValid: true,
                            message: res.msg}
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
                            message: res.msg}
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

    test = () => {
        console.log(this.state);
    }

    render(){
        return(
            <div className={"login-register-container"}>
                <div className={"login-register-content"}>
                    <form>
                        <h4 className={"d-flex"}
                            style={{color:"#00635a"}}><strong>register</strong>
                        </h4>
                        {
                            ["username", "email", "password", "confirm"].map(item => (
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
                        <CheckBox id={"roles"}
                                  show={"select roles"}
                                  selectValues={ROLES}
                                  change={this.roleChange}/>
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
        );
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
        if(this.state.formValue.email !== prevState.formValue.email){
            let email = {};
            if (this.state.formValue.email.trim() === "") {
                email.isValid = true;
                email.message = "no email address? that's ok";
            } else if (this.state.formValue.email.indexOf('@') < 0) {
                email.isValid = false;
                email.message = "seems like an invalid email address";
            } else {
                email.isValid = true;
                email.message = "perfect! go on";
            }
            this.setState({
                errors: {
                    ...this.state.errors,
                    email: email,
                },
            })
        }
        if(this.state.formValue.password !== prevState.formValue.password
        || this.state.formValue.confirm !== prevState.formValue.confirm){
            let password = {};
            if (this.state.formValue.password.trim() === "") {
                password.isValid = false;
                password.message = "password can't be empty";
            } else if (this.state.formValue.password.length > 30) {
                password.isValid = false;
                password.message = "password can't be larger than 30 characters";
            } else if (this.state.formValue.password.indexOf(' ') >= 0) {
                password.isValid = false;
                password.message = "password can't contain white space";
            } else {
                password.isValid = true;
                password.message = "it works";
            }
            let confirm = {isValid: false, message: ""};
            if(this.state.formValue.confirm !== this.state.formValue.password){
                confirm.isValid = false;
                confirm.message = "password doesn't match";
            }
            else{
                confirm.isValid = true;
                confirm.message = "the same";
            }
            this.setState({
                errors: {
                    ...this.state.errors,
                    password: password,
                    confirm: confirm,
                },
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
        // update the errors from server
        if(this.state.formValue !== prevState.formValue){
            this.setState({
                errorsFromServer: {isValid: true, message: ""},
            })
        }
    }

}

export default withRouter(Register);