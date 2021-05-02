import { Route } from "react-router-dom";

import { getAccountId } from "./cookies.js";

export default function PublicRoute(props) {
    return (
        <Route path={props.path} exact={props.exact}>
            {<props.component account_id={getAccountId()} {...props.componentProps} />}
        </Route>
    );
}