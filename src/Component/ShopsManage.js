import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import { Accordion} from "react-bootstrap";
import {connect} from "react-redux";
// import {loaded, loading, setServerError, setMainContent} from "../Redux/server/actionCreator";
import {loadPage} from "../Support/supportFunctions";

import ShopManageCollapse from "./ShopManageCollapse";
import {
    // CheckTokenInFirstLoad,
    NoPermissionPage,
    LoadingDataPage, ShopCard,
} from "./Widgets";
import HeaderAndDrawer from "./HeaderAndDrawer";
import {listShopUnderOwner} from "../Services/shop";


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
        // if(!this.state.initialStage){
        //     if(!this.props.token.verification.isTokenWorks) {
        //         return (
        //             <NoPermissionPage
        //                 message={"token is not valid"}
        //             />
        //         )
        //     }
        //     else if(!this.state.mainData.isValid) {
        //         return (
        //             <NoPermissionPage
        //                 message={`no data found: ${this.state.mainData.error}`}
        //             />
        //         )
        //     }
        //     else if(this.props.token.userInfo.role !== "owner") {
        //         return (
        //             <NoPermissionPage
        //                 message={`only owner can access`}
        //             />
        //         )
        //     }
        //     else {
        //         return(
        //             <Accordion className={"shopListPage-container"}>
        //                 <div className={"shopListPage-collapse"}>
        //                     {
        //                         (this.state.mainData.content || []).map((item, i) => (
        //                             <ShopManageCollapse
        //                                 key={i + 1}
        //                                 shop={
        //                                     {
        //                                         _id: item._id,
        //                                         name: item.name,
        //                                         desc: item.desc,
        //                                         imgUrl: item.imgUrl,
        //                                         categories: item.categories,
        //                                         owners: item.owners,
        //                                         address: item.address,
        //                                     }
        //                                 }
        //                                 eventKey={i+1}
        //                             />
        //                         ))
        //                     }
        //                 </div>
        //             </Accordion>
        //         )
        //     }
        // }
    }

    // layout
    buttonSeries = () => {
        // if(!this.state.initialStage){
        //     return(
        //         <button className={"btn btn-primary btn-sm active"}
        //                 onClick={() => {this.props.history.push("/")}}>
        //             back to home
        //         </button>
        //     )
        // }
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

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log(this.props.token);
    //     if(this.props.token.verification.isServerWorks){
    //         if(this.props.token.verification.isTokenWorks){
    //             if(this.props.token.userInfo.role === "owner"){
    //                 const token = localStorage.getItem("token");
    //                 fetch("/v1/shops", {
    //                     "method": "GET",
    //                     "headers": {
    //                         "Content-Type": "application/json",
    //                         "token": token,
    //                     }
    //                 })
    //                     .then(res => {
    //                         console.log(res);
    //                         return res.json()
    //                     })
    //                     .then(data => {
    //                         if(data.result != null){
    //                             this.setState({
    //                                 ...this.state,
    //                                 initialStage: false,
    //                                 mainData: {
    //                                     ...this.state.mainData,
    //                                     isResponse: true,
    //                                     isValid: true,
    //                                     error: "",
    //                                     content: data.result,
    //                                 }
    //                             });
    //                         }
    //                         else{
    //                             this.setState({
    //                                 ...this.state,
    //                                 initialStage: false,
    //                                 mainData: {
    //                                     ...this.state.mainData,
    //                                     isResponse: true,
    //                                     isValid: false,
    //                                     error: data.msg,
    //                                     content: null,
    //                                 }
    //                             });
    //                         }
    //                     })
    //                     .catch(err => {
    //                         this.setState({
    //                             ...this.state,
    //                             initialStage: false,
    //                             mainData: {
    //                                 ...this.state.mainData,
    //                                 isResponse: false,
    //                                 isValid: false,
    //                                 error: err.toString(),
    //                                 content: null,
    //                             }
    //                         });
    //                     })
    //             }
    //             // if role !== "owner", mainContent don't need shopList
    //         }
    //         // if isTokenWorks = false, mainContent don't need shopList
    //     }
    //     else{
    //         this.setState({
    //             ...this.state,
    //             initialStage: false,
    //         })
    //     }
    // }

    componentDidMount() {

        loadPage(listShopUnderOwner(localStorage.getItem("Authorization")));
        // this.props.loading();
        // listShopUnderOwner(localStorage.getItem("Authorization"))
        //     .then(res => {
        //         if(res.result != null){
        //             console.log(res.result);
        //             this.props.setMainContent(res.result);
        //             this.props.loaded();
        //             this.props.setServerError({
        //                 isValid: true,
        //                 message: res.msg,
        //             })
        //             // this.props.listAllShops(res.result);
        //             // this.setState({
        //             //     isLoading: false,
        //             //     errorsFromServer: {
        //             //         isValid: true,
        //             //         message: res.msg,
        //             //     }
        //             // })
        //         }
        //         else{
        //             this.props.loaded();
        //             this.props.setServerError({
        //                 isValid: false,
        //                 message: res.msg,
        //             })
        //         }
        //     })
        //     .catch(res => {
        //         this.props.loaded();
        //         this.props.setServerError({
        //             isValid: false,
        //             message: res.msg,
        //         })
        //     })


        //     if(this.props.token.verification.isServerWorks){
        //         if(this.props.token.verification.isTokenWorks){
        //             if(this.props.token.userInfo.role === "owner"){
        //                 const token = localStorage.getItem("token");
        //                 fetch("/v1/shops", {
        //                     "method": "GET",
        //                     "headers": {
        //                         "Content-Type": "application/json",
        //                         "token": token,
        //                     }
        //                 })
        //                 .then(res => res.json())
        //                 .then(data => {
        //                     if(data.result != null){
        //                         this.setState({
        //                             ...this.state,
        //                             initialStage: false,
        //                             mainData: {
        //                                 ...this.state.mainData,
        //                                 isResponse: true,
        //                                 isValid: true,
        //                                 error: "",
        //                                 content: data.result,
        //                             }
        //                         });
        //                     }
        //                     else{
        //                         this.setState({
        //                             ...this.state,
        //                             initialStage: false,
        //                             mainData: {
        //                                 ...this.state.mainData,
        //                                 isResponse: true,
        //                                 isValid: false,
        //                                 error: data.msg,
        //                                 content: null,
        //                             }
        //                         });
        //                     }
        //                 })
        //                 .catch(err => {
        //                     this.setState({
        //                         ...this.state,
        //                         initialStage: false,
        //                         mainData: {
        //                             ...this.state.mainData,
        //                             isResponse: false,
        //                             isValid: false,
        //                             error: err.toString(),
        //                             content: null,
        //                         }
        //                     });
        //                 })
        //             }
        //             // if role !== "owner", mainContent don't need shopList
        //         }
        //         // if isTokenWorks = false, mainContent don't need shopList
        //     }
        //     else{
        //         this.setState({
        //             ...this.state,
        //             initialStage: false,
        //         })
        //     }
    }
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(ShopsManage));