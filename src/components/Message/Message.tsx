import React, { FunctionComponent } from "react";
import "./Message.scss";

interface IMessageProps {
	message: string;
}

const Message: FunctionComponent<IMessageProps> = ({
	message
}) => {

  return (
	  <div className="message-container">
      {message && message.length > 0 && 
			  <p>{message}</p>
      }
    </div>
  );
};

export default Message;
