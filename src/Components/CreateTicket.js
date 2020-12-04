import { Component } from 'react';
import swal from "sweetalert";
import firebase from "../firebase";

// this is the 'Create A Ticket' View component page where the user can input their name, description and select a priority level. Submit the form when completed and the info. will be stored in the firebase real-time database!
class CreateTicket extends Component {
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

  // listen to any changes made within the 'requester' input
  onChangeTicketRequester = (event) => {
    this.setState({
      ticketRequester: event.target.value,
    });
  };

  // listen to any changes made within the 'description' input
  onChangeTicketDescription = (event) => {
    this.setState({
      ticketDescription: event.target.value,
    });
  };

  // listen to changes made to all three radio buttons
  onChangeTicketPriority = (event) => {
    this.setState({
      ticketPriority: event.target.value,
    });
  };

   // gets the current date and will call this function in the 'onSubmit' when the user hits the submit button!
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
      month,"/", day,"/", year," ", hour,":", minutes,":", seconds,];

    this.setState({
      ticketDate: formatDate,
    });
  }

   // submit the form with all the data and send it to firebase database 
  onSubmit = (event) => {
    event.preventDefault();

    // use sweetalerts library to alert the user asking for a final confirmation. either 'yes' or 'no'. If the user is not ready, they can simply hit cancel or click anywhere else and go back to the form and make any changes. 
    swal({
      title: "Submit Ticket Request?",
      text:
        "Once you hit yes, you will NOT be able to go back and make any changes!",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    }).then((pushToDatabase) => {
      if (pushToDatabase) {
        const dbRef = firebase.database().ref();

        this.onSubmitTimestamp();

        const rawObj = {
          name: this.state.ticketRequester,
          description: this.state.ticketDescription,
          priority: this.state.ticketPriority,
          date: this.state.ticketDate,
        };

        dbRef.push(rawObj);

        swal(
          `Thank you ${rawObj.name}! Your request has been saved and someone will reach out to you in 24 hours.`,
          {
            icon: "success",
            buttons: false,
            timer: 2500,
          }
        );

        this.setState({
          ticketRequester: "",
          ticketDescription: "",
          ticketPriority: "",
          ticketDate: "",
        });
      } else {
        swal(
          `No worries ${this.state.ticketRequester}, submit when your ready!`,
          {
            buttons: false,
            timer: 2000,
          }
        );
      }
    });
  };

  // render the form with 2 inputs, radio buttons and a submit button 
  render() {
    return (
      <section>
        <h2>Create A Ticket</h2>
        <form onSubmit={this.onSubmit}>

          <label htmlFor="newRequester">Requester: </label>
          <label className="srOnly">Enter the ticket requester's name here</label>
          <input
            type="text"
            id="newRequester"
            required
            onChange={this.onChangeTicketRequester}
            value={this.state.ticketRequester}/>

          <label htmlFor="newDescription">Description: </label>
          <label className="srOnly">Enter your ticket description here</label>
          <textarea
            name="newDescription"
            rows="4"
            required
            id="newDescription"
            onChange={this.onChangeTicketDescription}
            value={this.state.ticketDescription}>
          </textarea>

          <div className="priorityContainer">
            <p>Priority:</p>
            <div className="priorityItems">
              <input
                type="radio"
                name="priority"
                required
                id="newPriorityLow"
                value="Low"
                onChange={this.onChangeTicketPriority}
                checked={this.state.ticketPriority === "Low"}/>
              <label htmlFor="newPriorityLow">Low</label>
              <label className="srOnly">Check this box if your ticket priority is low</label>

              <input
                type="radio"
                name="priority"
                id="newPriorityMedium"
                value="Medium"
                onChange={this.onChangeTicketPriority}
                checked={this.state.ticketPriority === "Medium"}/>
              <label htmlFor="newPriorityMedium">Medium</label>
              <label className="srOnly">Check this box if your ticket priority is medium</label>

              <input
                type="radio"
                name="priority"
                id="newPriorityHigh"
                value="High"
                onChange={this.onChangeTicketPriority}
                checked={this.state.ticketPriority === "High"}/>
              <label htmlFor="newPriorityHigh">High</label>
              <label className="srOnly">Check this box if your ticket priority is high</label>
            </div>
          </div>
          <button>Submit</button>
        </form>
      </section>
    );
  }
}

export default CreateTicket;



  

 
