import React, {Component, useState} from 'react';
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";

const ShopCard = (props) => {

    let lengthOfTag = 0;

    const randomColor = () => {
        const beautifulColor =
            ["#e52165",
            "#0d1137",
            "#077b8a",
            "#a2d5c6",
            "#ff6e40",
            "#ecc19c",
            "#87ac34",
            "#123456",
            "#b9925e",
            "#4203c9"]
        return beautifulColor[Math.floor(Math.random() * 10)];
    }

    return(
        <div className="card" style={{height: "220px", width: "300px", backgroundColor: "white"}}>
            <img src={props.src}
                 className="card-img-top"
                 alt={props.alt}
                 style={{height: "160px", width: "300px"}}/>
            <div className="card-body" style={{padding: "0 0 0 3px"}}>
                <label
                    style={{margin: "3px 0 6px 3px", fontFamily: "Michroma", fontSize: "23px"}}>
                    {props.shopName}
                </label>
                <div  className={"homepage-tags-container"}
                    style={{margin: "0 0 0 3px", fontSize:"15px"}}>
                    {(props.categoriesList || []).map((item, i) => {
                        lengthOfTag += item.length;
                        if(i<3 && lengthOfTag <= 30){
                            return (<div
                                style={{backgroundColor:randomColor(),
                                    padding: "0 2px",
                                    color:"white", textAlign: "center"}}>
                                {item}
                            </div>)
                        }
                        else return null;
                    })}
                </div>
            </div>
        </div>
    )
}

const ProfileTableInDrawer = (props) => {

    const logout = () => {
        localStorage.removeItem("token");
        props.changeLogoutStatus();
    }

    const doNothingLikeMe = () => {

    }

    return(
        <>
            {
                (props.user)?
                (
                    <div className={"d-flex justify-content-center"}>
                        <div className={"d-flex flex-column"}>
                            <FormGroup
                                id={"username"}
                                inputValue={props.user.username || ""}
                                show={"username"}
                                type={"text"}
                                change={doNothingLikeMe}/>
                            <FormGroup
                                id={"email"}
                                inputValue={props.user.email || ""}
                                show={"email"}
                                type={"text"}
                                change={doNothingLikeMe}/>
                            <FormGroup
                                id={"role"}
                                inputValue={props.user.role || ""}
                                show={"role"}
                                type={"text"}
                                change={doNothingLikeMe}/>
                            <button className={"btn btn-primary btn-sm active"}
                                    onClick={logout}>
                                logout
                            </button>
                        </div>
                    </div>
                ):
                (<label>there is no information so far!</label>)
            }
        </>
    )
}

const LoginAndRegisterInDrawer = withRouter((props) => {

    const login = (event) => {
        event.preventDefault();
        props.history.push("/login");
    }

    const register = (event) => {
        event.preventDefault();
        props.history.push("/register");
    }

    return(
        <div className={"d-flex justify-content-center"}>
            <div className={"d-flex flex-column"}>
                <button className={"btn btn-primary btn-sm active"}
                        onClick={login}>
                    login
                </button>
                {/*<button onClick={login}>login</button>*/}
                <br/>
                <p>don't have account?
                    <span
                        onClick={register}
                        style={{cursor: "pointer"}}>
                        register here
                    </span></p>
            </div>
        </div>
    )
})

const FormGroup = (props) => {

    return(
        <div className={"form-group"}>
            <label htmlFor={props.id}
                   style={{color:"#00635a"}}>
                {props.show}
            </label>
            <input
                value={props.inputValue}
                className={`form-control ${props.className}`}
                type={props.type}
                id={props.id}
                name={props.id} // to pair label
                onChange={props.change}
            />
            <div className={props.promptClassname}>
                {props.promptText}
            </div>
        </div>
    )
}

