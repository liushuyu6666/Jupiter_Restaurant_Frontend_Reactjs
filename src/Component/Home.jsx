import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ShopCard, {
    ProfileTableInDrawer,
    LoginAndRegisterInDrawer,
    HeaderWithDrawer,
    CheckTokenInFirstLoad} from "./Widgets";
import checkTokenAndFillProfile from '../Redux/token/tokenSlice'
import {useSelector} from "react-redux";

class Home extends Component{

    constructor(prop) {
        super(prop);
        this.state = {
            loginStatus: false,
            info: {},
            shopsList: [],
        }
    }

    //layout
    mainContent = () => {
        return(
            <div className="homepage-container">
                {
                    (this.state.shopsList || []).map((shop, i) => (
                        <ShopCard
                            key={i + 1}
                            src={shop.imgUrl}
                            alt={shop.name + "picture"}
                            shopName={shop.name}
                            categoriesList={shop.categories}/>

                        )
                    )
                }
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
        // let token = localStorage.getItem("token");
        // if(!token){
        //     this.setState({
        //         info: {},
        //         loginStatus: false,
        //     })
        // }
        // else {
        //     fetch("/v1/profile", {
        //         "method": "GET",
        //         "headers": {
        //             "Content-Type": "application/json",
        //             "token": token,
        //         },
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         if(data.result != null){
        //             this.setState({
        //                 info: data.result,
        //                 loginStatus: true,
        //             })
        //         }
        //         else{
        //             localStorage.removeItem("token");
        //             this.setState({
        //                 info: {},
        //                 loginStatus: false,
        //             })
        //         }
        //     })
        // }

        checkTokenAndFillProfile();

        // list all shops
        // get shop information
        fetch("/v1/shops", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "token": "",
            },
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                shopsList: data.result,
            });
        })
    }

    render(){
        return(
            <HeaderWithDrawer
                pageContent={this.mainContent()}
                buttonSeries={this.buttonSeries()}
                drawerTitle={"Profile"}
                // drawerContent={this.drawerContent()}
                drawerContent ={CheckTokenInFirstLoad()}
            />
        )
    }
}

export default withRouter(Home);