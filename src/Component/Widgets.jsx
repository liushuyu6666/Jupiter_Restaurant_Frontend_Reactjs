import React, {useState}  from 'react';


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

export default DishCard;
export {FormGroup, ArrayInputTags, Dropdown, NoPermissionPage};