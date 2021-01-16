import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {username: "", password: "", confirm: "", role: "customer"},
            errors: {username: {classname: "", text: "", promptClassname: ""},
                    password: {classname: "", text: "", promptClassname: ""},
                    confirm: {classname: "", text: "", promptClassname: ""}},
            buttonEnabled: false,

        }
    }

    change = (event) => {
        event.preventDefault();
        this.setState({
            formValue: {
                ...this.state.formValue,
                [event.target.id]: event.target.value}
        }, () => {this.check(event);
                          console.log(this.state)});
    }

    radio = (event) =>{
        this.setState({
            formValue:{
                ...this.state.formValue,
                role: event.target.id
            }
        }, () => console.log(this.state))
    }

    check = (e) => {

        e.preventDefault();

        const username = {};
        const password = {};
        const confirm = {};

        // check username, need to check username.trim() first
        // // when check if username is empty, use trim().
        if(e.target.id === "username") {
            if (this.state.formValue.username.trim() === "") {
                username.classname = "is-invalid"
                username.promptClassname = "invalid-feedback";
                username.text = "username can't be empty";
            } else if (this.state.formValue.username.length > 30) {
                username.classname = "is-invalid";
                username.promptClassname = "invalid-feedback";
                username.text = "username can't be larger than 30 characters";
            } else if (this.state.formValue.username.indexOf(' ') >= 0) {
                username.classname = "is-invalid"
                username.promptClassname = "invalid-feedback";
                username.text = "username can't contain white space";
            } else {
                username.classname = "is-valid"
                username.promptClassname = "valid-feedback";
                username.text = "perfect! a sweet name";
            }
            this.setState({
                errors:{
                    ...this.state.errors,
                    username: username,
                }
            })
        }

        // check password
        else if(e.target.id === "password") {
            if (this.state.formValue.password.trim() === "") {
                password.classname = "is-invalid"
                password.promptClassname = "invalid-feedback";
                password.text = "password can't be empty";
            } else if (this.state.formValue.password.length > 30) {
                password.classname = "is-invalid"
                password.promptClassname = "invalid-feedback";
                password.text = "password can't be larger than 30 characters";
            } else if (this.state.formValue.password.indexOf(' ') >= 0) {
                password.classname = "is-invalid"
                password.promptClassname = "invalid-feedback";
                password.text = "password can't contain white space";
            } else {
                password.classname = "is-valid"
                password.promptClassname = "valid-feedback";
                password.text = "it works";
            }
            this.setState({
                errors:{
                    ...this.state.errors,
                    password: password,
                }
            })
            // check confirm again in password
            if(this.state.errors.confirm.classname !== ""
            && this.state.formValue.confirm !== this.state.formValue.password){
                confirm.classname = "is-invalid";
                confirm.promptClassname = "invalid-feedback";
                confirm.text = "password doesn't match";
                this.setState({
                    errors:{
                        ...this.state.errors,
                        confirm: confirm,
                        password: password,
                    }
                })
            }
            else if(this.state.errors.confirm.classname !== ""
            && this.state.formValue.confirm === this.state.formValue.password){
                confirm.classname = "is-valid";
                confirm.promptClassname = "valid-feedback";
                confirm.text = "the same";
                this.setState({
                    errors:{
                        ...this.state.errors,
                        confirm: confirm,
                        password: password,
                    }
                })
            }
        }

        // check confirm
        else if(e.target.id === "confirm"){
            if (this.state.formValue.confirm.trim() === "") {
                confirm.classname = "is-invalid"
                confirm.promptClassname = "invalid-feedback";
                confirm.text = "password can't be empty";
            } else if (this.state.formValue.confirm.length > 30){
                confirm.classname = "is-invalid";
                confirm.promptClassname = "invalid-feedback";
                confirm.text = "password can't be larger than 30 characters";
            } else if (this.state.formValue.confirm !== this.state.formValue.password) {
                confirm.classname = "is-invalid";
                confirm.promptClassname = "invalid-feedback";
                confirm.text = "password doesn't match";
            } else {
                confirm.classname = "is-valid"
                confirm.promptClassname = "valid-feedback";
                confirm.text = "the same";
            }
            this.setState({
                errors:{
                    ...this.state.errors,
                    confirm: confirm,
                }
            });
        }

        // check button
        const buttonEnabled = (username.classname === "is-valid"
                || this.state.errors.username.classname === "is-valid")
            && (password.classname === "is-valid"
                || this.state.errors.password.classname === "is-valid")
            && (confirm.classname === "is-valid"
                || this.state.errors.confirm.classname === "is-valid");
        this.setState({
            buttonEnabled: buttonEnabled,
        });

    }

    test = () => {
        console.log(this.state);
    }

    render(){
        return(
            <form>
                <h4>please login</h4>
                <div className={"form-group"}>
                    <label htmlFor={"username"}>username:</label>
                    <input
                        className={`form-control ${this.state.errors.username.classname}`}
                        type={"text"}
                        id={"username"}
                        name={"username"} // to pair label
                        onChange={this.change}
                    />
                    <div className={this.state.errors.username.promptClassname}>
                        {this.state.errors.username.text}
                    </div>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"password"}>password:</label>
                    <input
                        className={`form-control ${this.state.errors.password.classname}`}
                        type={"password"}
                        id={"password"}
                        name={"password"} // to pair label
                        onChange={this.change}
                    />
                    <div className={this.state.errors.password.promptClassname}>
                        {this.state.errors.password.text}
                    </div>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"confirm"}>confirm password:</label>
                    <input
                        className={`form-control ${this.state.errors.confirm.classname}`}
                        type={"password"}
                        id={"confirm"}
                        name={"confirm"} // to pair label
                        onChange={this.change}
                    />
                    <div className={this.state.errors.confirm.promptClassname}>
                        {this.state.errors.confirm.text}
                    </div>
                </div>
                <div className={"form-group"} onChange={this.radio}>
                    <label>register as:</label>
                    <br/>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customer" name="role"
                                   className="custom-control-input" defaultChecked/>
                        <label className="custom-control-label" htmlFor="customer">a customer</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="owner" name="role"
                               className="custom-control-input"/>
                        <label className="custom-control-label" htmlFor="owner">a shop owner</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="admin" name="role"
                               className="custom-control-input"/>
                        <label className="custom-control-label" htmlFor="admin">an admin</label>
                    </div>
                </div>
                <div className={"form-group"}>
                    <button type="button" className="btn btn-primary"  disabled={!this.state.buttonEnabled}>register</button>
                </div>
            </form>
        );
    }


}

export default withRouter(Login);