import { Component } from 'react';
import Ticket from './Ticket';
import firebase from './firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tickets: [],
      ticketRequester: "",
      ticketSubject: "",
      ticketDescription: "",
      ticketPriority: "",
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
          subject: propertyVal.subject,
          description: propertyVal.description,
          priority: propertyVal.priority,
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

  onChangeTicketSubject = (event) => {
    this.setState({
      ticketSubject: event.target.value,
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

  onSubmit = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();

    const rawObj = {
      name: this.state.ticketRequester,
      subject: this.state.ticketSubject,
      description: this.state.ticketDescription,
      priority: this.state.ticketPriority,
    };

    dbRef.push(rawObj);

    this.setState({
      ticketRequester: "",
      ticketSubject: "",
      ticketDescription: "",
      ticketPriority: "",
    });
  };

  onDelete = (ticketId) => {
    const dbRef = firebase.database().ref();
    dbRef.child(ticketId).remove();
  };

  render() {
    console.log("render method put some crap here");
    return (
      <div className="App">
        <h1>Create New Ticket Request</h1>

        <table className='rwd-table'>
          <thead>
            <tr>
              <th scope="col">Requester</th>
              <th scope="col">Subject</th>
              <th scope="col">Description</th>
              <th scope="col">Priority</th>
              <th scope="col">Completed</th>
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
          <label htmlFor="newSubject">Subject: </label>
          <input
            type="text"
            id="newSubject"
            onChange={this.onChangeTicketSubject}
            value={this.state.ticketSubject}
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
