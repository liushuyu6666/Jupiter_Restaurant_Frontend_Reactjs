import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import {Accordion} from "react-bootstrap";
import {connect} from "react-redux";
import {loadPage} from "../Support/supportFunctions";
import {
    ShopManageCollapse,
    // CheckTokenInFirstLoad,
    NoPermissionPage,
    LoadingDataPage, ShopCard,
} from "./Widgets";
import HeaderAndDrawer from "./HeaderAndDrawer";
import {listShopUnderOwner} from "../Services/shop";
import {resetServer} from "../Redux/server/actionCreator";
import {deleteProfile} from "../Redux/user/actionCreator";


class ShopsManage extends Component{

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
                <Accordion className={"shopListPage-container"}>
                    <div className={"shopListPage-collapse"}>
                        {
                            (this.props.server.mainContent || []).map((item, i) => (
                                <ShopManageCollapse
                                    key={i + 1}
                                    shop={
                                        {
                                            id: item.id,
                                            ownerId: item.ownerId,
                                            shopName: item.shopName,
                                            desc: item.desc,
                                            imgUrl: item.imgUrl,
                                            categories: item.categories,
                                            address: item.address,
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
                        this.props.history.push("/add/shops")
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
                        this.props.history.push("/");
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

        loadPage(listShopUnderOwner(localStorage.getItem("Authorization")));
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
)(withRouter(ShopsManage));