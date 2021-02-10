import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ShopCard, {ProfileTableInDrawer, LoginAndRegisterInDrawer, HeaderWithDrawer} from "./Widgets";

class Home extends Component{

    constructor(prop) {
        super(prop);
        this.state = {
            loginStatus: false,
            info: {}
        }
    }

    //layout
    mainContent = () => {
        return(
            <div className="homepage-container">
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold jjjjjjjjj food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
                <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
                          alt={"shop picture"}
                          shopName={"McDonald"}
                          categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
            </div>
        )
    }

    //layout
    buttonSeries = () => {
        return(
               (this.state.info == null)?
                (null):
                (((this.state.info.role==="customer") &&
                (<button className={"btn btn-primary btn-sm active"}
                >
                    history orders
                </button>))
                ||
                ((this.state.info.role==="owner") &&
                (<button className={"btn btn-primary btn-sm active"}
                         onClick={() => {this.props.history.push("/shops/list")}}
                >
                    manage my shop
                </button>)))
        )
    }

    //layout
    drawerContent = () => {
        return(
            (!this.state.loginStatus)?
            <LoginAndRegisterInDrawer
                link={this.props}/>:
            <ProfileTableInDrawer
                user={this.state.info}
                changeLogoutStatus={this.logoutStatus}/>
        )
    }

    // toggle = () => {
    //     this.setState({
    //         drawers: {
    //             outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay bmd-drawer-in",
    //             button: "", var1: "", var2: "", var3: "bmd-layout-backdrop in"
    //         }
    //     })
    // }

    // side page swipe back
    // back = () => {
    //     this.setState({
    //         drawers: {
    //             outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
    //             button: "false", var3: "bmd-layout-backdrop"
    //         }
    //     })
    // }

    // after logout, change the loginStatus and delete token
    logoutStatus = () => {
        localStorage.removeItem("token");
        this.setState({
            info: {},
            loginStatus: false,
        })
    }

    componentDidMount() {
        // verify token, and show user info in the drawer, if not valid, the token will be clear
        let token = localStorage.getItem("token");
        if(!token){
            this.setState({
                info: {},
                loginStatus: false,
            })
        }
        else {
            fetch("/v1/profile", {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "token": token,
                },
            })
                .then(res => res.json())
                .then(data => {
                    if(data.result != null){
                        this.setState({
                            info: data.result,
                            loginStatus: true,
                        })
                    }
                    else{
                        localStorage.removeItem("token");
                        this.setState({
                            info: {},
                            loginStatus: false,
                        })
                    }
                })
        }
    }

    render(){
        return(
            <HeaderWithDrawer
                pageContent={this.mainContent()}
                buttonSeries={this.buttonSeries()}
                drawerTitle={"Profile"}
                drawerContent={this.drawerContent()}
            />
        )
    }
}

export default withRouter(Home);