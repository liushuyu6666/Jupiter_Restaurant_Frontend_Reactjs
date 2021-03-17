import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import {Accordion} from "react-bootstrap";
import {connect} from "react-redux";
import {loadPage} from "../Support/supportFunctions";
import {
    OrderManageCollapse,
    // CheckTokenInFirstLoad,
    NoPermissionPage,
    LoadingDataPage, ShopCard, DishManageCollapse,
} from "./Widgets";
import HeaderAndDrawer from "./HeaderAndDrawer";
import {listOrders} from "../Services/order";
import {resetServer} from "../Redux/server/actionCreator";
import {deleteProfile} from "../Redux/user/actionCreator";



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
                <Accordion className={"orderListPage-container"}>
                    <div className={"orderListPage-collapse"}>
                        {
                            (this.props.server.mainContent || []).map((item, i) => (
                                <OrderManageCollapse
                                    key={i + 1}
                                    order={
                                        {
                                            orderId: item.id,
                                            userId: item.userId,
                                            dishDetails: item.dishDetails,
                                            createAt: item.createAt,

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
        buttonArray.push(
            <button
                key={"back"}
                className={"btn btn-primary btn-sm active"}
                onClick={() => {
                    this.props.resetServer();
                    this.props.history.push("/");
                }}>
                back to home
            </button>
        )
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
        loadPage(listOrders(
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