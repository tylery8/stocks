import { Route, Redirect } from "react-router-dom";

import { getAccountId } from "./cookies.js";

export default function PrivateRoute(props) {
    return (
        <Route path={props.path} exact={props.exact}>
            {(!!getAccountId()) ? <props.component account_id={getAccountId()} {...props.componentProps} /> : <Redirect to="/login" />}
        </Route>
    );
}