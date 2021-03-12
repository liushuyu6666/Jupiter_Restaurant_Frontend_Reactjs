import React, {Component} from "react/";
import {FormGroup, ArrayTags, ArrayInputTags, ErrorFromServer, NoPermissionPage} from "./Widgets";
import { Accordion, Card, Button } from "react-bootstrap";
import ShopList from "./ShopList";

class ShopManageCollapse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            updatedValue: {},
            isListPage: true,
            isCheckStratum: true,
            isOpen: {
                button: "btn btn-link collapsed",
                collapse: "collapse",
                status: false,
                buttonEnabled: true
            },
            // error: {
            //     name: {isValid: false},
            //     img: {classname: "", promptText: "", promptClassname: ""},
            //     category: {classname: "", promptText: "", promptClassname: "", addStatus: false},
            // },

            // formValue: {_id: this.props.shop._id, name: this.props.shop.name,
            //     country: this.props.shop.address.country, city: this.props.shop.address.city,
            //     street: this.props.shop.address.street, desc: this.props.shop.desc,
            //     imgUrl: this.props.shop.imgUrl, category: "", owner: ""
            // },
            // categoriesList: this.props.shop.categories,
            // ownersList: this.props.shop.owners,
            // buttonEnable: {saveButtonEnable: true,
            //     categoryAddButtonEnable: false,
            //     ownerAddButtonEnable: false
            // },
            // firstAuthorization: {errorMsg: "", isValid: true, loginName: ""},
            // errorsFromServer: {value: "", color: ""},
            // newImage: null,
        }
    }

    // // listen to all changes except image
    // change = (event) => {
    //     if(event.target.id === "name"){
    //         this.check(event);
    //     }
    //     else{
    //         this.setState({
    //             formValue:{
    //                 ...this.state.formValue,
    //                 [event.target.id]:event.target.value,
    //             }
    //         }, () => {
    //             this.check(event)
    //         })
    //     }
    // }

    // listen to image change
    imageChange = (event) => {
        const file = event.target.files[0];
        this.setState({
                newImage: file,
        })
    }

    // for shop name, the check function need to confirm the event.target.id === name;
    // but for category and owner, it shouldn't check since the add button is clicked,
    // check function will be called again and at that time, event.target is not the input;
    // check = (e) => {
    //
    //     // e.preventDefault();
    //
    //     const name = {};
    //     const category = {};
    //     const owner = {};
    //     const img = {};
    //
    //     let change = {};
    //     // check shop name
    //     if(e.target.id === "name") {
    //         name.classname = "is-valid"
    //         name.promptClassname = "valid-feedback";
    //         name.promptText = "shop name can't be changed";
    //     }
    //
    //     // check category
    //     if (this.state.formValue.category.trim() === "") {
    //         category.addStatus = false;
    //     } else if (this.state.formValue.category.length > 15) {
    //         category.classname = "is-invalid";
    //         category.promptClassname = "invalid-feedback";
    //         category.promptText = "should shorter";
    //         category.addStatus = false;
    //     } else if (this.state.formValue.category.indexOf(',') >= 0) {
    //         category.classname = "is-invalid"
    //         category.promptClassname = "invalid-feedback";
    //         category.promptText = "no ',' here";
    //         category.addStatus = false;
    //     } else {
    //         category.classname = "is-valid"
    //         category.promptClassname = "valid-feedback";
    //         category.promptText = "it works";
    //         category.addStatus = true;
    //     }
    //
    //     // check owner
    //     if (this.state.formValue.owner.trim() === "") {
    //         owner.addStatus = false;
    //     }
    //     else if(this.state.formValue.owner.length > 30) {
    //         owner.classname = "is-invalid";
    //         owner.promptClassname = "invalid-feedback";
    //         owner.promptText = "should shorter";
    //         owner.addStatus = false;
    //     }
    //     else if (this.state.formValue.owner.indexOf(',') >= 0) {
    //         owner.classname = "is-invalid";
    //         owner.promptClassname = "invalid-feedback";
    //         owner.promptText = "no ',' here";
    //         owner.addStatus = false;
    //     }
    //     else {
    //         owner.classname = "is-valid"
    //         owner.promptClassname = "valid-feedback";
    //         owner.promptText = "it works";
    //         owner.addStatus = true;
    //     }
    //
    //     // check img
    //     if(this.state.newImage != null){
    //         const uploadType = this.state.newImage.type;
    //         const uploadSize = this.state.newImage.size;
    //         if(uploadType.substr(0, uploadType.indexOf('/')) !== "image"){
    //             img.classname = "is-invalid";
    //             img.promptClassname = "invalid-feedback";
    //             img.promptText = "must be image";
    //         }
    //         else if(uploadSize > 800000){
    //             img.classname = "is-invalid";
    //             img.promptClassname = "invalid-feedback";
    //             img.promptText = "image need to be smaller than 0.8 MB";
    //         }
    //     }
    //
    //     change = {name: name, category: category, owner: owner, img: img};
    //
    //     // update the state
    //     this.setState({
    //         error: change,
    //     }, () => this.buttonChange())
    // }
    //
    // buttonChange = () => {
    //     let saveButtonEnable = (
    //         this.state.error.img.classname !== "is-invalid"
    //     && this.state.errorsFromServer.color !== "red");
    //     let categoryAddButtonEnable = this.state.error.category.addStatus;
    //     let ownerAddButtonEnable = this.state.error.owner.addStatus;
    //     let buttonEnable = {
    //         "saveButtonEnable": saveButtonEnable,
    //         "categoryAddButtonEnable": categoryAddButtonEnable,
    //         "ownerAddButtonEnable": ownerAddButtonEnable
    //     }
    //
    //
    //
    //     this.setState({
    //         buttonEnable: buttonEnable,
    //     })
    // }

    // arrayAdd = (event) => {
    //     event.preventDefault();
    //     const widgetId = event.target.id; //categoriesList or ownersList
    //     const elementVal = this.state.formValue[event.target.name]; // should be element value of category or owner in the formValue
    //     const list = this.state[widgetId].concat([elementVal]);
    //     this.setState({
    //         [widgetId]: list
    //     });
    //     this.setState({
    //         formValue:{
    //             ...this.state.formValue,
    //             [event.target.name]: "",
    //         }
    //     }, () => this.check(event))
    // }

    arrayRemove = (event) => {
        event.preventDefault();
        const widgetId = event.target.name;
        const index = this.state[widgetId].indexOf(event.target.value);
        this.setState({
            [widgetId]: this.state[widgetId].filter((_, i) => i !== index)
        }, () => this.check(event))
    }

    // click functions
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

    checkToUpdate = (event) => {
        let updated = {
            id: this.props.shop.id,
            name: this.props.shop.shopName,
            description: this.props.shop.desc,
            imgUrl: this.props.shop.imgUrl,
            categories: this.props.shop.categories,
            ownerId: this.props.shop.ownerId,
            country: this.props.shop.address.country,
            city: this.props.shop.address.city,
            street: this.props.shop.address.street,
            category: "",
        }
        this.setState({
            updatedValue: updated,
            isCheckStratum: false,
        }, () => console.log(this.state.isCheckStratum))
    }

    updateToCheck = (event) => {
        let confirm = window.confirm("you will switch to check stratum without saving!");
        if(confirm){
            this.setState({
                updatedValue: {},
                isCheckStratum: true,
            })
        }
    }

    // clickSave = (event) => {
    //     event.preventDefault();
    //     this.setState({
    //         errorsFromServer: {value: "please wait...", color: "green"},
    //         buttonEnable: {...this.state.buttonEnable, saveButtonEnable:false}
    //     }, () => {
    //         // upload image if owner upload new image
    //         if(this.state.newImage != null){
    //             const formData = new FormData();
    //             formData.append("file", this.state.newImage);
    //             formData.append("name", "shop|" + this.state.formValue.name);
    //             fetch("/v1/files",{
    //                 "method": "POST",
    //                 "body": formData,
    //                 "redirect": "follow",
    //             })
    //             .then(res => res.json())
    //             .then(data => {
    //                 // if upload image failed, show the error and disable the button
    //                 if(data.result == null){
    //                     this.setState({
    //                         errorsFromServer: {value: data.msg, color: "red"},
    //                         buttonEnable: {...this.state.buttonEnable, saveButtonEnable:false}
    //                     })
    //                 }
    //                 // if upload image properly, needn't to get the new image url since
    //                     // the shop name can't be changed, the url must be the same
    //                 else{
    //
    //                 }
    //             })
    //         }
    //         // prepare the new information
    //         // add the user user's name array
    //         const ownersListFinal = Array.from(new Set(
    //             [...this.state.ownersList,
    //                 this.state.firstAuthorization.loginName]));
    //         const form = {
    //             "_id": this.state.formValue._id,
    //             "name": this.state.formValue.name,
    //             "desc": this.state.formValue.desc,
    //             "imgUrl": this.state.formValue.imgUrl,
    //             "categories": this.state.categoriesList,
    //             "owners" :ownersListFinal,
    //             "address": {"country": this.state.formValue.country,
    //                 "city": this.state.formValue.city,
    //                 "street": this.state.formValue.street},
    //         }
    //         fetch(`/v1/shops/${form._id}`,{
    //             "method": "POST",
    //             "headers": {
    //                 "Content-Type": "application/json",
    //                 "token": localStorage.getItem("token"),
    //             },
    //             "body": JSON.stringify(form),
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             if(data.result == null){
    //                 this.setState({
    //                     errorsFromServer: {value: data.msg, color: "red"},
    //                     buttonEnable: {...this.state.buttonEnable, saveButtonEnable: false}
    //                 })
    //             }
    //             // update successfully
    //             else{
    //                 window.alert("update successfully");
    //                 this.setState({
    //                     errorsFromServer: {value: "jump back...", color: "green"},
    //                     buttonEnable: {...this.state.buttonEnable, saveButtonEnable: false},
    //                     isListPage: true,
    //                 },() => {
    //                     this.setState({
    //                         errorsFromServer: {value: "", color: ""},
    //                         buttonEnable: {...this.state.buttonEnable, saveButtonEnable: true},
    //                     })
    //                 })
    //             }
    //         })
    //         .catch(e => {
    //             this.setState({
    //                 errorsFromServer: {value: e.msg, color: "red"},
    //                 buttonEnable: {...this.state.buttonEnable, saveButtonEnable: false}
    //             })
    //         })
    //     })
    // }

    clickBack= () => {
        this.setState({
            isListPage: !this.state.isListPage,
        })
    }

    render() {
        return (

            <Card>
                <Card.Header style={{backgroundColor: "#609E99"}}>
                    <h5 className="mb-0 d-flex justify-content-between">
                        <Accordion.Toggle as={Button} variant="link" eventKey={this.props.eventKey}
                            className={`${this.state.isOpen.button}`}
                            // data-toggle="collapse"
                            // data-target="#collapseOne"
                            disabled={!this.state.isOpen.buttonEnabled}
                            style={{color: "white"}}
                            onClick={this.clickCollapse}>
                            {this.props.shop.shopName}
                        </Accordion.Toggle>
                        <button
                            className={"btn btn-link"}
                            style={{color: "white"}}>
                            {`${this.props.shop.address.city}, ${this.props.shop.address.country}`}
                        </button>
                    </h5>
                </Card.Header>
                <Accordion.Collapse eventKey={this.props.eventKey}>
                    <Card.Body>
                        {
                            // (this.state.isCheckStratum)?
                                // check detail
                            (<div className={"shopListPage-collapse-list-detail"}>
                                <div
                                    className={"shopListPage-collapse-list-detail-leftColumn"}
                                >
                                    <FormGroup id={"street"}
                                               inputValue={this.props.shop.address.street}
                                               show={"street"}
                                               type={"text"}
                                               change={() => {}}/>
                                    <ArrayTags id={"category"}
                                               show={"categories"}
                                               arrayValues={this.props.shop.categories}/>
                                    {/*<ArrayTags id={"owner"}*/}
                                    {/*           show={"owners"}*/}
                                    {/*           arrayValues={this.state.ownersList}/>*/}
                                </div>
                                <img
                                    className={"shopListPage-collapse-list-detail-rightColumn"}
                                    src={this.props.shop.imgUrl}
                                    alt={this.props.shop.shopName}
                                    width="200" height="120"/>
                                <div className={"shopListPage-collapse-list-detail-description"}>
                                    <FormGroup id={"desc"}
                                               inputValue={this.props.shop.desc}
                                               show={"desc"}
                                               type={"text"}
                                               change={() => {}}/>
                                </div>
                                <div className={"shopListPage-collapse-list-detail-leftButton"}>
                                    <button
                                        className={"btn btn-primary btn-sm active"}
                                        onClick={this.checkToUpdate}>
                                        edit
                                    </button>
                                </div>
                                <div className={"shopListPage-collapse-list-detail-rightButton"}>
                                    <button className={"btn btn-primary btn-sm active"}>
                                        check dishes
                                    </button>
                                </div>
                            </div>)
                                // update
                            // (<div className={"shopListPage-collapse-update-detail"}>
                            //     <div className={"shopListPage-collapse-update-detail-leftColumn"}>
                            //         {
                            //             ["name", "country", "city", "street", "description"].map(item => (
                            //                 <FormGroup
                            //                     key={item}
                            //                     id={item}
                            //                     inputValue={this.state.updatedValue[item]}
                            //                     show={item}
                            //                     type={"text"}
                            //                     change={(event) => {
                            //                         event.preventDefault();
                            //                         this.setState({
                            //                             updatedValue:{
                            //                                 address:{
                            //                                     ...this.state.updatedValue.address,
                            //                                     [event.target.id]: event.target.value,
                            //                                 }
                            //                             }
                            //                         })
                            //                     }}
                            //                     />
                            //             ))
                            //         }
                            //     </div>
                            //     <div className={"shopListPage-collapse-update-detail-rightColumn"}>
                            //         <FormGroup
                            //             id={"imgUrl"}
                            //             // inputValue={this.state.formValue["imgUrl"]}
                            //             show={"upload image"}
                            //             type={"file"}
                            //             // className={this.state.error.img.classname}
                            //             // promptClassname={this.state.error.img.promptClassname}
                            //             // promptText={this.state.error.img.promptText}
                            //             change={this.imageChange}
                            //         />
                            //         {/*<ArrayInputTags show={"categories"}*/}
                            //         {/*                id={"category"} // should be the same as the key in the formValue of state*/}
                            //         {/*                arrayKey={"categoriesList"}*/}
                            //         {/*                arrayValues={this.state.updatedValue.categories}*/}
                            //         {/*                inputValue={this.state.updatedValue.category}*/}
                            //         {/*                buttonEnable={this.state.buttonEnable.categoryAddButtonEnable}*/}
                            //         {/*                promptClassname={this.state.error.category.promptClassname}*/}
                            //         {/*                promptText={this.state.error.category.promptText}*/}
                            //         {/*                changeFunc={this.change}*/}
                            //         {/*                addFunc={this.arrayAdd}*/}
                            //         {/*                removeFunc={this.arrayRemove}*/}
                            //         {/*/>*/}
                            //         {/*<ArrayInputTags show={"owners"}*/}
                            //         {/*                id={"owner"} // should be the same as the key in the formValue of state*/}
                            //         {/*                arrayKey={"ownersList"}*/}
                            //         {/*                arrayValues={this.state.ownersList}*/}
                            //         {/*                inputValue={this.state.formValue["owner"]}*/}
                            //         {/*                buttonEnable={this.state.buttonEnable.ownerAddButtonEnable}*/}
                            //         {/*                promptClassname={this.state.error.owner.promptClassname}*/}
                            //         {/*                promptText={this.state.error.owner.promptText}*/}
                            //         {/*                changeFunc={this.change}*/}
                            //         {/*                addFunc={this.arrayAdd}*/}
                            //         {/*                removeFunc={this.arrayRemove}*/}
                            //         {/*/>*/}
                            //     </div>
                            //     <div className="shopListPage-collapse-update-detail-serverError">
                            //         {/*<ErrorFromServer*/}
                            //         {/*    value={this.state.errorsFromServer.value}*/}
                            //         {/*    color={this.state.errorsFromServer.color}*/}
                            //         {/*/>*/}
                            //     </div>
                            //     <div className={"shopListPage-collapse-update-detail-leftButton"}>
                            //         <button
                            //             className={"btn btn-primary btn-sm active"}
                            //             // disabled={!this.state.buttonEnable.saveButtonEnable}
                            //             onClick={this.clickSave}>
                            //             save
                            //         </button>
                            //     </div>
                            //     <div className={"shopListPage-collapse-update-detail-rightButton"}>
                            //         <button
                            //             className={"btn btn-primary btn-sm active"}
                            //             onClick={this.updateToCheck}>
                            //             back
                            //         </button>
                            //     </div>
                            // </div>)
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }

    componentDidMount() {
        // need to check user's role first
        // fetch("/v1/profile",{
        //     "method": "GET",
        //     "headers": {
        //         "Content-Type": "application/json",
        //         "token": localStorage.getItem("token")
        //     },
        // })
        // .then(res => res.json())
        // .then(data => {
        //     if(data.result == null){
        //         this.setState({
        //             firstAuthorization: {isValid: false, errorMsg: data.msg}
        //         })
        //     }
        //     else if(data.result.role !== "owner"){
        //         this.setState({
        //             firstAuthorization: {isValid: false, errorMsg: "only owner can access"}
        //         })
        //     }
        //     else{
        //         // console.log(data.result);
        //         this.setState({
        //             firstAuthorization: {isValid: true,
        //                 errorMsg: "",
        //                 loginName: data.result.username}
        //         })
        //     }
        // })
    }

}

export default ShopManageCollapse;