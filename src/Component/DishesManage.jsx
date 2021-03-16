import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import {Accordion} from "react-bootstrap";
import {connect} from "react-redux";
import {loadPage} from "../Support/supportFunctions";
import {
    ShopManageCollapse,
    // CheckTokenInFirstLoad,
    NoPermissionPage,
    LoadingDataPage, ShopCard, DishManageCollapse,
} from "./Widgets";
import HeaderAndDrawer from "./HeaderAndDrawer";
import {listShopUnderOwner} from "../Services/shop";
import {resetServer} from "../Redux/server/actionCreator";
import {deleteProfile} from "../Redux/user/actionCreator";
import {listDishesUnderOwner} from "../Services/dish";


class DishesManage extends Component{

    constructor(props) {
        super(props);
    }

    // layout
    mainContent = () => {

        if(this.props.server.isLoading){
            return (
                <LoadingDataPage message={"the page is loading..."}/>
            )
        }
        else if(this.props.server.errorsFromServer.isValid){
            return(
                <Accordion className={"dishListPage-container"}>
                    <div className={"dishListPage-collapse"}>
                        {
                            (this.props.server.mainContent || []).map((item, i) => (
                                <DishManageCollapse
                                    key={i + 1}
                                    dish={
                                        {
                                            dishId: item.id,
                                            shopId: item.shopId,
                                            ownerId: item.ownerId,
                                            dishName: item.name,
                                            desc: item.desc,
                                            imgUrl: item.imgUrl,
                                            categories: item.categories,
                                            price: item.price,
                                            createAt: item.createAt,
                                            updateAt: item.modifiedAt,
                                        }
                                    }
                                    eventKey={i+1}
                                />
                            ))
                        }
                    </div>
                </Accordion>
            )
        }
        else{
            return(
                <NoPermissionPage message={"something wrong from server"}/>
            )
        }

    }

    // layout
    buttonSeries = () => {
        let buttonArray = []
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("owner")){
            buttonArray.push(
                <button
                    key={"save"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {
                        resetServer();
                        this.props.history.push(`/add/shops/${this.props.match.params.shopId}/dishes`)
                    }}>
                    add
                </button>
            )
        }
        if(JSON.stringify(this.props.currentUser) !== "{}"){
            buttonArray.push(
                <button
                    key={"back"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {
                        this.props.resetServer();
                        this.props.history.push("/manage/shops");
                    }}>
                    back
                </button>
            )
        }
        if(JSON.stringify(this.props.currentUser) === "{}"){
            buttonArray.push(
                <button
                    key={"back"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {
                        this.props.resetServer();
                        this.props.deleteProfile();
                        this.props.history.push("/");
                    }}>
                    back to home
                </button>
            )
        }
        return buttonArray;
    }

    render() {
        return (
            <div>
                <HeaderAndDrawer
                    mainContent={this.mainContent()}
                    buttonSeries={this.buttonSeries()}/>
            </div>
        )
    }

    componentDidMount() {
        loadPage(listDishesUnderOwner(
            this.props.match.params.shopId,
            localStorage.getItem("Authorization")
        ));
    }
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
        currentUser: state.user.profile,
    }
}

const mapDispatchToProps = {
    resetServer,
    deleteProfile,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(DishesManage));