const ArrayTags = (props) => {
    return(
        <div>
            <label htmlFor={props.id} style={{color:"#00635a"}}>{props.show}</label>
            <div className={"container"} id={"tagGroup"}>
                <div className={"row"}>

                    {
                        (props.arrayValues || ["empty"]).map(item => (
                        <button
                            key={props.id + "-" + item}
                            className="btn btn-outline-success col-6-sm"
                            value={item}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

const ArrayInputTags = (props) => {
    return(
        <div>
            <label htmlFor={props.id} style={{color:"#00635a"}}>{props.show}</label>
            <div className={"d-flex"}>
                <input
                    className={"form-control"}
                    value={props.inputValue}
                    type={"input"}
                    id={props.id} // should be the same as the key in the formValue of state
                    name={props.id} // to pair label
                    onChange={props.changeFunc}
                />
                <button
                    type={"button"}
                    id={props.arrayKey}
                    className={"btn btn-outline-primary btn-sm active"}
                    disabled={!props.buttonEnable}
                    name={props.id} // should be the same as the key in the formValue of state
                    onClick={props.addFunc}>+</button>
            </div>
            <div className={"container"} id={"tagGroup"}>
                <div className={"row"}>
                    {(props.arrayValues || []).map(item => (
                        <button
                            key={props.id + "-" + item}
                            className="btn btn-outline-success col-6-sm"
                            name={props.arrayKey} // should be the same as the key in the state
                            onClick={props.removeFunc}
                            value={item}>{item}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}


const Dropdown = (props) => {
    const [isOpen, setIsOpen] = useState("");
    const [selection, setSelection] = useState("customer");

    return(
        <div className={"d-flex flex-column"}>
            <label style={{color:"#00635a", margin: 0}}>{props.show}</label>
            <div className={"dropdown d-flex justify-content-center"}>
                <button className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuLink"
                        onClick={(event) => {
                            event.preventDefault();
                            if(isOpen === "") setIsOpen("show");
                            else setIsOpen("")
                        }}>
                    {selection}
                </button>

                <div className={"dropdown-menu " + isOpen} onClick={props.selectedItemFromDropdown}>
                    {(props.dropdownItems || []).map(item => (
                        <button
                            key={item}
                            id={item}
                            className="dropdown-item btn-sm"
                            style={{paddingLeft:5, paddingTop: 3, paddingBottom: 3}}
                            onClick={((event) => {
                                event.preventDefault();
                                setSelection(event.target.id);
                                setIsOpen("");
                            })}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>

    )
}

const NoPermissionPage = (props) => {
    return(
        <div className={"d-flex justify-content-around"}>
            <div className={"d-flex flex-column align-items-center"}>
                <img
                    src="http://s3.ca-central-1.amazonaws.com/jupiterlsy/sad_face_for_block_page.png"
                    style={{width: 200, height: 200}}
                    alt="you can't access to this page"
                />
                <div className="alert alert-warning" role="alert">
                    {props.message}
                </div>
            </div>
        </div>
    )
}

const ErrorFromServer = (props) => {
    return(
        <p className={"text-center"} style={{color:props.color}}>
            {props.value}
        </p>
    )
}


const VerifyTokenAndGetProfile = (props) => {
    let token = localStorage.getItem("token");
    // need to check user's role first
    fetch("/v1/profile",{
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "token": token,
        },
    })
    .then(res => res.json())
    .then(data => {
        if(data.result === null){
            return null;
        }
        else if(data.result.role !== "owner"){
            this.setState({
                firstAuthentication: {isValid: false, errorMsg: "only owner can access"}
            })
        }
        else{
            this.setState({
                firstAuthentication: {isValid: true, errorMsg: ""}
            })
        }
    })
}

const HeaderWithDrawer = (props) => {

    const [drawers, setDrawers] = useState({
        outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
        button: "false", var1: "false", var2: "true",
        var3: "bmd-layout-backdrop"
    })

    const toggle = () => {
        setDrawers({
            outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay bmd-drawer-in",
            button: "", var1: "", var2: "", var3: "bmd-layout-backdrop in"
        })
    }

    // side page swipe back
    const back = () => {
        setDrawers({
                outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
                button: "false", var3: "bmd-layout-backdrop"
            }
        )
    }

    return (
        <div className="d-flex p-2">
            <div className={drawers.outer}>
                <header className="bmd-layout-header">
                    <nav className="navbar navbar-light"
                         style={{backgroundColor: "#FFFFFF",
                             padding: "2px 25px 4px 0"}}>
                        <button
                            className="navbar-toggler"
                            type="button"
                            style={{border: "0"}}
                            onClick={toggle}>
                            <i className="fa fa-bars"></i>
                        </button>
                        <div className="nav navbar-nav">
                            <div className="d-flex">
                                {props.buttonSeries}
                            </div>
                        </div>
                    </nav>
                </header>
                <div id="dw-s2" className="bmd-layout-drawer bg-faded">
                    <header>
                        <div className="navbar-brand">{props.drawerTitle}</div>
                    </header>
                    <div>
                        {props.drawerContent}
                    </div>
                </div>
                <div style={{paddingBottom: "10px"}}></div>
                <div style={{backgroundColor: "white", minHeight: "700px"}}>
                    {props.pageContent}
                </div>
                <div style={{paddingBottom: "10px"}}></div>
                <div className={drawers.var3}
                     onClick={back} />
            </div>
        </div>
    )
}

const CheckTokenInFirstLoad = (props) => {

    // redux state
    const tokenInfo = useSelector(state => state.token);
    return(
        (!tokenInfo.isCertified)?
            <LoginAndRegisterInDrawer
                link={props}/>:
            <ProfileTableInDrawer
                user={tokenInfo.username}
                changeLogoutStatus={() =>{}}/>
    )
}


export default ShopCard;
export {ProfileTableInDrawer,
    LoginAndRegisterInDrawer,
    FormGroup,
    ArrayTags,
    ArrayInputTags,
    Dropdown,
    NoPermissionPage,
    ErrorFromServer,
    VerifyTokenAndGetProfile,
    HeaderWithDrawer,
    CheckTokenInFirstLoad};