import HeaderAndDrawer from "./HeaderAndDrawer";
import React, {Component} from "react";
import {ArrayInputTags, FormGroup, LoadingDataPage, NoPermissionPage} from "./Widgets";
import {resetServer} from "../Redux/server/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createDish} from "../Services/dish";
import {createImage} from "../Services/file";


class DishAdd extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                shopId: this.props.match.params.shopId,
                name: "", imgUrl: "", desc: "", categories: [],
                price: 0,
            },
            auxiliaryValue: {
                category: "",
                image: null},
            button:{
                categoriesButton: false,
            },
            errors: {
                img: {isValid: false, message: ""},
                submitError: {isValid: false, message: ""},
            }
        }
    }

    save = () => {
        let updatingValue = this.state.formValue;
        console.log(updatingValue);
        let token = localStorage.getItem("Authorization");
        createDish(token, updatingValue)
            .then(res => {
                if(res.result != null){
                    window.alert("create dish entity in the database successfully, image uploading...");

                    let imageFile = this.state.auxiliaryValue.image;
                    if(imageFile !== null){
                        createImage(res.result.id, this.state.auxiliaryValue.image)
                            .then(imgRes => {
                                if(imgRes.result != null){
                                    window.alert("create dish successfully");
                                    resetServer();
                                    this.props.history.push(`/manage/shops/${this.props.match.params.shopId}/dishes`);
                                }
                                else{
                                    window.alert(`image upload failed: ${imgRes.msg}`);
                                }
                            })
                            .catch(err => {
                                window.alert("image server failed");
                            })
                    }
                    else{
                        window.alert("no image upload");
                        this.props.history.push(`/manage/shops/${this.props.match.params.shopId}/dishes`);
                    }
                }
                else{
                    window.alert(`add new dish in the database failed: ${res.msg}`);
                }
            })
            .catch(err => {
                window.alert("server failed");
            })
    }

    arrayAdd = (event) => {
        event.preventDefault();
        // match the key name in this.state.formValue
        const widgetId = event.target.id;
        // should be element value of category or owner in the formValue
        const elementVal = this.state.auxiliaryValue[event.target.name];
        const list = new Set(this.state.formValue[widgetId]).add(elementVal);
        this.setState({
            formValue: {
                ...this.state.formValue,
                categories: [...list],
            },
            auxiliaryValue: {
                ...this.state.auxiliaryValue,
                [event.target.name]: "",
            },
            // button: {
            //     categoriesButton: false,
            //     abc: false,
            // }
        });
    }

    arrayRemove = (event) => {
        event.preventDefault();
        const widgetId = event.target.name; // categories arrayKey
        const index = [...this.state.formValue[widgetId]].indexOf(event.target.value);
        this.setState({
            formValue:{
                ...this.state.formValue,
                [widgetId]: [...this.state.formValue[widgetId]].filter((_, i) => i !== index)
            }
        })
    }

    mainContent = () => {
        return (
            <div className="login-register-container">
                <form className="login-register-content">
                    <FormGroup
                        key={"name"}
                        id={"name"}
                        inputValue={this.state.formValue["name"]}
                        show={"dish name"}
                        type={"text"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    name: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroup
                        key={"price"}
                        id={"price"}
                        inputValue={this.state.formValue["price"]}
                        show={"price"}
                        type={"text"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    price: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroup
                        key={"desc"}
                        id={"desc"}
                        inputValue={this.state.formValue["desc"]}
                        show={"description"}
                        type={"text"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    desc: event.target.value,
                                }
                            })
                        }}
                    />
                    <ArrayInputTags show={"categories"}
                                    name={"category"} // event.target.name
                                    id={"category"}
                                    arrayKey={"categories"} // event.target.id
                                    arrayValues={this.state.formValue.categories}
                                    inputValue={this.state.auxiliaryValue.category}
                                    buttonEnable={this.state.button.categoriesButton}
                                    addFunc={this.arrayAdd}
                                    removeFunc={this.arrayRemove}
                                    abc={this.state.button.abc}
                                    changeFunc={(event) => {
                                        this.setState({
                                            auxiliaryValue:{
                                                ...this.state.auxiliaryValue,
                                                category: event.target.value,
                                            }
                                        })
                                    }}
                    />
                    <FormGroup
                        id={"img"}
                        inputValue={this.state.auxiliaryValue.imageName}
                        show={"upload image"}
                        type={"file"}
                        isValid={this.state.errors.img.isValid}
                        errorMessage={this.state.errors.img.message}
                        change={(event) => {
                            this.setState({
                                auxiliaryValue:{
                                    ...this.state.auxiliaryValue,
                                    image: event.target.files[0],
                                }
                            }, () => console.log(this.state.auxiliaryValue))
                        }}
                    />
                </form>
            </div>
        )
    }

    // button series
    buttonSeries = () => {
        let buttonArray = []
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("owner")){
            buttonArray.push(
                <button
                    key={"save"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={this.save}>
                    save
                </button>
            )
        }
        if(JSON.stringify(this.props.currentUser) !== "{}"){
            buttonArray.push(
                <button
                    key={"back"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {
                        this.props.resetServer();
                        this.props.history.push(`/manage/shops/${this.props.match.params.shopId}/dishes`);
                    }}>
                    back
                </button>
            )
        }
        return buttonArray;
    }

    render() {
        return(
            <div>
                <HeaderAndDrawer
                    mainContent={this.mainContent()}
                    buttonSeries={this.buttonSeries()}/>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.auxiliaryValue.category !== this.state.auxiliaryValue.category){
            if(this.state.auxiliaryValue.category.trim().length > 0 &&
                this.state.auxiliaryValue.category.length <= 30){
                this.setState({
                    button:{
                        ...this.state.button,
                        categoriesButton: true,
                    }
                })
            }
            else{
                this.setState({
                    button:{
                        ...this.state.button,
                        categoriesButton: false,
                    }
                })
            }
        }

        if(prevState.auxiliaryValue.image !== this.state.auxiliaryValue.image){
            if(this.state.auxiliaryValue.image !== null){
                this.setState({
                    auxiliaryValue:{
                        ...this.state.auxiliaryValue,
                        // imageName: this.state.auxiliaryValue.image.name,
                    },
                    errors: {
                        ...this.state.errors,
                        img: {isValid: true, message: `image name is ${this.state.auxiliaryValue.image.name}`}
                    }
                }, () => console.log(this.state.errors))
            }
            else{
                this.setState({
                    auxiliaryValue:{
                        ...this.state.auxiliaryValue,
                        imageName: "",
                    },
                    errors: {
                        ...this.state.errors,
                        img: {isValid: true, message: `select message failed`}
                    }
                })
            }
        }
    }
}

const mapStateToProps = (state) => (
    {
        server: state.server,
        currentUser: state.user.profile
    }
)

const mapDispatchToProps = {
    resetServer,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(DishAdd));
