import React, {Component} from 'react/';
import {withRouter} from "react-router-dom";
import {FormGroup, ArrayInputTags} from "./Widgets.jsx";



class AddNewShop extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formValue: {name: "", country: "", city: "", street: "",
                        imgUrl: null, category: "", owner: ""},
            categoriesList: [],
            ownersList: [],
            error: {name: {classname: "", promptText: "", promptClassname: ""},
                    category: {classname: "", promptText: "", promptClassname: "", addStatus: false},
                    owner: {classname: "", promptText: "", promptClassname: "", addStatus: false}},
            buttonEnable: {saveButtonEnable: false,
                     categoryAddButtonEnable: false,
                     ownerAddButtonEnable: false}
        }
    }

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

    // for shop name, the check function need to confirm the event.target.id === name;
    // but for category and owner, it shouldn't check since the add button is clicked,
    // check function will be called again and at that time, event.target is not the input;
    check = (e) => {

        e.preventDefault();

        const name = {};
        const category = {};
        const owner = {};

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
            owner.classname = "is-invalid"
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

        change = {name: name, category: category, owner: owner};

        // update the state
        this.setState({
            error: change,
        }, () => this.buttonChange())

    }

    // check = (e) => {
    //
    //     e.preventDefault();
    //
    //     const name = {};
    //     const category = {};
    //     const owner = {};
    //
    //     let change = {};
    //
    //     // check shop name, need to check username.trim() first
    //     // // when check if username is empty, use trim().
    //     if(e.target.id === "name") {
    //         if (this.state.formValue.name.trim() === "") {
    //             name.classname = "is-invalid"
    //             name.promptClassname = "invalid-feedback";
    //             name.promptText = "shop name can't be empty";
    //         } else if (this.state.formValue.name.length > 15) {
    //             name.classname = "is-invalid";
    //             name.promptClassname = "invalid-feedback";
    //             name.promptText = "should shorter";
    //         } else {
    //             name.classname = "is-valid"
    //             name.promptClassname = "valid-feedback";
    //             name.promptText = "yes";
    //         }
    //         change = name;
    //     }
    //
    //     // check category
    //     if(e.target.id === "category") {
    //         if (this.state.formValue.category.trim() === "") {
    //             category.addStatus = false;
    //         } else if (this.state.formValue.category.length > 20) {
    //             category.classname = "is-invalid";
    //             category.promptClassname = "invalid-feedback";
    //             category.promptText = "should shorter";
    //             category.addStatus = false;
    //         } else if (this.state.formValue.category.indexOf(',') >= 0) {
    //             category.classname = "is-invalid"
    //             category.promptClassname = "invalid-feedback";
    //             category.promptText = "no ',' here";
    //             category.addStatus = false;
    //         } else {
    //             category.classname = "is-valid"
    //             category.promptClassname = "valid-feedback";
    //             category.promptText = "it works";
    //             category.addStatus = true;
    //         }
    //         change = category;
    //     }
    //
    //     // check owner
    //     if (this.state.formValue.owner.trim() === "") {
    //         owner.addStatus = false;
    //     } else if(e.target.id === "owner") {
    //         if (this.state.formValue.owner.length > 30) {
    //             owner.classname = "is-invalid";
    //             owner.promptClassname = "invalid-feedback";
    //             owner.promptText = "should shorter";
    //             owner.addStatus = false;
    //         } else if (this.state.formValue.owner.indexOf(',') >= 0) {
    //             owner.classname = "is-invalid"
    //             owner.promptClassname = "invalid-feedback";
    //             owner.promptText = "no ',' here";
    //             owner.addStatus = false;
    //         } else {
    //             owner.classname = "is-valid"
    //             owner.promptClassname = "valid-feedback";
    //             owner.promptText = "it works";
    //             owner.addStatus = true;
    //         }
    //         change = owner;
    //     }
    //
    //     // update the state
    //     this.setState({
    //         error:{
    //             ...this.state.error,
    //             [e.target.id]: change,
    //         }
    //     }, () => this.buttonChange())
    //
    // }

    buttonChange = () => {
        // console.log(this.state.error.category)
        let saveButtonEnable = (this.state.error.name.classname === "is-valid");
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
        // console.log(widgetId);
        const elementVal = this.state.formValue[event.target.name]; // should be element value of category or owner in the formValue
        // console.log(elementVal);
        const list = this.state[widgetId].concat([elementVal]);
        // console.log(list);
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

    render() {
        return(
            <form className={"d-flex flex-column"}>
                <h4 className={"d-flex justify-content-center"}
                    style={{color:"#00635a"}}><strong>add the shop information</strong></h4>
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
                            change={this.change}/>
                        <FormGroup
                            id={"country"}
                            inputValue={this.state.formValue["country"]}
                            show={"country"}
                            type={"text"}
                            className={"form-control"}
                            change={this.change}/>
                        <FormGroup
                            id={"city"}
                            inputValue={this.state.formValue["city"]}
                            show={"city"}
                            type={"text"}
                            className={"form-control"}
                            change={this.change}/>
                        <FormGroup
                            id={"street"}
                            inputValue={this.state.formValue["street"]}
                            show={"street"}
                            type={"text"}
                            className={"form-control"}
                            change={this.change}/>
                    </div>
                    <div className={"d-flex flex-column"}>
                        <FormGroup
                            id={"imgUrl"}
                            // inputValue={this.state.formValue["imgUrl"]}
                            show={"upload image"}
                            type={"file"}
                            className={"form-control"}
                            change={this.change}/>
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
                        <ArrayInputTags show={"owners/managers"}
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
                    <div></div>
                </div>
                <div className={"d-flex justify-content-center"}>
                    <button className={"btn btn-primary btn-sm active"}
                            disabled={!this.state.buttonEnable.saveButtonEnable}>
                        save
                    </button>
                </div>
            </form>
        )
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
    }
}

export default withRouter(AddNewShop);