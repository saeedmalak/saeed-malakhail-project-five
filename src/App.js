import { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import CreateTicket from "./Components/CreateTicket";
import Tickets from "./Components/Tickets";
import "./App.css";

// create three main route components: Home View, Create A Ticket View, and the Tickets View Pages
class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <header className="wrapper">
            <Nav />
          </header>
          <main className="wrapper">
            <Route exact path="/" component={Home} />
            <Route path="/create" component={CreateTicket} />
            <Route path="/tickets" component={Tickets} />
          </main>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;
