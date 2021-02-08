import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import ShopManageCollapse from "./ShopManageCollapse";


class ShopList extends Component{

    render() {
        return(
            <ShopManageCollapse shop={
                {
                    _id: "601c156378f2d00c8be821e7",
                    name: "MacDonald's kitchen",
                    desc: "fast food",
                    imgUrl: "https://jupiterlsy.s3.ca-central-1.amazonaws.com/jj",
                    categories: ["dine in", "take away"],
                    owners: ["tom", "jerry"],
                    address: {city: "ottawa", country:"canada", street:"baseline"},
                }

            }/>
        )
    }
}

export default withRouter(ShopList);