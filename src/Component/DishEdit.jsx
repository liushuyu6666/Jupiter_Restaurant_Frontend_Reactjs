import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {retrieveDishUnderOwner, updateDish} from "../Services/dish";
import {loadPage} from "../Support/supportFunctions";
import HeaderAndDrawer from "./HeaderAndDrawer";
import {FormGroup, ArrayInputTags, LoadingDataPage, NoPermissionPage} from "./Widgets";
import {connect} from "react-redux";
import {resetServer} from "../Redux/server/actionCreator";
import {updateImage} from "../Services/file";


class DishEdit extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                shopId: this.props.match.params.shopId,
                name: "",
                imgUrl: "",
                desc: "",
                categories: [],
                price: 0,
            },
            auxiliaryValue: {
                category: "",
                image: null
            },
            button:{
                categoriesButton: false,
            },
            errors: {
                imgUrl: {isValid: false, message: ""},
                submitError: {isValid: false, message: ""},
            }
        }
    }

    change = (event) => {
        this.setState({
            formValue:{
                ...this.state.formValue,
                [event.target.id]: event.target.value,
            }
        })
    }

    imageUpload = (event) => {
        const file = event.target.files[0];
        let imageId = this.props.server.mainContent.id;

        this.setState({
            errors: {
                ...this.state.errors,
                imgUrl: {
                    isValid: false,
                    message: "",
                }
            }
        })
        updateImage(imageId, file)
            .then(res => {
                if(res.result != null){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            imgUrl: {
                                isValid: true,
                                message: res.msg,
                            }
                        }
                    })
                }
                else{
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            imgUrl: {
                                isValid: false,
                                message: res.msg,
                            }
                        }
                    })
                }
            })
            .catch(err => {
                this.setState({
                    errors:{
                        ...this.state.errors,
                        imgUrl: {
                            isValid: false,
                            message: err.error,
                        }
                    }
                })
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

    save = () => {
        let updatingValue = this.state.formValue;
        console.log("updatingValue");
        console.log(updatingValue);
        updateDish(this.props.match.params.dishId,
            localStorage.getItem("Authorization"),
            updatingValue)
            .then(res => {
                if(res.result != null){
                    this.props.resetServer();
                    window.alert(res.msg);
                    this.props.history.push(`/manage/shops/${this.props.match.params.shopId}/dishes`)
                }
                else{
                    window.alert(res.msg);
                }
            })
            .catch(err => {
                window.alert(err.msg);
            })
    }

    mainContent = () => {
        if(this.props.server.isLoading){
            return(
                <LoadingDataPage message={"the page is loading..."} />
            )
        }
        if(!this.props.server.errorsFromServer.isValid){
            return(
                <NoPermissionPage message={"something wrong from server"}/>
            )
        }
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
                        isValid={this.state.errors.imgUrl.isValid}
                        errorMessage={this.state.errors.imgUrl.message}
                        change={this.imageUpload}
                    />
                    <img
                        src={this.state.formValue.imgUrl}
                        alt={"shop image"}
                        width="200" height="120"/>
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
                    buttonSeries={this.buttonSeries()}
                />
            </div>
        )
    }

    componentDidMount() {
        loadPage(retrieveDishUnderOwner(this.props.match.params.shopId,
            this.props.match.params.dishId, localStorage.getItem("Authorization")));
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
        if(prevProps.server.errorsFromServer.isValid !== this.props.server.errorsFromServer.isValid){
            if(this.props.server.errorsFromServer.isValid){
                this.setState({
                    formValue: {
                        shopId: this.props.server.mainContent.shopId,
                        name: this.props.server.mainContent.name,
                        imgUrl: this.props.server.mainContent.imgUrl,
                        desc: this.props.server.mainContent.desc,
                        categories: this.props.server.mainContent.categories,
                        price: this.props.server.mainContent.price,
                    },
                })
            }
        }
        if(prevState.errors.imgUrl.isValid !== this.state.errors.imgUrl.isValid){
            if(this.state.errors.imgUrl.isValid){
                this.setState({
                    formValue:{
                        ...this.state.formValue,
                        imgUrl: "http://s3.ca-central-1.amazonaws.com/jupiterlsy/loading_image",
                    }
                })
                setTimeout(() => {
                    // this.props.server.mainContent.imgUrl
                    this.setState({
                        formValue:{
                            ...this.state.formValue,
                            imgUrl: this.props.server.mainContent.imgUrl,
                        }
                    })
                }, 3000);
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
)(withRouter(DishEdit));