import AcceptInvite from "./components/AcceptInvite";
import MainApp from "./components/MainApp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/invite/accept">
          <AcceptInvite />
        </Route>
        <Route>
          <MainApp />
        </Route>
      </Switch>
    </Router>
  );
}
