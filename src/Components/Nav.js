import { Component, Fragment} from 'react';
import { NavLink } from "react-router-dom";
import logo from "../logo.png";
import Tickets from './Tickets';

// creates the navigation with the Home, Create Tickets, and Tickets page views allowing the user to smoothly navigate between the different pages. 
class Nav extends Component {
  render() {
    return (
        <Fragment>
            <img src={logo} width="100" height="100" alt="Bug Tracking App Logo"/>
            <nav>
                <label htmlFor="toggle"><i className="fa fa-bars"></i> Menu</label>
                <input type="checkbox" id="toggle" name="toggle" />
                <ul className="navList">
                    <li>
                        <NavLink activeClassName="active" exact to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/create">Create Ticket</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/tickets">Tickets</NavLink>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
  }
}

export default Nav;




