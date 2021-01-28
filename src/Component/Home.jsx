import React, {Component} from 'react';
import LoginAndRegister from './LoginAndRegister'
import ProfileTable from "./ProfileTable";
import DishCard from "./Widgets";

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
            },
            loginStatus: false,
            info: {},
        })
    }

    // after logout, change the loginStatus
    logoutStatus = () => {
        this.setState({
            loginStatus: false,
        })
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        if(!token){
            this.setState({
                loginStatus: false,
            })
        }
        else {
            this.setState({
                loginStatus: true,
            })
            fetch("/v1/profile", {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "token": token,
                },
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        info: data.result
                    })
                })
        }
    }

    render(){
        return(
            <div className="d-flex p-2">
                <div className={this.state.drawers.outer}>
                    <header className="bmd-layout-header">
                        <nav className="navbar navbar-light"
                             style={{backgroundColor: "#FFFFFF"}}>
                            <button
                                className="navbar-toggler"
                                type="button"
                                style={{border: "0"}}
                                onClick={this.toggle}>
                                <i className="fa fa-bars"></i>
                            </button>
                            <ul className="nav navbar-nav">
                                <li className="nav-item">aaa</li>
                            </ul>
                        </nav>
                    </header>
                    <div id="dw-s2" className="bmd-layout-drawer bg-faded">
                        <header>
                            <div className="navbar-brand">Profile</div>
                        </header>
                        <div>
                            {(!this.state.loginStatus)?
                                <LoginAndRegister/>:
                                <ProfileTable
                                    info={this.state.info}
                                    changeLogoutStatus={this.logoutStatus}/>}
                        </div>
                    </div>
                    <div className="d-flex p-2"
                    style={{backgroundColor: "yellow"}}>
                        <div className="container">
                            <div className="row">
                                <DishCard src={"https://www.w3schools.com/css/paris.jpg"}
                                txt={"The gest jajlk  jlkafjklaj lk gasklj"}/>
                                <DishCard src={"https://www.w3schools.com/css/paris.jpg"}
                                          txt={"The gest jajlk  jlkafjklaj lk gasklj"}/>
                                <DishCard src={"https://www.w3schools.com/css/paris.jpg"}
                                          txt={"The gest jajlk  jlkafjklaj lk gasklj"}/>
                                <DishCard src={"https://www.w3schools.com/css/paris.jpg"}
                                          txt={"The gest jajlk  jlkafjklaj lk gasklj"}/>
                                <DishCard src={"https://www.w3schools.com/css/paris.jpg"}
                                          txt={"The gest jajlk  jlkafjklaj lk gasklj"}/>
                                <DishCard src={"https://www.w3schools.com/css/paris.jpg"}
                                          txt={"The gest jajlk  jlkafjklaj lk gasklj"}/>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.drawers.var3}
                         onClick={this.back} />
                </div>
            </div>
        )
    }
}


export default Home;