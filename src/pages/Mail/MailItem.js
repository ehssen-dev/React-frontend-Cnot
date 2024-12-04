import React from "react";
import { Link } from "react-router-dom";

const MailItem = ({ mail }) => {
  return (
    <div>
      <Link to={`/mails/${mail.mailId}`}>
        <h3>{mail.subject}</h3>
      </Link>
      <p>From: {mail.sender.name}</p>
      <p>To: {mail.recipient.name}</p>
    </div>
  );
};

export default MailItem;
