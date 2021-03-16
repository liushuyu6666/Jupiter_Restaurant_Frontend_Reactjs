import React, {Component} from "react";
import ShopCard, {FormGroup, SmallArrayTags} from "./Widgets";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom";
import {deleteProfile} from "../Redux/user/actionCreator"
import {resetServer} from "../Redux/server/actionCreator";
import {verify} from "../Services/auth";

class HeaderAndDrawer extends Component{
    // props: 1) token from redux state
    //        2) buttonSeries
    //        3) pageCotent
    constructor(props) {
        super(props);
        this.state = {
            outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
            button: "false", var1: "false", var2: "true",
            var3: "bmd-layout-backdrop",
        }
    }

    // open the drawer
    toggle = () => {
        this.setState({
            outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay bmd-drawer-in",
            button: "", var1: "", var2: "", var3: "bmd-layout-backdrop in",
        })
    }

    // close the drawer
    back = () => {
        this.setState({
            outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
            button: "false", var3: "bmd-layout-backdrop",
        })
    }

    // go to user page
    login = (event) => {
        event.preventDefault();
        this.props.history.push("/login");
    }

    // go to register page
    register = (event) => {
        event.preventDefault();
        this.props.history.push("/register");
    }

    // logout
    logout = () => {
        localStorage.removeItem("Authorization");
        this.props.deleteProfile();
        this.props.resetServer();
        window.location.reload(true);
    }

    // do nothing
    doNothingLikeMe = () => {
    }

    /***************************** layout ******************************/
    loginAndRegisterInDrawer = () => {
        return(
            <div className={"d-flex justify-content-center"}>
                <div className={"d-flex flex-column"}>
                    <button className={"btn btn-primary btn-sm active"}
                            onClick={this.login}>
                        login
                    </button>
                    <br/>
                    <p>don't have account?
                        <span
                            onClick={this.register}
                            style={{cursor: "pointer"}}>
                        register here
                    </span></p>
                </div>
            </div>
        )
    }

    profileTableInDrawer = () => {
        return(
            <div className={"profile-container"}>
                <div className={"profile-content"}>
                    <form>
                        <FormGroup
                            id={"username"}
                            inputValue={this.props.currentUser.username || ""}
                            show={"username"}
                            type={"text"}
                            change={this.doNothingLikeMe}/>
                        <FormGroup
                            id={"email"}
                            inputValue={this.props.currentUser.email || ""}
                            show={"email"}
                            type={"text"}
                            change={this.doNothingLikeMe}/>
                        <SmallArrayTags
                            id={"roles"}
                            show={"roles"}
                            arrayValues={this.props.currentUser.roles}/>
                        <button className={"btn btn-primary btn-sm active"}
                                style={{marginTop: "10px"}}
                                onClick={this.logout}>
                            logout
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="d-flex p-2">
                <div className={this.state.outer}>
                    <header className="bmd-layout-header">
                        <nav className="navbar navbar-light"
                             style={{backgroundColor: "#FFFFFF",
                                 padding: "2px 25px 4px 0"}}>
                            <button
                                className="navbar-toggler"
                                type="button"
                                style={{border: "0"}}
                                onClick={this.toggle}>
                                <i className="fa fa-bars"></i>
                            </button>
                            <div className="homepage-buttons-container">
                                {this.props.buttonSeries}
                            </div>
                        </nav>
                    </header>
                    <div id="dw-s2" className="bmd-layout-drawer bg-faded">
                        <header>
                            <div className="navbar-brand">Profile</div>
                        </header>
                        <div>
                            {
                                (JSON.stringify(this.props.currentUser) === "{}")?
                                    this.loginAndRegisterInDrawer():
                                    this.profileTableInDrawer()
                            }
                        </div>
                    </div>
                    <div style={{paddingBottom: "10px"}}></div>
                    <div style={{backgroundColor: "white", minHeight: "700px"}}>
                        {this.props.mainContent}
                    </div>
                    <div style={{paddingBottom: "10px"}}></div>
                    <div className={this.state.var3}
                         onClick={this.back} />
                </div>
            </div>
        )
    }

    componentDidMount() {
        // check the jwt first
        if(localStorage.getItem("Authorization") !== null){
            let jwt = localStorage.getItem("Authorization");
            verify(jwt)
                .catch((err) => {
                    this.logout();
                })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.profile,
        // shopList: state.shop.shopList,
    }
}

const mapDispatchToProps = {
    deleteProfile,
    resetServer,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(HeaderAndDrawer));