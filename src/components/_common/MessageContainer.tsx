import { useContext } from "react";
import { MessageContext } from "../../GlobalContext";
import { Message } from "../../interfaces/interfaces.ts";
import "./message.css";


interface MessageProps {
    message: Message
}

function MessageCard({message}: MessageProps) {
    
    return (
        <div className="message" style={{backgroundColor: message.type === "error" ? "red" : "green"}}>
            {message.text}
        </div>
    );
}


export default function MessageContainer() {

    const { messages } = useContext(MessageContext);

    return (
        <div className="message-container">
            {messages.map(message => <MessageCard key={message.time} message={message}></MessageCard>)}
        </div>
    );
}