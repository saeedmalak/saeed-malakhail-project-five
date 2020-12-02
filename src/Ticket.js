import firebase from "./firebase";

const Ticket = ({ ticket }) => {
  return (
    <tr>
      <td>{ticket.name}</td>
      <td>{ticket.description}</td>
      <td>{ticket.priority}</td>
      <td>{ticket.date}</td>
      <td>
        <button
          onClick={() => {
            const dbRef = firebase.database().ref();
            dbRef.child(ticket.id).remove();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Ticket;
