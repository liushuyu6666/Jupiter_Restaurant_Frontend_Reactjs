import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItemInCart, deleteItemFromCart, countItems, resetCart} from "../Redux/cart/actionCreator";
import {Accordion, Button, Card} from "react-bootstrap";
import {resetServer} from "../Redux/server/actionCreator";
import {useHistory} from "react-router";
import {deleteShop} from "../Services/shop";
import {deleteDish} from "../Services/dish";
import {createOrder} from "../Services/order";
import {sadFaceUrl} from "../global";
import {deleteProfile} from "../Redux/user/actionCreator";


/******* layout *******/
const ShopCard = (props) => {

    const history = useHistory();
    let lengthOfTag = 0;
    const d = new Date();

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

    const click = (event) => {
        // console.log(event.target);
        resetServer();
        history.push(`/shops/${props.shopId}/dishes`);
    }

    return(
        <div
            className="card"
            style={{height: "220px", width: "300px", backgroundColor: "white"}}
        >
            <img
                id={props.shopId}
                 src={`${props.src}?t=${d.getTime()}`}
                 className="card-img-top"
                 alt={props.alt}
                 style={{height: "160px", width: "300px", cursor: "pointer"}}
                 onClick={click}/>
            <div className="card-body" style={{padding: "0 0 0 3px"}}>
                <label
                    id={props.shopId}
                    style={{margin: "3px 0 6px 3px", fontFamily: "Michroma", fontSize: "23px", cursor: "pointer"}}
                    onClick={click}
                >
                    {props.shopName}

                </label>
                <div  className={"homepage-tags-container"}
                    style={{margin: "0 0 0 3px", fontSize:"15px"}}>
                    {(props.categoriesList || []).map((item, i) => {
                        lengthOfTag += item.length;
                        if(i<3 && lengthOfTag <= 30){
                            return (
                                <div
                                    key={i}
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

const DishCard = (props) => {

    const [hover, setHover] = useState(false);
    const dispatch = useDispatch();
    const d = new Date();

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

    const overMouse = (event) =>{
        setHover(true);
    }

    const leaveMouse = (event) =>{
        setHover(false);
    }

    const addCart = (event) => {

        event.preventDefault();

        const dishId = props.dishId;
        const shopId = props.shopId;
        const ownerId = props.ownerId;
        const dishName = props.dishName;
        const shopName = props.shopName;
        const imgUrl = props.src;

        dispatch(
            addItemInCart(
                {"dishId": dishId,
                "shopId": shopId,
                "ownerId": ownerId,
                "dishName": dishName,
                "imgUrl": imgUrl,
                "shopName": shopName,}
            )
        );
    }

    return(
        <div className="card"
             style={{minHeight: "200px", width: "250px", backgroundColor: "white"}}>
            <img src={`${props.src}?t=${d.getTime()}`}
                 className="card-img-top"
                 alt={props.alt}
                 style={{height: "120px", width: "250px"}}/>
            {
                (hover) ?
                (
                    <div className="card-body"
                         style={{
                             display: "grid",
                             padding: "0 0 0 3px",
                             backgroundColor: "#00635a",
                             color: "white",
                         }}
                         onMouseLeave={leaveMouse}>
                        <p style={{placeSelf: "center", fontSize: "15px"}}
                           className={"btn btn-primary btn-sm active"}
                            onClick={addCart}>add to cart</p>
                    </div>
                ) :
                (
                    <div className="card-body"
                         style={{padding: "0 0 0 3px"}}
                         onMouseOver={overMouse}>
                        <p
                            style={{margin: "3px 0 0px 3px", fontFamily: "Michroma", fontSize: "19px"}}>
                            {props.dishName}
                        </p>
                        <p
                            style={{margin: "1px 0 1px 3px", fontFamily: "Michroma", fontSize: "14px"}}>
                            {`$${props.price}`}
                        </p>
                        <div className={"homepage-tags-container"}
                             style={{margin: "0 0 6px 3px", fontSize: "15px"}}>
                            {(props.categoriesList || []).map((item, i) => {
                                lengthOfTag += item.length;
                                if (i < 3 && lengthOfTag <= 30) {
                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                backgroundColor: randomColor(),
                                                padding: "0 2px",
                                                color: "white", textAlign: "center"
                                            }}>
                                            {item}
                                        </div>)
                                } else return null;
                            })}
                        </div>
                    </div>)}
        </div>
    )
}

const ShopManageCollapse = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState({
        button: "btn btn-link collapsed",
        collapse: "collapse",
        status: false,
        buttonEnabled: true,
    });

    const clickCollapse = (event) => {
        event.preventDefault();
        if(!isOpen.status) {
            setIsOpen({
                button: "btn btn-link collapsed",
                collapse: "collapsing",
                status: true,
                buttonEnabled: false
            })
            setTimeout(() => {
                setIsOpen(
                    {
                        button: "btn btn-link",
                        collapse: "collapse show",
                        status: true,
                        buttonEnabled: true,
                        height: "auto"
                    }
                )
            }, 300);
        }
        else {
            setIsOpen(
                {
                    button: "btn btn-link collapsed",
                    collapse: "collapsing",
                    status: false,
                    buttonEnabled: false
                }
            )
            setTimeout(() => {
                setIsOpen(
                    {
                        button: "btn btn-link",
                        collapse: "collapse",
                        status: false,
                        buttonEnabled: true
                    }
                )
            }, 300);
        }
    }

    const deleteItem = (event) => {
        if(window.confirm("delete this shop permanently?")){
            deleteShop(event.target.id,
                localStorage.getItem("Authorization"))
                .then(res => {
                    if(res.result != null){
                        window.alert(res.msg);
                        window.location.reload(true);
                    }
                    else{
                        window.alert(res.msg);
                    }
                })
                .catch(err => {
                    window.alert("something wrong from server when delete");
                })
        }

    }

    const d = new Date();

    return(
        <Card>
            <Card.Header style={{backgroundColor: "#609E99"}}>
                <h5 className="mb-0 d-flex justify-content-between">
                    <Accordion.Toggle as={Button} variant="link" eventKey={props.eventKey}
                                      className={`${isOpen.button}`}
                        // data-toggle="collapse"
                        // data-target="#collapseOne"
                                      disabled={!isOpen.buttonEnabled}
                                      style={{color: "white"}}
                                      onClick={clickCollapse}>
                        {props.shop.shopName}
                    </Accordion.Toggle>
                    <button
                        className={"btn btn-link"}
                        style={{color: "white"}}>
                        {`${props.shop.address.city}, ${props.shop.address.country}`}
                    </button>
                </h5>
            </Card.Header>
            <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body>
                    {
                        // (this.state.isCheckStratum)?
                        // check detail
                        (<div className={"shopListPage-collapse-list-detail"}>
                            <div
                                className={"shopListPage-collapse-list-detail-leftColumn"}
                            >
                                <FormGroup id={"street"}
                                           inputValue={props.shop.address.street}
                                           show={"street"}
                                           type={"text"}
                                           change={() => {}}/>
                                <FormGroup id={"createAt"}
                                           inputValue={props.shop.createAt}
                                           show={"create time:"}
                                           type={"text"}
                                           change={() => {}}/>
                                <FormGroup id={"modifiedAt"}
                                           inputValue={props.shop.updateAt}
                                           show={"update time:"}
                                           type={"text"}
                                           change={() => {}}/>
                                {/*<ArrayTags id={"owner"}*/}
                                {/*           show={"owners"}*/}
                                {/*           arrayValues={this.state.ownersList}/>*/}
                            </div>
                            <div className={"shopListPage-collapse-list-detail-rightColumn"}>
                                <ArrayTags
                                    id={"category"}
                                    show={"categories"}
                                    arrayValues={props.shop.categories}/>
                                <img
                                    src={`${props.shop.imgUrl}?t=${d.getTime()}`}
                                    alt={props.shop.shopName}
                                    width="200" height="120"/>
                            </div>
                            <div className={"shopListPage-collapse-list-detail-description"}>
                                <FormGroup id={"desc"}
                                           inputValue={props.shop.desc}
                                           show={"desc"}
                                           type={"text"}
                                           change={() => {}}/>
                            </div>
                            <div className={"shopListPage-collapse-list-detail-leftButton"}>
                                <button
                                    id={props.shop.id}
                                    className={"btn btn-primary btn-sm active"}
                                    onClick={(event) => {
                                        dispatch(resetServer());
                                        history.push(`/edit/shops/${event.target.id}`);
                                    }}>
                                    edit
                                </button>
                            </div>
                            <div className="shopListPage-collapse-list-detail-deleteButton">
                                <button id={props.shop.id}
                                        className={"btn btn-primary btn-sm active"}
                                        onClick={deleteItem}>
                                    delete
                                </button>
                            </div>
                            <div className={"shopListPage-collapse-list-detail-rightButton"}>
                                <button
                                    id={props.shop.id}
                                    className={"btn btn-primary btn-sm active"}
                                    onClick={(event) => {
                                        dispatch(resetServer());
                                        history.push(`/manage/shops/${event.target.id}/dishes`)
                                    }}>
                                    check dishes
                                </button>
                            </div>
                        </div>)
                    }
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

const DishManageCollapse = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState({
        button: "btn btn-link collapsed",
        collapse: "collapse",
        status: false,
        buttonEnabled: true,
    });

    const clickCollapse = (event) => {
        event.preventDefault();
        if(!isOpen.status) {
            setIsOpen({
                button: "btn btn-link collapsed",
                collapse: "collapsing",
                status: true,
                buttonEnabled: false
            })
            setTimeout(() => {
                setIsOpen(
                    {
                        button: "btn btn-link",
                        collapse: "collapse show",
                        status: true,
                        buttonEnabled: true,
                        height: "auto"
                    }
                )
            }, 300);
        }
        else {
            setIsOpen(
                {
                    button: "btn btn-link collapsed",
                    collapse: "collapsing",
                    status: false,
                    buttonEnabled: false
                }
            )
            setTimeout(() => {
                setIsOpen(
                    {
                        button: "btn btn-link",
                        collapse: "collapse",
                        status: false,
                        buttonEnabled: true
                    }
                )
            }, 300);
        }
    }

    const deleteItem = (event) => {
        if(window.confirm("delete this dish permanently?")){
            console.log(event.target.id);
            deleteDish(event.target.id,
                localStorage.getItem("Authorization"))
                .then(res => {
                    if(res.result != null){
                        window.alert(res.msg);
                        window.location.reload(true);
                    }
                    else{
                        window.alert(res.msg);
                    }
                })
                .catch(err => {
                    window.alert("something wrong from server when delete");
                })
        }

    }

    const d = new Date();

    return(
        <Card>
            <Card.Header style={{backgroundColor: "#609E99"}}>
                <h5 className="mb-0 d-flex justify-content-between">
                    <Accordion.Toggle
                        as={Button} variant="link" eventKey={props.eventKey}
                        className={`${isOpen.button}`}
                        // data-toggle="collapse"
                        // data-target="#collapseOne"
                        disabled={!isOpen.buttonEnabled}
                        style={{color: "white"}}
                        onClick={clickCollapse}
                    >
                        {props.dish.dishName}
                    </Accordion.Toggle>
                    <button
                        className={"btn btn-link"}
                        style={{color: "white"}}>
                        {`$ ${props.dish.price}`}
                    </button>
                </h5>
            </Card.Header>
            <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body>
                    {
                        // (this.state.isCheckStratum)?
                        // check detail
                        (<div className={"dishListPage-collapse-list-detail"}>
                            <div
                                className={"dishListPage-collapse-list-detail-leftColumn"}
                            >
                                <FormGroup id={`createAt-${props.dish.dishId}`}
                                           inputValue={props.dish.createAt}
                                           show={"create time:"}
                                           type={"text"}
                                           change={() => {}}/>
                                <FormGroup id={`modifiedAt-${props.dish.dishId}`}
                                           inputValue={props.dish.updateAt}
                                           show={"update time:"}
                                           type={"text"}
                                           change={() => {}}/>
                                {/*<ArrayTags id={"owner"}*/}
                                {/*           show={"owners"}*/}
                                {/*           arrayValues={this.state.ownersList}/>*/}
                            </div>
                            <div className={"dishListPage-collapse-list-detail-rightColumn"}>
                                <ArrayTags
                                    id={"category"}
                                    show={"categories"}
                                    arrayValues={props.dish.categories}/>
                                <img
                                    src={`${props.dish.imgUrl}?t=${d.getTime()}`}
                                    alt={props.dish.dishName}
                                    width="200" height="120"/>
                            </div>
                            <div className={"dishListPage-collapse-list-detail-description"}>
                                <FormGroup id={`desc-${props.dish.dishId}`}
                                           inputValue={props.dish.desc}
                                           show={"desc"}
                                           type={"text"}
                                           change={() => {}}/>
                            </div>
                            <div className={"dishListPage-collapse-list-detail-leftButton"}>
                                <button
                                    id={props.dish.id}
                                    className={"btn btn-primary btn-sm active"}
                                    onClick={(event) => {
                                        dispatch(resetServer());
                                        history.push(`/edit/shops/${props.dish.shopId}/dishes/${props.dish.dishId}`);
                                    }}>
                                    edit
                                </button>
                            </div>
                            <div className="dishListPage-collapse-list-detail-deleteButton">
                                <button id={props.dish.dishId}
                                        className={"btn btn-primary btn-sm active"}
                                        onClick={deleteItem}>
                                    delete
                                </button>
                            </div>
                            <div className={"dishListPage-collapse-list-detail-rightButton"}>
                                <button className={"btn btn-primary btn-sm active"}>
                                    check reviews
                                </button>
                            </div>
                        </div>)
                    }
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

const OrderManageCollapse = (props) => {
    const [isOpen, setIsOpen] = useState({
        button: "btn btn-link collapsed",
        collapse: "collapse",
        status: false,
        buttonEnabled: true,
    });

    const clickCollapse = (event) => {
        event.preventDefault();
        if(!isOpen.status) {
            setIsOpen({
                button: "btn btn-link collapsed",
                collapse: "collapsing",
                status: true,
                buttonEnabled: false
            })
            setTimeout(() => {
                setIsOpen(
                    {
                        button: "btn btn-link",
                        collapse: "collapse show",
                        status: true,
                        buttonEnabled: true,
                        height: "auto"
                    }
                )
            }, 300);
        }
        else {
            setIsOpen(
                {
                    button: "btn btn-link collapsed",
                    collapse: "collapsing",
                    status: false,
                    buttonEnabled: false
                }
            )
            setTimeout(() => {
                setIsOpen(
                    {
                        button: "btn btn-link",
                        collapse: "collapse",
                        status: false,
                        buttonEnabled: true
                    }
                )
            }, 300);
        }
    }

    return(
        <Card>
            <Card.Header style={{backgroundColor: "#609E99"}}>
                <h5 className="mb-0 d-flex justify-content-between">
                    <Accordion.Toggle as={Button} variant="link" eventKey={props.eventKey}
                                      className={`${isOpen.button}`}
                        // data-toggle="collapse"
                        // data-target="#collapseOne"
                                      disabled={!isOpen.buttonEnabled}
                                      style={{color: "white"}}
                                      onClick={clickCollapse}>
                        {`${props.order.createAt.substring(0,10)} ${props.order.createAt.substring(11,16)}`}
                    </Accordion.Toggle>
                    <button
                        className={"btn btn-link"}
                        style={{color: "white"}}>
                        {`total: ${props.order.dishDetails.length}`}
                    </button>
                </h5>
            </Card.Header>
            <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Dish Name</th>
                                <th scope="col">Shop Name</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            (props.order.dishDetails.map((item, i) => (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.dishName}</td>
                                    <td>{item.shopName}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            )))
                        }
                        </tbody>
                    </table>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

/******* small widgets *************/

const FormGroup = (props) => {

    let className = "", promptClassname = "", type = props.type;

    if(props.isValid === false){
        className = "is-invalid";
        promptClassname = "invalid-feedback";
    }
    else if(props.isValid === true){
        className = "is-valid";
        promptClassname = "valid-feedback";
    }

    if(props.id === "password" || props.id === "confirm"){
        type = "password";
    }

    return(
        <div className={"form-group"}>
            <label htmlFor={props.id}
                   style={{color:"#00635a"}}>
                {props.show}
            </label>
            <input
                value={props.inputValue}
                className={`form-control ${className}`}
                type={type}
                id={props.id}
                name={props.id} // to pair label
                onChange={props.change}
            />
            <div className={promptClassname}>
                {props.errorMessage}
            </div>
        </div>
    )
}

const AlertText = (props) => {
    let colorName = (props.isValid) ? "green" : "red";
    return (
        <div>
            <p style={{color:colorName}}>{props.message}</p>
        </div>
    )
}

const CheckBox = (props) => {

    return (
        <div>
            <label htmlFor={props.id}
                   style={{color:"#00635a"}}>
                {props.show}
            </label>
            {
                (props.selectValues || []).map(item => (
                    <label
                        key={item}
                        className="inline btn" style={{color: "#00635a"}}
                    >
                        <input
                            type="checkbox"
                            value={item}
                            onChange={props.change}/>
                        {" "+item}
                    </label>
                ))
            }
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

const SmallArrayTags = (props) => {
    return(
            <div>
                <label htmlFor={props.id} style={{color:"#00635a"}}>{props.show}</label>
                <div  className={"homepage-tags-container"}
                      style={{margin: "0 0 0 3px", fontSize:"15px"}}>
                    {(props.arrayValues || ["no role"]).map((item, i) => (
                        <div
                            key={i}
                            style={{backgroundColor:"#00635a",
                                padding: "0 2px",
                                color:"white", textAlign: "center"}}>
                            {item}
                        </div>
                    ))}
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
                    // disabled={true}
                    name={props.id} // should be the same as the key in the formValue of state
                    onClick={props.addFunc}>+</button>
            </div>
            <div className={"container"} id={"tagGroup"}>
                <div className={"row"}>
                    {[...props.arrayValues].map(item => (
                        <button
                            key={props.id + "-" + item}
                            className="btn btn-outline-success col-6-sm"
                            name={props.arrayKey}
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

/******** cart ************/

const CartDropdown = (props) => {

    const cartRef = useRef();
    const history = useHistory();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState("");
    const [top, setTop] = useState("");
    const [left, setLeft] = useState("");
    const winWidth = window.innerWidth;
    const d = new Date();

    const toggle = (event) => {
        event.preventDefault();
        const {offsetTop, offsetLeft, offsetHeight} = cartRef.current;

        setTop((offsetTop + offsetHeight).toString() + "px");
        setLeft((winWidth - 430 - offsetLeft).toString() + "px");
        if(isOpen === "") setIsOpen("show");
        else setIsOpen("")
    }

    const saveOrder = () => {
        // console.log(cart.cartItems);
        const items = {};
        cart.cartItems.map(item => {
            items[item.dishId] = item.amount;
            return items;
        })
        const body = {
            "dishAmount": items,
        }

        const jwt = localStorage.getItem("Authorization");
        createOrder(jwt, body)
            .then(res => {
                if(res.result !== null){
                    dispatch(resetCart());
                    window.alert(res.msg);
                }
                else{
                    window.alert(res.msg);
                }
            })
            .catch(err => {
                window.alert(err.msg);
            })
    }

    useEffect(() => {
        dispatch(countItems());
    }, [cart.cartItems, dispatch]);

    const mainContent = () => {
        const items = [];
        if(cart.cartItems.length === 0){
            items.push(
                <div className={"cart-item-container"}>
                    <img src={sadFaceUrl}
                         className="card-img-top"
                         alt={"small dish"}
                         style={{height: "50px", width: "70px"}}/>
                    <div>
                        <p style={{margin: "3px 0 0px 3px", fontFamily: "Michroma", fontSize: "13px"}}>
                            No dishes here
                        </p>
                        <p style={{margin: "3px 0 0px 3px", fontFamily: "Michroma", fontSize: "11px"}}>
                            please order food first :)
                        </p>
                    </div>
                </div>
            )
        }
        else{
            cart.cartItems.map(item => (
                items.push(
                    <div className={"cart-item-container"}>
                        <img src={`${item.imgUrl}?t=${d.getTime()}`}
                             className="card-img-top"
                             alt={"small dish"}
                             style={{height: "50px", width: "70px"}}/>
                        <div>
                            <p style={{margin: "3px 0 0px 3px", fontFamily: "Michroma", fontSize: "13px"}}>
                                {item.dishName}
                            </p>
                            <p style={{margin: "3px 0 0px 3px", fontFamily: "Michroma", fontSize: "11px"}}>
                                {item.shopName}
                            </p>
                        </div>
                        <div

                            style={{placeSelf: "center", cursor: "pointer"}}
                            onClick={(event) =>
                            {dispatch(addItemInCart(item))}}>+</div>
                        <div style={{placeSelf: "center"}}>{item.amount}</div>
                        <div
                            style={{placeSelf: "center", cursor: "pointer"}}
                            onClick={(event) =>
                            {dispatch(deleteItemFromCart(item))}}>-</div>
                    </div>
                )
            ));
            if(user.profile.roles && user.profile.roles.includes("customer")){
                items.push(
                    <button
                        onClick={saveOrder}
                        className={"btn btn-primary btn-sm active"}
                    >
                        place the order
                    </button>
                );
            }
            else{
                items.push(
                    <button
                        onClick={() => {
                            resetServer();
                            deleteProfile();
                            history.push("/login");
                        }}
                        className={"btn btn-primary btn-sm active"}
                    >
                        need customer role to place the order
                    </button>
                );
            }
            // items.push(
            //     <button
            //         onClick={saveOrder}
            //         className={"btn btn-primary btn-sm active"}
            //     >
            //         place the order
            //     </button>
            // );
        }
        return items;
    }

    return(
        <div ref={cartRef}
             className={"dropdown"}>
            <button id="dropdownMenuLink"
                    className="btn btn-secondary btn-sm dropdown-toggle"
                    onClick={toggle}>
                {`cart item(${cart.total})`}
            </button>
            <div
                id={"cart"}
                className={`dropdown-menu dropdown-menu-right ${isOpen}`}
                style={{position:"absolute",
                    top: top, left: left}} >
                <div className={"cart-container"}>
                    <div className={"cart-item"}>
                        {
                            mainContent()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

/********* auxiliary widgets **************/

const NoPermissionPage = (props) => {
    return(
        <div className={"d-flex justify-content-around"}>
            <div className={"d-flex flex-column align-items-center"}>
                <img
                    src={sadFaceUrl}
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

const LoadingDataPage = (props) => {
    return(
        <div className={"d-flex justify-content-around"}>
            <div className={"d-flex flex-column align-items-center"}>
                <i className={"fa fa-refresh"}></i>
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

// const CheckTokenInFirstLoad = () => {
//     let token = localStorage.getItem("token");
//     const dispatch = useDispatch();
//
//     if(!token) dispatch(noToken());
//     else {
//         fetch("/v1/profile", {
//             "method": "GET",
//             "headers": {
//                 "Content-Type": "application/json",
//                 "token": token,
//             },
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if(data.result != null){
//                     store.dispatch(loginSuccessful(data.result))
//                 }
//                 else{
//                     localStorage.removeItem("token");
//                     store.dispatch(loginFail(data.msg))
//                 }
//             })
//             .catch(error => store.dispatch(serverDown(error.toString())))
//     }
//
//     return(
//         <></>
//     )
// }





/************ Archive  *******************************/
// const DrawerContent = () => {
//
//     // redux state
//     // const tokenInfo = useSelector(selectTokenInfo);
//     const tokenInfo = store.getState().token;
//     // const tokenInfo = state => state.token;
//     return(
//         (tokenInfo.verification.isEmptyToken)?
//             <LoginAndRegisterInDrawer/>:
//             <ProfileTableInDrawer
//                 user={tokenInfo.userInfo}
//                 changeLogoutStatus={() =>{}}/>
//     )
// }

// const ProfileTableInDrawer = (props) => {
//
//     const logout = () => {
//         localStorage.removeItem("token");
//         props.changeLogoutStatus();
//     }
//
//     const doNothingLikeMe = () => {
//
//     }
//
//     return(
//         <>
//             {
//                 (props.user)?
//                     (
//                         <div className={"d-flex justify-content-center"}>
//                             <div className={"d-flex flex-column"}>
//                                 <FormGroup
//                                     id={"username"}
//                                     inputValue={props.user.username || ""}
//                                     show={"username"}
//                                     type={"text"}
//                                     change={doNothingLikeMe}/>
//                                 <FormGroup
//                                     id={"email"}
//                                     inputValue={props.user.email || ""}
//                                     show={"email"}
//                                     type={"text"}
//                                     change={doNothingLikeMe}/>
//                                 <FormGroup
//                                     id={"role"}
//                                     inputValue={props.user.role || ""}
//                                     show={"role"}
//                                     type={"text"}
//                                     change={doNothingLikeMe}/>
//                                 <button className={"btn btn-primary btn-sm active"}
//                                         onClick={logout}>
//                                     logout
//                                 </button>
//                             </div>
//                         </div>
//                     ):
//                     (<label>there is no information so far!</label>)
//             }
//         </>
//     )
// }
//
// const LoginAndRegisterInDrawer = withRouter((props) => {
//
//     const user = (event) => {
//         event.preventDefault();
//         props.history.push("/user");
//     }
//
//     const register = (event) => {
//         event.preventDefault();
//         props.history.push("/register");
//     }
//
//     return(
//         <div className={"d-flex justify-content-center"}>
//             <div className={"d-flex flex-column"}>
//                 <button className={"btn btn-primary btn-sm active"}
//                         onClick={user}>
//                     user
//                 </button>
//                 {/*<button onClick={user}>user</button>*/}
//                 <br/>
//                 <p>don't have account?
//                     <span
//                         onClick={register}
//                         style={{cursor: "pointer"}}>
//                         register here
//                     </span></p>
//             </div>
//         </div>
//     )
// })


// const VerifyTokenAndGetProfile = (props) => {
//     let token = localStorage.getItem("token");
//     // need to check user's role first
//     fetch("/v1/profile",{
//         "method": "GET",
//         "headers": {
//             "Content-Type": "application/json",
//             "token": token,
//         },
//     })
//         .then(res => res.json())
//         .then(data => {
//             if(data.result === null){
//                 return null;
//             }
//             else if(data.result.role !== "owner"){
//                 this.setState({
//                     firstAuthentication: {isValid: false, errorMsg: "only owner can access"}
//                 })
//             }
//             else{
//                 this.setState({
//                     firstAuthentication: {isValid: true, errorMsg: ""}
//                 })
//             }
//         })
// }

// const HeaderWithDrawer = (props) => {
//
//     const [drawers, setDrawers] = useState({
//         outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
//         button: "false", var1: "false", var2: "true",
//         var3: "bmd-layout-backdrop"
//     })
//
//     const toggle = () => {
//         setDrawers({
//             outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay bmd-drawer-in",
//             button: "", var1: "", var2: "", var3: "bmd-layout-backdrop in"
//         })
//     }
//
//     // side page swipe back
//     const back = () => {
//         setDrawers({
//                 outer: "bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay",
//                 button: "false", var3: "bmd-layout-backdrop"
//             }
//         )
//     }
//
//     return (
//         <div className="d-flex p-2">
//             <div className={drawers.outer}>
//                 <header className="bmd-layout-header">
//                     <nav className="navbar navbar-light"
//                          style={{backgroundColor: "#FFFFFF",
//                              padding: "2px 25px 4px 0"}}>
//                         <button
//                             className="navbar-toggler"
//                             type="button"
//                             style={{border: "0"}}
//                             onClick={toggle}>
//                             <i className="fa fa-bars"></i>
//                         </button>
//                         <div className="nav navbar-nav">
//                             <div className="d-flex">
//                                 {props.buttonSeries}
//                             </div>
//                         </div>
//                     </nav>
//                 </header>
//                 <div id="dw-s2" className="bmd-layout-drawer bg-faded">
//                     <header>
//                         <div className="navbar-brand">{props.drawerTitle}</div>
//                     </header>
//                     <div>
//                         {props.drawerContent}
//                     </div>
//                 </div>
//                 <div style={{paddingBottom: "10px"}}></div>
//                 <div style={{backgroundColor: "white", minHeight: "700px"}}>
//                     {props.pageContent}
//                 </div>
//                 <div style={{paddingBottom: "10px"}}></div>
//                 <div className={drawers.var3}
//                      onClick={back} />
//             </div>
//         </div>
//     )
// }

export {
    ShopCard,
    DishCard,
    ShopManageCollapse,
    DishManageCollapse,
    OrderManageCollapse,
    // CheckTokenInFirstLoad,
    FormGroup,
    CheckBox,
    AlertText,
    ArrayTags,
    SmallArrayTags,
    ArrayInputTags,
    CartDropdown,
    Dropdown,
    NoPermissionPage,
    LoadingDataPage,
    ErrorFromServer,
};