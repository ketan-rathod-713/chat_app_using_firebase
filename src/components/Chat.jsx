import React, { useEffect } from "react";
import { auth,  db } from "../firebase-config";
import { useState } from "react";
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from "firebase/firestore" // entry into a collection // one message in the table of messages collections
import "../styles/Chat.css"


const Chat = ({room}) => {
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages")
    const [messages, setMessages] = useState([]);
    
    
    useEffect(()=>{
        // query , 
        const queryMessages = query(messagesRef, where("room","==", room), orderBy("createdAt") )
        const unsubscribe = onSnapshot(queryMessages, (snapshot)=>{ // It will listen to the new messages and will console log that
            let messages =  []
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(prev=> messages)
            console.log(messages)
        })

        return ()=>{
            unsubscribe()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit =async (e)=>{
        e.preventDefault()
        if(newMessage === "") return
        setNewMessage("")
        // here 4 things are neccessary // text message, time when message created, 
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        })

        
    }

  return <div className="chat-app">
    <h1 className="heading-room">Welcome to {room}</h1>

    <div className="messages">
        {
            messages.map((message) => 
                <div className="message" key={message.id}>
                <span className="user">{message.user}</span>
                <span>{message.text}</span>
                {/* <span>{message.createdAt.seconds}</span> */}
                </div>
            )
        }
    </div>
    
    <form className="new-message-form">
        <input type="text" className="new-message-input" placeholder="Type your message here" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>
        <button type="submit" className="send-button" onClick={handleSubmit}>Send</button>
    </form>
  </div>;
};

export default Chat;
