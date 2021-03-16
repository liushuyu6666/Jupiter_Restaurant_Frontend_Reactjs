// import React, {Component} from "react/";
// import {withRouter} from "react-router-dom";
// import { Accordion} from "react-bootstrap";
// import {connect} from "react-redux";
//
// import ShopManageCollapse from "./ShopManageCollapse";
// import {
//     // CheckTokenInFirstLoad,
//     NoPermissionPage,
//     LoadingDataPage,
// } from "./Widgets";
// import HeaderAndDrawer from "./HeaderAndDrawer";
//
//
// class ShopList extends Component{
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true,
//             errorsFromServer: {isValid: true, message: ""},
//         }
//     }
//
//     // layout
//     mainContent = () => {
//         // if(!this.state.initialStage){
//         //     if(!this.props.token.verification.isTokenWorks) {
//         //         return (
//         //             <NoPermissionPage
//         //                 message={"token is not valid"}
//         //             />
//         //         )
//         //     }
//         //     else if(!this.state.mainData.isValid) {
//         //         return (
//         //             <NoPermissionPage
//         //                 message={`no data found: ${this.state.mainData.error}`}
//         //             />
//         //         )
//         //     }
//         //     else if(this.props.token.userInfo.role !== "owner") {
//         //         return (
//         //             <NoPermissionPage
//         //                 message={`only owner can access`}
//         //             />
//         //         )
//         //     }
//         //     else {
//         //         return(
//         //             <Accordion className={"shopListPage-container"}>
//         //                 <div className={"shopListPage-collapse"}>
//         //                     {
//         //                         (this.state.mainData.content || []).map((item, i) => (
//         //                             <ShopManageCollapse
//         //                                 key={i + 1}
//         //                                 shop={
//         //                                     {
//         //                                         _id: item._id,
//         //                                         name: item.name,
//         //                                         desc: item.desc,
//         //                                         imgUrl: item.imgUrl,
//         //                                         categories: item.categories,
//         //                                         owners: item.owners,
//         //                                         address: item.address,
//         //                                     }
//         //                                 }
//         //                                 eventKey={i+1}
//         //                             />
//         //                         ))
//         //                     }
//         //                 </div>
//         //             </Accordion>
//         //         )
//         //     }
//         // }
//     }
//
//     // layout
//     buttonSeries = () => {
//         // if(!this.state.initialStage){
//         //     return(
//         //         <button className={"btn btn-primary btn-sm active"}
//         //                 onClick={() => {this.props.history.push("/")}}>
//         //             back to home
//         //         </button>
//         //     )
//         // }
//     }
//
//     render() {
//         return (
//             <div>
//                 <HeaderAndDrawer
//                     mainContent={this.mainContent()}
//                     buttonSeries={this.buttonSeries()}/>
//             </div>
//         )
//     }
//
//     // componentDidUpdate(prevProps, prevState, snapshot) {
//     //     console.log(this.props.token);
//     //     if(this.props.token.verification.isServerWorks){
//     //         if(this.props.token.verification.isTokenWorks){
//     //             if(this.props.token.userInfo.role === "owner"){
//     //                 const token = localStorage.getItem("token");
//     //                 fetch("/v1/shops", {
//     //                     "method": "GET",
//     //                     "headers": {
//     //                         "Content-Type": "application/json",
//     //                         "token": token,
//     //                     }
//     //                 })
//     //                     .then(res => {
//     //                         console.log(res);
//     //                         return res.json()
//     //                     })
//     //                     .then(data => {
//     //                         if(data.result != null){
//     //                             this.setState({
//     //                                 ...this.state,
//     //                                 initialStage: false,
//     //                                 mainData: {
//     //                                     ...this.state.mainData,
//     //                                     isResponse: true,
//     //                                     isValid: true,
//     //                                     error: "",
//     //                                     content: data.result,
//     //                                 }
//     //                             });
//     //                         }
//     //                         else{
//     //                             this.setState({
//     //                                 ...this.state,
//     //                                 initialStage: false,
//     //                                 mainData: {
//     //                                     ...this.state.mainData,
//     //                                     isResponse: true,
//     //                                     isValid: false,
//     //                                     error: data.msg,
//     //                                     content: null,
//     //                                 }
//     //                             });
//     //                         }
//     //                     })
//     //                     .catch(err => {
//     //                         this.setState({
//     //                             ...this.state,
//     //                             initialStage: false,
//     //                             mainData: {
//     //                                 ...this.state.mainData,
//     //                                 isResponse: false,
//     //                                 isValid: false,
//     //                                 error: err.toString(),
//     //                                 content: null,
//     //                             }
//     //                         });
//     //                     })
//     //             }
//     //             // if role !== "owner", mainContent don't need shopList
//     //         }
//     //         // if isTokenWorks = false, mainContent don't need shopList
//     //     }
//     //     else{
//     //         this.setState({
//     //             ...this.state,
//     //             initialStage: false,
//     //         })
//     //     }
//     // }
//
//     componentDidMount() {
//
//         this.setState({
//             isLoading: true,
//         });
//
//
//     //     if(this.props.token.verification.isServerWorks){
//     //         if(this.props.token.verification.isTokenWorks){
//     //             if(this.props.token.userInfo.role === "owner"){
//     //                 const token = localStorage.getItem("token");
//     //                 fetch("/v1/shops", {
//     //                     "method": "GET",
//     //                     "headers": {
//     //                         "Content-Type": "application/json",
//     //                         "token": token,
//     //                     }
//     //                 })
//     //                 .then(res => res.json())
//     //                 .then(data => {
//     //                     if(data.result != null){
//     //                         this.setState({
//     //                             ...this.state,
//     //                             initialStage: false,
//     //                             mainData: {
//     //                                 ...this.state.mainData,
//     //                                 isResponse: true,
//     //                                 isValid: true,
//     //                                 error: "",
//     //                                 content: data.result,
//     //                             }
//     //                         });
//     //                     }
//     //                     else{
//     //                         this.setState({
//     //                             ...this.state,
//     //                             initialStage: false,
//     //                             mainData: {
//     //                                 ...this.state.mainData,
//     //                                 isResponse: true,
//     //                                 isValid: false,
//     //                                 error: data.msg,
//     //                                 content: null,
//     //                             }
//     //                         });
//     //                     }
//     //                 })
//     //                 .catch(err => {
//     //                     this.setState({
//     //                         ...this.state,
//     //                         initialStage: false,
//     //                         mainData: {
//     //                             ...this.state.mainData,
//     //                             isResponse: false,
//     //                             isValid: false,
//     //                             error: err.toString(),
//     //                             content: null,
//     //                         }
//     //                     });
//     //                 })
//     //             }
//     //             // if role !== "owner", mainContent don't need shopList
//     //         }
//     //         // if isTokenWorks = false, mainContent don't need shopList
//     //     }
//     //     else{
//     //         this.setState({
//     //             ...this.state,
//     //             initialStage: false,
//     //         })
//     //     }
//     }
// }
//
// function mapStateToProps(state){
//     return {
//         token: state.token,
//     }
// }
//
// export default connect(mapStateToProps)(withRouter(ShopList));