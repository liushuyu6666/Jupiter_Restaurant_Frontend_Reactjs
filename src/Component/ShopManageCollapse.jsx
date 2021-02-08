import React, {Component} from "react/";
import {FormGroup, ArrayTags, ArrayInputTags, ErrorFromServer} from "./Widgets";
import ShopList from "./ShopList";

class ShopManageCollapse extends {Component, ShopList}{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {_id: this.props.shop._id, name: this.props.shop.name,
                country: this.props.shop.address.country, city: this.props.shop.address.city,
                street: this.props.shop.address.street, desc: this.props.shop.desc,
                imgUrl: this.props.shop.imgUrl, category: "", owner: ""
            },
            categoriesList: this.props.shop.categories,
            ownersList: this.props.shop.owners,
            isOpen: {
                button: "btn btn-link collapsed", collapse: "collapse", status: false, buttonEnabled: true
            },
            error: {
                name: {classname: "", promptText: "", promptClassname: ""},
                img: {classname: "", promptText: "", promptClassname: ""},
                category: {classname: "", promptText: "", promptClassname: "", addStatus: false},
                owner: {classname: "", promptText: "", promptClassname: "", addStatus: false}
            },
            buttonEnable: {saveButtonEnable: true,
                categoryAddButtonEnable: false,
                ownerAddButtonEnable: false
            },
            errorsFromServer: {value: "", color: ""},
        }
    }

    // listen to all changes except image
    change = (event) => {
        this.setState({
            formValue:{
                ...this.state.formValue,
                [event.target.id]:event.target.value,
            }
        }, () => {
            this.check(event)
        })
    }

    // for shop name, the check function need to confirm the event.target.id === name;
    // but for category and owner, it shouldn't check since the add button is clicked,
    // check function will be called again and at that time, event.target is not the input;
    check = (e) => {

        // e.preventDefault();

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

        change = {name: name, category: category, owner: owner, img: img};

        // update the state
        this.setState({
            error: change,
        }, () => this.buttonChange())
    }

    buttonChange = () => {
        let saveButtonEnable = (this.state.error.name.classname === "is-valid"
            && this.state.error.img.classname !== "is-invalid");
        let categoryAddButtonEnable = this.state.error.category.addStatus;
        let ownerAddButtonEnable = this.state.error.owner.addStatus;
        let buttonEnable = {
            "saveButtonEnable": saveButtonEnable,
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





    clickCollapse = (event) => {
        event.preventDefault();
        if(!this.state.isOpen.status) {
            this.setState({
                isOpen:{
                    button: "btn btn-link collapsed",
                    collapse: "collapsing",
                    status: true,
                    buttonEnabled: false
                }
            })
            setTimeout(() => {
                this.setState({
                    isOpen:{
                        button: "btn btn-link",
                        collapse: "collapse show",
                        status: true,
                        buttonEnabled: true,
                        height: "auto"
                    }
                })
            }, 300);
        }
        else {
            this.setState({
                isOpen:{
                    button: "btn btn-link collapsed",
                    collapse: "collapsing",
                    status: false,
                    buttonEnabled: false
                }
            })
            setTimeout(() => {
                this.setState({
                    isOpen:{
                        button: "btn btn-link",
                        collapse: "collapse",
                        status: false,
                        buttonEnabled: true
                    }
                })
            }, 300);
        }
    }

    clickManage = (event) => {
        event.preventDefault();
        this.setState({
            readOnly: !this.state.readOnly,
        })
    }

    clickSave = (event) => {
        event.preventDefault();

    }

    render() {
        return (
            <div id={this.state.formValue._id}>
                <div className="card">
                    <div className="card-header" id={`heading_${this.state.formValue._id}`}
                         style={{backgroundColor: "#00635a"}}>
                        <h5 className="mb-0 d-flex justify-content-between">
                            <button
                                className={`${this.state.isOpen.button}`}
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                disabled={!this.state.isOpen.buttonEnabled}
                                style={{color: "white"}}
                                onClick={this.clickCollapse}>
                                {this.state.formValue.name}
                            </button>
                            <button
                                className={"btn btn-link"}
                                style={{color: "white"}}>
                                {`${this.state.formValue.city}, ${this.state.formValue.country}`}
                            </button>
                        </h5>
                    </div>
                    <div
                        id={`collapse_${this.state.formValue._id}`}
                        className={this.state.isOpen.collapse}
                        data-parent="#accordion"
                        style={{height: this.state.isOpen.height}}>
                        <div className="card-body d-flex flex-column">
                            {
                                (this.state.readOnly)?
                                    // check detail
                                (<>
                                    <div className={"d-flex justify-content-around"}>
                                        <div className={"d-flex flex-column"}>
                                            <FormGroup id={"street"}
                                                       inputValue={this.state.formValue.street}
                                                       show={"street"}
                                                       type={"text"}
                                                       change={() => {}}/>
                                            <ArrayTags id={"category"}
                                                       show={"categories"}
                                                       arrayValues={this.state.categoriesList}/>
                                            <ArrayTags id={"owner"}
                                                       show={"owners"}
                                                       arrayValues={this.state.ownersList}/>
                                        </div>
                                        <img
                                            src={this.state.formValue.imgUrl}
                                            alt={this.state.formValue.name}
                                            width="200" height="120"/>
                                    </div>
                                    <div className={"d-flex justify-content-center"}>
                                        <FormGroup id={"desc"}
                                                   inputValue={this.state.formValue.desc}
                                                   show={"desc"}
                                                   type={"text"}
                                                   change={() => {}}/>
                                    </div>
                                    <div className={"d-flex justify-content-around"}>
                                        <button
                                            className={"btn btn-primary btn-sm active"}
                                            onClick={this.clickManage}>
                                            manage
                                        </button>
                                        <button className={"btn btn-primary btn-sm active"}>
                                            check dishes
                                        </button>
                                    </div>
                                </>):
                                    // update
                                (<>
                                    <div className={"d-flex justify-content-around"}>
                                        <div className={"d-flex flex-column"}>
                                            <FormGroup id={"name"}
                                                       inputValue={this.state.formValue["name"]}
                                                       show={"name"}
                                                       type={"text"}
                                                       className={this.state.error.name.classname}
                                                       promptClassname={this.state.error.name.promptClassname}
                                                       promptText={this.state.error.name.promptText}
                                                       change={this.change}/>
                                            <FormGroup id={"country"}
                                                       inputValue={this.state.formValue.country}
                                                       show={"country"}
                                                       type={"text"}
                                                       change={this.change}/>
                                            <FormGroup id={"city"}
                                                       inputValue={this.state.formValue.city}
                                                       show={"city"}
                                                       type={"text"}
                                                       change={this.change}/>
                                            <FormGroup id={"street"}
                                                       inputValue={this.state.formValue.street}
                                                       show={"street"}
                                                       type={"text"}
                                                       change={this.change}/>
                                        </div>
                                        <div className={"d-flex flex-column"}>
                                            <img
                                                src={this.state.formValue.imgUrl}
                                                alt={this.state.formValue.name}
                                                width="200" height="120"
                                            />
                                            <br/>
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
                                            <ArrayInputTags show={"owners"}
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
                                        </div>
                                    </div>
                                    <div className={"d-flex justify-content-center"}>
                                        <FormGroup id={"desc"}
                                                   inputValue={this.state.formValue.desc}
                                                   show={"description"}
                                                   type={"text"}
                                                   change={this.change}/>
                                    </div>
                                    <ErrorFromServer
                                        value={this.state.errorsFromServer.value}
                                        color={this.state.errorsFromServer.color}
                                    />
                                    <div className={"d-flex justify-content-around"}>
                                        <button
                                            className={"btn btn-primary btn-sm active"}
                                            disabled={!this.state.buttonEnable.saveButtonEnable}
                                            onClick={this.clickManage}>
                                            save
                                        </button>
                                    </div>
                                </>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default ShopManageCollapse;