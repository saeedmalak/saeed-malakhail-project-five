import { Component } from 'react';

// the home page view listing the instructions to the user and the available options for the bug tracking application 
class Home extends Component {
  render() {
    return (
      <section>
        <h1>Bug Tracking App</h1>
        <ol>
          <li>
            Document all your system/bug issues by clicking the 'Create Ticket' navigation link above. 
          </li>
          <li>
            View a history of all your logs under the 'Tickets'   link. 
          </li>
          <li>
            Once the issue has been resolved, feel free to delete it from your history!
          </li>
        </ol>
      </section>
    );
  }
}

export default Home;