const React = require("react");
const Router = require("react-router");
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;
const Redirect = Router.Redirect;

// polyfill
if(!Object.assign)
	Object.assign = React.__spread;

// export routes
module.exports = (
    <Route>
        <Route name="app" path="/" handler={require("./components/Application")}>
            <Route name="signin" path="/signin" handler={require("react-proxy!./components/Signin")}></Route>
            <Route name="signup" path="/signup" handler={require("react-proxy!./components/Signup")}></Route>
            <Route name="dashboard" path="/dashboard" handler={require("./components/Dashboard")} />
            <Route name="calendar" path="/calendar" handler={require("react-proxy!./components/Calendar")}>
                <Route name="create-event" path="create-event" handler={require("./components/Calendar/CreateEvent")} />
                <Route name="event-list" path="event-list" handler={require("./components/Calendar/EventList")} />
                <DefaultRoute handler={require("./components/Calendar/EventList")} />
            </Route>
            <Redirect from="/" to="/dashboard" />
            <NotFoundRoute handler={require("./components/NotFound")} />
        </Route>
    </Route>
);