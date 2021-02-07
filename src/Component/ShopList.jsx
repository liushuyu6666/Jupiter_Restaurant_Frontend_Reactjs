import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import {CollapseElement} from "./Widgets";


class ShopList extends Component{

    render() {
        return(
            <CollapseElement />
        )
    }
}

export default withRouter(ShopList);