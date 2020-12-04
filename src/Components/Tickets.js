import { Component } from 'react';
import swal from "sweetalert";
import firebase from "../firebase";
import EachTicket from "./EachTicket";

// this is the history of all ticket logs in the database. Tickets component gets the values from firebase database and renders them onto the screen when the user hits the 'Tickets' navigation link!
class Tickets extends Component {
  constructor() {
    super();
    this.state = {
      tickets: []
    };
  }

  // this is where we listen to firebase and extract all the values in a formatted array of objects along with the firebase generated unique IDs.
  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (data) => {
      const firebaseDataObj = data.val();

      let ticketsArray = [];

      for (let ticketKey in firebaseDataObj) {
        const propertyVal = firebaseDataObj[ticketKey];

        const formattedObj = {
          id: ticketKey,
          name: propertyVal.name,
          description: propertyVal.description,
          priority: propertyVal.priority,
          date: propertyVal.date,
        };

        ticketsArray.push(formattedObj);
      }

      // if the data is empty, simply alert the user so their not confused and wondering off into the space
      if (ticketsArray.length === 0) {
        swal(
          {
            title: "Empty Dataset",
            text: "There are currently no tickets in our system",
            icon: "warning",
            dangerMode: true,
          }
        );
      }

      this.setState({
        tickets: ticketsArray,
      });
    });
  }

  // create a nice formatted table with 5 columns and output all the tickets by mapping through the ticketsArray
  render() {
    return (
      <section>
        <h2>Ticket Logs</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Requester</th>
              <th scope="col">Description</th>
              <th scope="col">Priority</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tickets.map((ticket) => {
              return <EachTicket ticket={ticket} key={ticket.id} />
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Tickets;