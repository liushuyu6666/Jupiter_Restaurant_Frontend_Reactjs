import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ShopCard, {ProfileTableInDrawer, LoginAndRegisterInDrawer} from "./Widgets";

class Home extends Component{

    constructor(prop) {
        super(prop);
        this.state = {
            drawers: {outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
                button: "false", var1: "false", var2: "true",
                var3: "bmd-layout-backdrop"},
            loginStatus: false,
            info: {}
        }
    }

    toggle = () => {
        this.setState({
            drawers: {
                outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay bmd-drawer-in",
                button: "", var1: "", var2: "", var3: "bmd-layout-backdrop in"
            }
        })
    }

    // side page swipe back
    back = () => {
        this.setState({
            drawers: {
                outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
                button: "false", var3: "bmd-layout-backdrop"
            }
        })
    }

    // after logout, change the loginStatus
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
            <div className="d-flex p-2">
                <div className={this.state.drawers.outer}>
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
                            <div className="nav navbar-nav">
                                <div className="d-flex">
                                    {   (this.state.info == null)?
                                        (null):
                                        (((this.state.info.role==="customer") &&
                                            (<button className={"btn btn-primary btn-sm active"}
                                            >
                                                history orders
                                            </button>)) ||
                                            ((this.state.info.role==="owner") &&
                                                (<button className={"btn btn-primary btn-sm active"}
                                                         onClick={() => {this.props.history.push("/shops/list")}}
                                                >
                                                    manage my shop
                                                </button>)))}
                                </div>
                            </div>
                        </nav>
                    </header>
                    <div id="dw-s2" className="bmd-layout-drawer bg-faded">
                        <header>
                            <div className="navbar-brand">Profile</div>
                        </header>
                        <div>
                            {(!this.state.loginStatus)?
                                <LoginAndRegisterInDrawer
                                    link={this.props}/>:
                                <ProfileTableInDrawer
                                    user={this.state.info}
                                    changeLogoutStatus={this.logoutStatus}/>}
                        </div>
                    </div>
                    <div style={{paddingBottom: "10px"}}></div>
                    <div className="homepage-container" style={{backgroundColor: "white"}}>
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
                    <div style={{paddingBottom: "10px"}}></div>
                    <div className={this.state.drawers.var3}
                         onClick={this.back} />
                </div>
            </div>
        )
    }
}

export default withRouter(Home);


// class Home extends Component{
//
//     constructor(prop) {
//         super(prop);
//         this.state = {
//             drawers: {outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
//                       button: "false", var1: "false", var2: "true",
//                       var3: "bmd-layout-backdrop"},
//             loginStatus: false,
//             info: {}
//         }
//     }
//
//     toggle = () => {
//         this.setState({
//             drawers: {
//                 outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay bmd-drawer-in",
//                 button: "", var1: "", var2: "", var3: "bmd-layout-backdrop in"
//             }
//         })
//     }
//
//     // side page swipe back
//     back = () => {
//         this.setState({
//             drawers: {
//                 outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
//                 button: "false", var3: "bmd-layout-backdrop"
//             }
//         })
//     }
//
//     // after logout, change the loginStatus
//     logoutStatus = () => {
//         localStorage.removeItem("token");
//         this.setState({
//             info: {},
//             loginStatus: false,
//         })
//     }
//
//     componentDidMount() {
//         // verify token, and show user info in the drawer, if not valid, the token will be clear
//         let token = localStorage.getItem("token");
//         if(!token){
//             this.setState({
//                 info: {},
//                 loginStatus: false,
//             })
//         }
//         else {
//             fetch("/v1/profile", {
//                 "method": "GET",
//                 "headers": {
//                     "Content-Type": "application/json",
//                     "token": token,
//                 },
//             })
//             .then(res => res.json())
//             .then(data => {
//                 if(data.result != null){
//                     this.setState({
//                         info: data.result,
//                         loginStatus: true,
//                     })
//                 }
//                 else{
//                     localStorage.removeItem("token");
//                     this.setState({
//                         info: {},
//                         loginStatus: false,
//                     })
//                 }
//             })
//         }
//     }
//
//     render(){
//         return(
//             <div className="d-flex p-2">
//                 <div className={this.state.drawers.outer}>
//                     <header className="bmd-layout-header">
//                         <nav className="navbar navbar-light"
//                              style={{backgroundColor: "#FFFFFF",
//                                      padding: "2px 25px 4px 0"}}>
//                             <button
//                                 className="navbar-toggler"
//                                 type="button"
//                                 style={{border: "0"}}
//                                 onClick={this.toggle}>
//                                 <i className="fa fa-bars"></i>
//                             </button>
//                             <div className="nav navbar-nav">
//                                 <div className="d-flex">
//                                     {   (this.state.info == null)?
//                                         (null):
//                                         (((this.state.info.role==="customer") &&
//                                             (<button className={"btn btn-primary btn-sm active"}
//                                             >
//                                                 history orders
//                                             </button>)) ||
//                                             ((this.state.info.role==="owner") &&
//                                             (<button className={"btn btn-primary btn-sm active"}
//                                                  onClick={() => {this.props.history.push("/shops/list")}}
//                                             >
//                                                 manage my shop
//                                             </button>)))}
//                                 </div>
//                             </div>
//                         </nav>
//                     </header>
//                     <div id="dw-s2" className="bmd-layout-drawer bg-faded">
//                         <header>
//                             <div className="navbar-brand">Profile</div>
//                         </header>
//                         <div>
//                             {(!this.state.loginStatus)?
//                                 <LoginAndRegisterInDrawer
//                                     link={this.props}/>:
//                                 <ProfileTableInDrawer
//                                     user={this.state.info}
//                                     changeLogoutStatus={this.logoutStatus}/>}
//                         </div>
//                     </div>
//                     <div style={{paddingBottom: "10px"}}></div>
//                     <div className="homepage-container" style={{backgroundColor: "white"}}>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold jjjjjjjjj food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                         <ShopCard src={"https://www.w3schools.com/css/paris.jpg"}
//                                   alt={"shop picture"}
//                                   shopName={"McDonald"}
//                                   categoriesList={["cold food", "take away", "fast food", "dine in", "keep abcdefg"]}/>
//                     </div>
//                     <div style={{paddingBottom: "10px"}}></div>
//                     <div className={this.state.drawers.var3}
//                          onClick={this.back} />
//                 </div>
//             </div>
//         )
//     }
// }
//
// export default withRouter(Home);