import { Component } from "react";
import swal from "sweetalert";
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

      if (ticketsArray.length === 0) {
        // how do i write some JSX here ie. append <p> to say "Congrats! You're on a roll, no ticket enquiries to deal with!"

        alert("empty page");
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

  onSubmitTimestamp() {
    let timestamp = new Date();
    let formatDate = [];

    let month = timestamp.getMonth() + 1;
    let day = timestamp.getDate();
    let year = timestamp.getFullYear();
    let hour = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    let seconds = timestamp.getSeconds();

    formatDate = [
      month,
      "/",
      day,
      "/",
      year,
      " ",
      hour,
      ":",
      minutes,
      ":",
      seconds,
    ];
    console.log(formatDate);

    this.state.ticketDate = formatDate;

    this.setState({
      ticketDate: formatDate,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    swal({
      title: "Submit Ticket Request?",
      text:
        "Once you hit yes, you will NOT be able to go back and make any changes!",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const dbRef = firebase.database().ref();

        this.onSubmitTimestamp();

        const rawObj = {
          name: this.state.ticketRequester,
          description: this.state.ticketDescription,
          priority: this.state.ticketPriority,
          date: this.state.ticketDate,
        };
        
        dbRef.push(rawObj);

        swal(`Thank you ${rawObj.name}! Your request has been saved and someone will reach out to you in 24 hours.`, {
          icon: "success",
          buttons: false,
          timer: 2500,
        });

        this.setState({
          ticketRequester: "",
          ticketDescription: "",
          ticketPriority: "",
          ticketDate: "",
        });

      } else {
        swal(`No worries ${this.state.ticketRequester}, submit when your ready!`,
          {
            buttons: false,
            timer: 2000,
          }
        );
      }
    });

  };

  render() {
    console.log("render method put some crap here");
    return (
      <div className="App wrapper">
        <h1>Create New Ticket Request</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="newRequester">Requester: </label>
          <input
            type="text"
            id="newRequester"
            onChange={this.onChangeTicketRequester}
            value={this.state.ticketRequester}
          />
          <label htmlFor="newDescription">Description: </label>
          <textarea
            name="newDescription"
            rows="4"
            id="newDescription"
            onChange={this.onChangeTicketDescription}
            value={this.state.ticketDescription}
          ></textarea>
          <div className="priority-container">
            <p>Priority</p>
            <div className="priority-items">
              <input
                type="radio"
                id="newPriorityLow"
                value="Low"
                onChange={this.onChangeTicketPriority}
                checked={this.state.ticketPriority === "Low"}
              />
              <label htmlFor="newPriorityLow">Low</label>
              <input
                type="radio"
                id="newPriorityMedium"
                value="Medium"
                onChange={this.onChangeTicketPriority}
                checked={this.state.ticketPriority === "Medium"}
              />
              <label htmlFor="newPriorityMedium">Medium</label>
              <input
                type="radio"
                id="newPriorityHigh"
                value="High"
                onChange={this.onChangeTicketPriority}
                checked={this.state.ticketPriority === "High"}
              />
              <label htmlFor="newPriorityHigh">High</label>
            </div>
          </div>

          <button>Submit</button>
        </form>

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
      </div>
    );
  }
}

export default App;
