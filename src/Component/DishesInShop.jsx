import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {
    CartDropdown,
    DishCard,
    LoadingDataPage,
    NoPermissionPage, ShopCard,
} from "./Widgets";
import {listAllShops} from "../Redux/shop/actionCreator";
import {connect} from "react-redux";
import {listDishesInShop} from "../Services/dish"
import HeaderAndDrawer from "./HeaderAndDrawer";
import {retrieveShop} from "../Services/shop";


class DishesInShop extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dishesList: [],
            isLoading: true,
            errorsFromServer: {
                isValid: true,
                message: "",
            },
            shopName: "",
        }
    }

    mainContent = () => {
        if(this.state.isLoading){
            return (
                <LoadingDataPage message={"the page is loading..."}/>
            )
        }
        else if(this.state.errorsFromServer.isValid){
            return(
                <div className="dishesInShopPage-container">
                    {
                        (this.state.dishesList || []).map((dish, i) => (
                                <DishCard
                                    key={i}
                                    dishId={dish.id}
                                    shopId={dish.shopId}
                                    ownerId={dish.ownerId}
                                    desc={dish.desc}
                                    src={dish.imgUrl}
                                    alt={dish.name + " picture"}
                                    dishName={dish.name}
                                    shopName={this.state.shopName}
                                    price={dish.price}
                                    categoriesList={dish.categories}/>
                            )
                        )
                    }
                </div>
            )
        }
        else{
            return(
                <NoPermissionPage message={"something wrong from server"}/>
            )
        }
    }

    // button series
    buttonSeries = () => {
        let buttonArray = [];
        buttonArray.push(
            <button
                key={"back"}
                className={"btn btn-primary btn-sm active"}
                onClick={() => {this.props.history.push("/")}}>
                back to home
            </button>
        );
        buttonArray.push(
            <CartDropdown
                key={"cart"}
                // cart={this.props.cartItems}
            />
        );
        return buttonArray;
    }

    render(){
        return(
            <HeaderAndDrawer
                mainContent={this.mainContent()}
                buttonSeries={this.buttonSeries()}/>

        )
    }

    componentDidMount() {

        this.setState({
            isLoading: true,
        })

        let shopId = this.props.match.params.shopId;
        retrieveShop(shopId)
            .then(res => {
                if(res.result !== null){
                    this.setState({
                        shopName: res.result.shopName,
                    })
                }
                else{
                    this.setState({
                        isLoading: false,
                        errorsFromServer: {
                            isValid: false,
                            message: res.msg,
                        }
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    errorsFromServer: {
                        isValid: false,
                        message: err.msg,
                    }
                })
            });

        listDishesInShop(shopId)
            .then(res => {
                if(res.result !== null){
                    this.setState({
                        dishesList: res.result,
                        isLoading: false,
                        errorsFromServer: {
                            isValid: true,
                            message: res.msg,
                        }
                    })
                }
                else{
                    this.setState({
                        isLoading: false,
                        errorsFromServer: {
                            isValid: false,
                            message: res.msg,
                        }
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    errorsFromServer: {
                        isValid: false,
                        message: err.msg,
                    }
                })
            });
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        cartItems: state.cart.cartItems,
    }
}

const mapDispatchToProps = {
    listAllShops,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DishesInShop));