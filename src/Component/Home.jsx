import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {
    ShopCard,
    LoadingDataPage,
    NoPermissionPage,
    // CheckTokenInFirstLoad,
} from "./Widgets";
import HeaderAndDrawer from "./HeaderAndDrawer";
import {connect} from "react-redux";
import {listShop, listShopUnderOwner} from "../Services/shop";
import {resetServer} from "../Redux/server/actionCreator";
import {listAllShops} from "../Redux/shop/actionCreator"
import {loadPage} from "../Support/supportFunctions";


class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            errorsFromServer: {isValid: true, message: ""},
        };
    }

    mainContent = () => {
        if(this.props.server.isLoading){
            return (
                <LoadingDataPage message={"the page is loading..."}/>
            )
        }
        else if(this.props.server.errorsFromServer.isValid){
            return(
                <div className="homepage-container">
                    {
                        (this.props.server.mainContent || []).map((shop, i) => (
                                <ShopCard
                                    key={i}
                                    shopId={shop.id}
                                    src={shop.imgUrl}
                                    alt={shop.name + " picture"}
                                    shopName={shop.shopName}
                                    categoriesList={shop.categories}/>
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
        let buttonArray = []
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("owner")){
            buttonArray.push(
                <button
                    key={"owner"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {this.props.history.push("/manage/shops")}}>
                    manage my shop
                </button>
            )
        }
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("customer")){
            buttonArray.push(
                <button
                    key={"customer"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {
                        this.props.resetServer();
                        this.props.history.push(`/orders`)
                    }}
                >
                    history orders
                </button>
            )
        }
        return buttonArray;
    }

    render(){
        return(
            <div>
                <HeaderAndDrawer
                    mainContent={this.mainContent()}
                    buttonSeries={this.buttonSeries()}
                />
            </div>

        )
    }

    componentDidMount() {

        // this.props.resetServer();
        loadPage(listShop());
        // this.setState({
        //     isLoading: true,
        // });
        // listShop()
        //     .then(res => {
        //     if(res.result != null){
        //         this.props.listAllShops(res.result);
        //         this.setState({
        //             isLoading: false,
        //             errorsFromServer: {
        //                 isValid: true,
        //                 message: res.msg,
        //             }
        //         })
        //     }
        //     else{
        //         this.setState({
        //             isLoading: false,
        //             errorsFromServer: {
        //                 isValid: false,
        //                 message: res.msg,
        //             }
        //         })
        //     }
        // })
        //     .catch(res => {
        //         this.setState({
        //             isLoading: false,
        //             errorsFromServer: {
        //                 isValid: false,
        //                 message: res.msg,
        //             }
        //         })
        //     })
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        server: state.server,
        currentUser: state.user.profile,
    }
}

const mapDispatchToProps = {
    // listAllShops,
    resetServer,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Home));
