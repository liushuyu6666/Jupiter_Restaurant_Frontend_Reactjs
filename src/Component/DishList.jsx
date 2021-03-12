// import React, {Component} from "react/";
// import {withRouter} from "react-router-dom";
// import { Accordion, Card, Button } from "react-bootstrap";
// import ShopManageCollapse from "./ShopManageCollapse";
// import ShopCard, {HeaderWithDrawer, LoginAndRegisterInDrawer, NoPermissionPage, ProfileTableInDrawer} from "./Widgets";
//
//
// class DishList extends Component{
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             firstAuthorization: {errorMsg: "", isValid: true},
//             userInfo: {},
//             dishesList: [],
//         }
//     }
//
//     // layout
//     mainContent = () => {
//         return(
//             <Accordion className={"dishListPage-container"}>
//                 <div className={"dishListPage-collapse"}>
//                     { <label>this is main content</label>
//                         // (this.state.shopsList || []).map((item, i) => (
//                         //     <DishManageCollapse
//                         //         uniqueKey={i+1}
//                         //         shop={
//                         //             {
//                         //                 _id: item._id,
//                         //                 name: item.name,
//                         //                 desc: item.desc,
//                         //                 imgUrl: item.imgUrl,
//                         //                 categories: item.categories,
//                         //                 owners: item.owners,
//                         //                 address: item.address,
//                         //             }
//                         //         }
//                         //         eventKey={i+1}
//                         //     />
//                         // ))
//                     }
//                 </div>
//             </Accordion>
//         )
//     }
//
//     // layout
//     buttonSeries = () => {
//         return(
//             <button className={"btn btn-primary btn-sm active"}
//                     onClick={() => {this.props.history.push("/shops/list")}}>
//                 back to shop
//             </button>
//         )
//     }
//
//     // layout
//     drawerContent = () => {
//         return(
//             <ProfileTableInDrawer
//                 user={this.state.userInfo}
//                 changeLogoutStatus={this.logoutStatus}/>
//         )
//     }
//
//     logoutStatus = () => {
//         localStorage.removeItem("token");
//         this.setState({
//             userInfo: {}
//         })
//         this.props.history.push("/")
//     }
//
//     render() {
//         return(
//             // !this.state.firstAuthorization.isValid?
//             true?
//                 (<NoPermissionPage message={this.state.firstAuthorization.errorMsg}/>):
//                 (
//                     <HeaderWithDrawer
//                         pageContent={this.mainContent()}
//                         buttonSeries={this.buttonSeries()}
//                         drawerTitle={"owner info"}
//                         // drawerContent={this.drawerContent()}
//                     />
//
//                 )
//         )
//     }
//
//     componentDidMount() {
//         // verify token and check role
//         const token = localStorage.getItem("token");
//         if(!token){
//             this.setState({
//                 firstAuthorization: {errorMsg: "user first please", isValid: false},
//             })
//         }
//         else{
//             fetch("/v1/profile",{
//                 "method": "GET",
//                 "headers": {
//                     "Content-Type": "application/json",
//                     "token": token
//                 },
//             })
//             .then(res => res.json())
//             .then(data => {
//                 // no token
//                 if(data.result == null){
//                     localStorage.removeItem("token");
//                     this.setState({
//                         firstAuthorization: {isValid: false, errorMsg: data.msg}
//                     })
//                 }
//                 // role is not owner
//                 else if(data.result.role !== "owner"){
//                     this.setState({
//                         firstAuthorization: {isValid: false, errorMsg: "only owner can access"}
//                     })
//                 }
//                 // token is right, authorization pass and fetch shop data
//                 else{
//                     this.setState({
//                         userInfo: data.result,
//                     });
//                     fetch("/v1/shops", {
//                         "method": "GET",
//                         "headers": {
//                             "Content-Type": "application/json",
//                             "token": token,
//                         }
//                     })
//                     .then(res => res.json())
//                     .then(data => {
//                         if(data.result == null){
//                             this.setState({
//                                 firstAuthorization: {
//                                     isValid: false,
//                                     errorMsg: data.msg,
//                                 }
//                             })
//                         }
//                         else{
//                             let shop = [];
//                             data.result.forEach((item, i) => {
//                                 shop.push(item);
//                             });
//                             this.setState({
//                                 shopsList: shop,
//                                 firstAuthorization: {
//                                     isValid: true,
//                                     errorMsg: "",
//                                 },
//                             })
//                         }
//                     })
//                     .catch(err => {
//                         this.setState({
//                             firstAuthorization: {
//                                 isValid: false,
//                                 errorMsg: err.error,
//                             }
//                         })
//                     })
//                 }
//             })
//         }
//     }
// }
//
// export default withRouter(DishList);