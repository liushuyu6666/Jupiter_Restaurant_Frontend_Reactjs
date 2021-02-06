import React, {Component} from 'react/';
import {withRouter} from "react-router-dom";
import {FormGroup, ArrayInputTags, NoPermissionPage, ErrorFromServer} from "./Widgets.jsx";

class AddNewShop extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formValue: {name: "", country: "", city: "", street: "",
                        desc: "", img: null, category: "", owner: ""},
            categoriesList: [],
            ownersList: [],
            error: {name: {classname: "", promptText: "", promptClassname: ""},
                    img: {classname: "", promptText: "", promptClassname: ""},
                    category: {classname: "", promptText: "", promptClassname: "", addStatus: false},
                    owner: {classname: "", promptText: "", promptClassname: "", addStatus: false}},
            buttonEnable: {saveButtonEnable: false,
                     categoryAddButtonEnable: false,
                     ownerAddButtonEnable: false},
            firstAuthentication: {errorMsg: "", isValid: true, loginName: ""},
            errorsFromServer: {value: "", color: ""},
        }
    }

    // listen to all changes except image
    change = (event) => {
        // event.preventDefault();
        // clear errorsFromServer and fill in input values
        this.setState({
            formValue: {
                ...this.state.formValue,
                [event.target.id]: event.target.value},
            errorsFromServer: {value: "", color: ""},
        }, () => {
            this.check(event);
        });
    }

    // listen to image change
    imageChange = (event) => {
        const file = event.target.files[0];
        this.setState({
            formValue: {
                ...this.state.formValue,
                "img": file,
            }
        }, () => {
            this.check(event);
        })
    }

    // for shop name, the check function need to confirm the event.target.id === name;
    // but for category and owner, it shouldn't check since the add button is clicked,
    // check function will be called again and at that time, event.target is not the input;
    check = (e) => {

        e.preventDefault();

        const name = {};
        const category = {};
        const owner = {};
        const img = {};

        let change = {};
        // check shop name
        if(e.target.id === "name") {
            if (this.state.formValue.name.trim() === "") {
                name.classname = "is-invalid"
                name.promptClassname = "invalid-feedback";
                name.promptText = "shop name can't be empty";
            } else if (this.state.formValue.name.length > 50) {
                name.classname = "is-invalid";
                name.promptClassname = "invalid-feedback";
                name.promptText = "should shorter";
            } else {
                name.classname = "is-valid"
                name.promptClassname = "valid-feedback";
                name.promptText = "yes";
            }
        }
        else{
            name.classname = this.state.error.name.classname;
            name.promptClassname = this.state.error.name.promptClassname;
            name.promptText = this.state.error.name.promptText;
        }

        // check category
        if (this.state.formValue.category.trim() === "") {
            category.addStatus = false;
        } else if (this.state.formValue.category.length > 20) {
            category.classname = "is-invalid";
            category.promptClassname = "invalid-feedback";
            category.promptText = "should shorter";
            category.addStatus = false;
        } else if (this.state.formValue.category.indexOf(',') >= 0) {
            category.classname = "is-invalid"
            category.promptClassname = "invalid-feedback";
            category.promptText = "no ',' here";
            category.addStatus = false;
        } else {
            category.classname = "is-valid"
            category.promptClassname = "valid-feedback";
            category.promptText = "it works";
            category.addStatus = true;
        }

        // check owner
        if (this.state.formValue.owner.trim() === "") {
            owner.addStatus = false;
        }
        else if(this.state.formValue.owner.length > 30) {
            owner.classname = "is-invalid";
            owner.promptClassname = "invalid-feedback";
            owner.promptText = "should shorter";
            owner.addStatus = false;
        }
        else if (this.state.formValue.owner.indexOf(',') >= 0) {
            owner.classname = "is-invalid";
            owner.promptClassname = "invalid-feedback";
            owner.promptText = "no ',' here";
            owner.addStatus = false;
        }
        else {
            owner.classname = "is-valid"
            owner.promptClassname = "valid-feedback";
            owner.promptText = "it works";
            owner.addStatus = true;
        }

        // check img
        if(this.state.formValue.img !== null){
            const uploadType = this.state.formValue.img.type;
            if(uploadType.substr(0, uploadType.indexOf('/')) !== "image"){
                img.classname = "is-invalid";
                img.promptClassname = "invalid-feedback";
                img.promptText = "must be image";
            }
        }

        change = {name: name, category: category, owner: owner, img: img};

        // update the state
        this.setState({
            error: change,
        }, () => this.buttonChange())

    }

    buttonChange = () => {
        // console.log(this.state.error.category)
        let saveButtonEnable = (this.state.error.name.classname === "is-valid"
                                && this.state.error.img.classname !== "is-invalid");
        let categoryAddButtonEnable = this.state.error.category.addStatus;
        let ownerAddButtonEnable = this.state.error.owner.addStatus;
        let buttonEnable = {"saveButtonEnable": saveButtonEnable,
                             "categoryAddButtonEnable": categoryAddButtonEnable,
                             "ownerAddButtonEnable": ownerAddButtonEnable}

        this.setState({
            buttonEnable: buttonEnable,
        })
    }

    arrayAdd = (event) => {
        event.preventDefault();
        const widgetId = event.target.id; //categoriesList or ownersList
        const elementVal = this.state.formValue[event.target.name]; // should be element value of category or owner in the formValue
        const list = this.state[widgetId].concat([elementVal]);
        this.setState({
            [widgetId]: list
        });
        this.setState({
            formValue:{
                ...this.state.formValue,
                [event.target.name]: "",
            }
        }, () => this.check(event))
    }

    arrayRemove = (event) => {
        event.preventDefault();
        const widgetId = event.target.name;
        const index = this.state[widgetId].indexOf(event.target.value);
        this.setState({
            [widgetId]: this.state[widgetId].filter((_, i) => i !== index)
        }, () => this.check(event))
    }

    submit = (event) => {
        event.preventDefault();
        this.setState({
            errorsFromServer: {value: "please wait...", color: "green"}
        },() => {
            // verify token and get profile
            const formData = new FormData();
            formData.append("file", this.state.formValue.img);
            formData.append("name", this.state.formValue.name);
            fetch("/v1/files",{
                "method": "POST",
                "body": formData,
                "redirect": "follow",
            })
                .then(res => res.json())
                .then(data => {
                    if(data.result === null){
                        this.setState({
                            errorsFromServer: {value: data.msg, color: "red"},
                            buttonEnable: {...this.state.buttonEnable, saveButtonEnable: false}
                        })
                    }
                    // if upload image properly, upload the entire form
                    else{
                        const ownersListFinal = Array.from(new Set(
                            [...this.state.ownersList,
                            this.state.firstAuthentication.loginName]))
                        const form = {
                            "name": this.state.formValue.name,
                            "desc": this.state.formValue.desc,
                            "imgUrl": data.result,
                            "categories": this.state.categoriesList,
                            "owners" :ownersListFinal,
                            "address": {"country": this.state.formValue.country,
                                "city": this.state.formValue.city,
                                "street": this.state.formValue.street},
                        }
                        fetch("/v1/shops",{
                            "method": "POST",
                            "headers": {
                                "Content-Type": "application/json",
                                "token": localStorage.getItem("token"),
                            },
                            "body": JSON.stringify({
                                "name": this.state.formValue.name,
                                "desc": this.state.formValue.desc,
                                "imgUrl": data.result,
                                "categories": this.state.categoriesList,
                                "owners" :ownersListFinal,
                                "address": {"country": this.state.formValue.country,
                                    "city": this.state.formValue.city,
                                    "street": this.state.formValue.street},
                                })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.result === null){
                                this.setState({
                                    errorsFromServer: {value: data.msg, color: "red"},
                                    buttonEnable: {...this.state.buttonEnable, saveButtonEnable: false}
                                })
                            }
                            else{
                                this.setState({
                                    errorsFromServer: {value: data.msg, color: "green"},
                                    buttonEnable: {...this.state.buttonEnable, saveButtonEnable: false}
                                })
                            }
                        })
                        .catch(e => {
                            this.setState({
                                errorsFromServer: {value: e.msg, color: "red"},
                                buttonEnable: {...this.state.buttonEnable, saveButtonEnable: false}
                            })
                        })
                    }
                })
        })
    }

    render() {
        return(
                !this.state.firstAuthentication.isValid?
                    (<NoPermissionPage message={this.state.firstAuthentication.errorMsg}/>):
                (<form className={"d-flex flex-column"}>
                    <h4 className={"d-flex justify-content-center"}
                        style={{color: "#00635a"}}><strong>add the shop information</strong></h4>
                    <div className={"d-flex justify-content-around"}>
                        <div>

                        </div>
                        <div className={"d-flex flex-column"}>
                            <FormGroup
                                id={"name"}
                                inputValue={this.state.formValue["name"]}
                                show={"shop name"}
                                type={"text"}
                                className={this.state.error.name.classname}
                                promptClassname={this.state.error.name.promptClassname}
                                promptText={this.state.error.name.promptText}
                                change={this.change}
                            />
                            <FormGroup
                                id={"country"}
                                inputValue={this.state.formValue["country"]}
                                show={"country"}
                                type={"text"}
                                className={"form-control"}
                                change={this.change}
                            />
                            <FormGroup
                                id={"city"}
                                inputValue={this.state.formValue["city"]}
                                show={"city"}
                                type={"text"}
                                className={"form-control"}
                                change={this.change}
                            />
                            <FormGroup
                                id={"street"}
                                inputValue={this.state.formValue["street"]}
                                show={"street"}
                                type={"text"}
                                className={"form-control"}
                                change={this.change}
                            />
                        </div>
                        <div className={"d-flex flex-column"}>
                            <FormGroup
                                id={"desc"}
                                show={"description"}
                                type={"text"}
                                change={this.change}
                            />
                            <FormGroup
                                id={"imgUrl"}
                                // inputValue={this.state.formValue["imgUrl"]}
                                show={"upload image"}
                                type={"file"}
                                className={this.state.error.img.classname}
                                promptClassname={this.state.error.img.promptClassname}
                                promptText={this.state.error.img.promptText}
                                change={this.imageChange}
                            />
                            <ArrayInputTags show={"categories"}
                                            id={"category"} // should be the same as the key in the formValue of state
                                            arrayKey={"categoriesList"}
                                            arrayValues={this.state.categoriesList}
                                            inputValue={this.state.formValue["category"]}
                                            buttonEnable={this.state.buttonEnable.categoryAddButtonEnable}
                                            promptClassname={this.state.error.category.promptClassname}
                                            promptText={this.state.error.category.promptText}
                                            changeFunc={this.change}
                                            addFunc={this.arrayAdd}
                                            removeFunc={this.arrayRemove}
                            />
                            <ArrayInputTags show={"other owners"}
                                            id={"owner"} // should be the same as the key in the formValue of state
                                            arrayKey={"ownersList"}
                                            arrayValues={this.state.ownersList}
                                            inputValue={this.state.formValue["owner"]}
                                            buttonEnable={this.state.buttonEnable.ownerAddButtonEnable}
                                            promptClassname={this.state.error.owner.promptClassname}
                                            promptText={this.state.error.owner.promptText}
                                            changeFunc={this.change}
                                            addFunc={this.arrayAdd}
                                            removeFunc={this.arrayRemove}
                            />
                            {/*<FormGroup id={"owner"} show={"other owners"} type={"text"} className={"form-control"} style={{color:"#00635a"}} change={this.change}/>*/}
                        </div>
                        <div>

                        </div>
                    </div>
                    <ErrorFromServer
                        value={this.state.errorsFromServer.value}
                        color={this.state.errorsFromServer.color}
                    />
                    <div className={"d-flex justify-content-center"}>
                        <button className={"btn btn-primary btn-sm active"}
                                disabled={!this.state.buttonEnable.saveButtonEnable}
                                onClick={this.submit}>
                            save
                        </button>
                    </div>
                </form>
            )
        )
    }

    componentDidMount() {
        // need to check user's role first
        fetch("/v1/profile",{
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        })
            .then(res => res.json())
            .then(data => {
                if(data.result === null){
                    this.setState({
                        firstAuthentication: {isValid: false, errorMsg: data.msg}
                    })
                }
                else if(data.result.role !== "owner"){
                    this.setState({
                        firstAuthentication: {isValid: false, errorMsg: "only owner can access"}
                    })
                }
                else{
                    // console.log(data.result);
                    this.setState({
                        firstAuthentication: {isValid: true,
                            errorMsg: "",
                            loginName: data.result.username}
                    })
                }
            })
    }
}

export default withRouter(AddNewShop);