import { Component } from "react";
import Ticket from "./Ticket";
import firebase from "./firebase";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tickets: [],
      ticketRequester: "",
      ticketDescription: "",
      ticketPriority: "",
      ticketDate: "",
    };
  }

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

      console.log(ticketsArray);

      this.setState({
        tickets: ticketsArray,
      });
    });
  }

  onChangeTicketRequester = (event) => {
    this.setState({
      ticketRequester: event.target.value,
    });
  };

  onChangeTicketDescription = (event) => {
    this.setState({
      ticketDescription: event.target.value,
    });
  };

  onChangeTicketPriority = (event) => {
    this.setState({
      ticketPriority: event.target.value,
    });
  };

  onSubmitTimestamp () {
    let timestamp = new Date();
    let formatDate = [];

    let month = timestamp.getMonth() + 1;
    let day = timestamp.getDate();
    let year = timestamp.getFullYear();
    let hour = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    let seconds = timestamp.getSeconds();

    formatDate = [month, "/", day, "/", year, " ", hour, ":", minutes, ":", seconds];
    console.log(formatDate);

    this.state.ticketDate = formatDate;

    this.setState({
      ticketDate: formatDate,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();

    this.onSubmitTimestamp();

    const rawObj = {
      name: this.state.ticketRequester,
      description: this.state.ticketDescription,
      priority: this.state.ticketPriority,
      date: this.state.ticketDate,
    };

    console.log(rawObj);

    dbRef.push(rawObj);

    this.setState({
      ticketRequester: "",
      ticketDescription: "",
      ticketPriority: "",
      ticketDate: "",
    });
  };

  render() {
    console.log("render method put some crap here");
    return (
      <div className="App wrapper">
        <h1>Create New Ticket Request</h1>

        <table className="rwd-table">
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
              return <Ticket ticket={ticket} key={ticket.id} />;
            })}
          </tbody>
        </table>

        <form action="">
          <label htmlFor="newRequester">Requester: </label>
          <input
            type="text"
            id="newRequester"
            onChange={this.onChangeTicketRequester}
            value={this.state.ticketRequester}
          />
          <label htmlFor="newDescription">Description: </label>
          <input
            type="text"
            id="newDescription"
            onChange={this.onChangeTicketDescription}
            value={this.state.ticketDescription}
          />
          <label htmlFor="newPriorityLow">Low</label>
          <input
            type="radio"
            id="newPriorityLow"
            value="Low"
            onChange={this.onChangeTicketPriority}
            checked={this.state.ticketPriority === "Low"}
          />
          <label htmlFor="newPriorityMedium">Medium</label>
          <input
            type="radio"
            id="newPriorityMedium"
            value="Medium"
            onChange={this.onChangeTicketPriority}
            checked={this.state.ticketPriority === "Medium"}
          />
          <label htmlFor="newPriorityHigh">High</label>
          <input
            type="radio"
            id="newPriorityHigh"
            value="High"
            onChange={this.onChangeTicketPriority}
            checked={this.state.ticketPriority === "High"}
          />
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
