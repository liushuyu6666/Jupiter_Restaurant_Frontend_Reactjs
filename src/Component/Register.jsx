import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FormGroup, Dropdown} from "./Widgets";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {username: "", email: "", password: "", confirm: "", role: "customer"},
            errors: {username: {classname: "", text: "", promptClassname: ""},
                    email: {classname: "is-valid", text: "", promptClassname: ""},
                    password: {classname: "", text: "", promptClassname: ""},
                    confirm: {classname: "", text: "", promptClassname: ""}},
            buttonEnabled: false,
            errorsFromServer: {value: "", color: ""},

        }
        this.roles = ["customer", "owner", "admin"];
        this.allUsername = [];
    }

    // change values of input except role value
    change = (event) => {
        event.preventDefault();

        // clear errorsFromServer and fill in input values
        this.setState({
            formValue: {
                ...this.state.formValue,
                [event.target.id]: event.target.value},
            errorsFromServer: {value: "", color: ""},
        }, () => {this.check(event)});
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
        }, () => {this.check(event)});
    }

    check = (e) => {

        e.preventDefault();

        const username = {};
        const email = {};
        const password = {};
        const confirm = {};

        let change = {};
        let confirmInPassword = false;

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
                username.text = "";
            }
            change = username;
        }

        // check email
        if(e.target.id === "email") {
            if (this.state.formValue.email.trim() === "") {
                email.classname = "is-valid"
                email.promptClassname = "valid-feedback";
                email.text = "no email address? that's ok";
            } else if (this.state.formValue.email.indexOf('@') < 0) {
                email.classname = "is-invalid"
                email.promptClassname = "invalid-feedback";
                email.text = "seems like an invalid email address";
            } else {
                email.classname = "is-valid"
                email.promptClassname = "valid-feedback";
                email.text = "perfect! go on";
            }
            change = email;
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
            change = password;
            if(this.state.errors.confirm.classname !== ""
            && this.state.formValue.confirm !== this.state.formValue.password){
                confirmInPassword = true;
                confirm.classname = "is-invalid";
                confirm.promptClassname = "invalid-feedback";
                confirm.text = "password doesn't match";
            }
            else if(this.state.errors.confirm.classname !== ""
            && this.state.formValue.confirm === this.state.formValue.password){
                confirmInPassword = true;
                confirm.classname = "is-valid";
                confirm.promptClassname = "valid-feedback";
                confirm.text = "the same";
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
            change = confirm;
        }

        // update the state and button
        if(!confirmInPassword){
            this.setState({
                errors:{
                    ...this.state.errors,
                    [e.target.id]: change,
                }
            }, () => this.buttonChange())
        } else {
            this.setState({
                errors:{
                    ...this.state.errors,
                    password: change,
                    confirm: confirm,
                }
            }, () => this.buttonChange())
        }

    }

    // when input values change, button will be changed correspondingly
    buttonChange = () => {
        let buttonEnabled = (this.state.errors.username.classname === "is-valid")
        && (this.state.errors.password.classname === "is-valid")
        && (this.state.errors.confirm.classname === "is-valid")
        && (this.state.errors.email.classname === "is-valid")
        && (this.state.errorsFromServer.value.trim() === "");

        this.setState({
            buttonEnabled: buttonEnabled,
        })
    }

    submit = (event) => {
        event.preventDefault();

        fetch("/v1/register",{
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": this.state.formValue.username,
                "password": this.state.formValue.password,
                "email": this.state.formValue.email,
                "role": this.state.formValue.role,
            })
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    errorsFromServer: {
                        value: res.msg,
                        color: (res.err === null)?"green":"red",
                    },
                }, () => {
                    this.buttonChange();
                });
            })
        // check button status again
    }

    test = () => {
        console.log(this.state);
    }

    render(){
        return(
            <form className={"d-flex justify-content-around"}>
                <div>

                </div>
                <div className={"d-flex flex-column"}>
                    <h4 className={"d-flex"}
                        style={{color:"#00635a"}}><strong>register</strong>
                    </h4>
                    <FormGroup
                        id={"username"}
                        inputValue={this.state.formValue["username"]}
                        show={"username"}
                        type={"text"}
                        className={this.state.errors.username.classname}
                        promptClassname={this.state.errors.username.promptClassname}
                        promptText={this.state.errors.username.text}
                        change={this.change}
                    />
                    <FormGroup
                        id={"email"}
                        inputValue={this.state.formValue["email"]}
                        show={"email"}
                        type={"text"}
                        className={this.state.errors.email.classname}
                        promptClassname={this.state.errors.email.promptClassname}
                        promptText={this.state.errors.email.text}
                        change={this.change}
                    />
                    <FormGroup
                        id={"password"}
                        inputValue={this.state.formValue["password"]}
                        show={"password"}
                        type={"password"}
                        className={this.state.errors.password.classname}
                        promptClassname={this.state.errors.password.promptClassname}
                        promptText={this.state.errors.password.text}
                        change={this.change}
                    />
                    <FormGroup
                        id={"confirm"}
                        inputValue={this.state.formValue["confirm"]}
                        show={"confirm password"}
                        type={"password"}
                        className={this.state.errors.confirm.classname}
                        promptClassname={this.state.errors.confirm.promptClassname}
                        promptText={this.state.errors.confirm.text}
                        change={this.change}
                    />
                    <Dropdown
                        id={"role"}
                        show={"role"}
                        dropdownItems={this.roles}
                        selectedItemFromDropdown={this.selectedItemFromDropdown}/>
                    <p className={"text-center"} style={{color:this.state.errorsFromServer.color}}>
                        {this.state.errorsFromServer.value}
                    </p>
                    <div className={"form-group"}>
                        <button type="button"
                                className={"btn btn-primary btn-sm active"}
                                disabled={!this.state.buttonEnabled}
                                onClick={this.submit}>register</button>
                    </div>
                </div>
                <div >
                </div>
            </form>
        );
    }

    componentDidMount() {
        // fetch("/v1/register",{
        //     "method": "POST",
        //     "headers": {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         "username": this.state.formValue.username,
        //         "password": this.state.formValue.password,
        //         "email": this.state.formValue.email,
        //     })
        // })
    }

}

export default withRouter(Register);