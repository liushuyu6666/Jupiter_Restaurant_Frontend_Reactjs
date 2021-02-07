import React, {useState}  from 'react';
import Collapse from 'react-bootstrap/Collapse'


const DishCard = (props) => {

    return(
        <div className={"col-sm-4"} style={{height: "11rem", width: "12rem", backgroundColor: "red"}}>
            <div className="card" style={{height: "10rem", width: "12rem", backgroundColor: "green"}}>
                <img src={props.src}
                     className="card-img-top"
                     alt={props.alt}
                     style={{height: "8rem", width: "12rem"}}/>
                <div className="card-body">
                    <p className="card-text">{props.txt}</p>
                </div>
            </div>
        </div>
    )
}

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
                    src="http://s3.ca-central-1.amazonaws.com/jupiterlsy/1612328951096-sad_face_for_block_page.png"
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

const CollapseElement = (props) => {

    const [isOpen, setIsOpen] =
        useState({"good restaurant": {button: "btn btn-link collapsed",
                                                collapse: "collapse",
                                                status: false,
                                                height: 100}
                                                    });

    return (
        <div id="accordion">
            <div className="card">
                <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button
                            className={isOpen["good restaurant"].button}
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded={isOpen["good restaurant"].status}
                            onClick={() => {
                                if(!isOpen["good restaurant"].status) {
                                    setIsOpen({
                                        ...isOpen,
                                        "good restaurant":
                                            {button: "btn btn-link collapsed",
                                                collapse: "collapsing",
                                                status: false}
                                    });
                                    setIsOpen({
                                        ...isOpen,
                                        "good restaurant":
                                            {button: "btn btn-link",
                                            collapse: "collapse show",
                                            status: true,
                                            height: 100}
                                    });
                                }
                                else {
                                    setIsOpen({
                                        ...isOpen,
                                        "good restaurant":
                                            {button: "btn btn-link collapsed",
                                                collapse: "collapsing",
                                                status: false}
                                    });
                                    setTimeout(() => {
                                        setIsOpen({
                                            ...isOpen,
                                            "good restaurant":
                                                {button: "btn btn-link collapsed",
                                                    collapse: "collapse",
                                                    status: false}
                                        });
                                    }, 300);
                                }}
                            }
                        >
                            Collapsible Group Item #1
                        </button>
                    </h5>
                </div>
                <div
                    id="collapseOne"
                    className={isOpen["good restaurant"].collapse}
                    data-parent="#accordion"
                    style={{height: isOpen["good restaurant"].height}}>
                    <div className="card-body">
                        Anim pariatur cliche reprehenderit, nim aesthetic synth nesciunt you probably haven't heard
                        of them accusamus labore sustainable VHS.
                    </div>
                </div>
            </div>
        </div>
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



export default DishCard;
export {FormGroup,
    ArrayInputTags,
    Dropdown,
    NoPermissionPage,
    ErrorFromServer,
    VerifyTokenAndGetProfile,
    CollapseElement};