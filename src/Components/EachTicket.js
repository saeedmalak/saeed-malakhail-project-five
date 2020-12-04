import firebase from "../firebase";

// for each ticket extracted from the array, render them onto the screen by formating it in the 'tbody' of the table. Also the last item in the results row is a 'trash-can' icon allowing the user to delete the item, when the issue is resolved!
const EachTicket = ({ ticket }) => {
  return (
    <tr>
      <td data-title="Requester">{ticket.name}</td>
      <td data-title="Description">{ticket.description}</td>
      <td data-title="Priority">{ticket.priority}</td>
      <td data-title="Date">{ticket.date}</td>
      <td data-title="Action">
        <i className="far fa-trash-alt" onClick={() => {
            const dbRef = firebase.database().ref();
            dbRef.child(ticket.id).remove();
          }} ></i>
      </td>
    </tr>
  )
};

export default EachTicket;
