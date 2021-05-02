import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import PublicRoute from "./browser/PublicRoute";
import PrivateRoute from "./browser/PrivateRoute";

import ExplorePage from "./pages/ExplorePage";
import WatchlistPage from "./pages/WatchlistPage";
import LoginPage from "./pages/LoginPage";
import PortfolioPage from "./pages/PortfolioPage";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={ExplorePage} />
        <PrivateRoute exact path="/watchlist" component={WatchlistPage} />
        <PrivateRoute exact path="/portfolio" component={PortfolioPage} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
