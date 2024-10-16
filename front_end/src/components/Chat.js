import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chat.css';  

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            avatar: "https://img.icons8.com/color/36/000000/administrator-male.png",
            text: ["Hi", "How are you ...???", "What are you doing tomorrow? Can we come up a bar?"],
            time: "23:58",
            isReverse: false,
        },
        {
            text: ["Hiii, I'm good.", "How are you doing?", "Long time no see! Tomorrow office. Will be free on Sunday."],
            time: "00:06",
            isReverse: true,
        },
    ]);

    const [newMessage, setNewMessage] = useState("");
    const chatContentRef = useRef(null);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { text: [newMessage], time: new Date().toLocaleTimeString(), isReverse: true }]);
            setNewMessage("");
        }
    };

    useEffect(() => {
        // Scroll automatiquement en bas après chaque nouveau message
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="page-content page-container" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card card-bordered">
                            <div
                                className="ps-container ps-theme-default ps-active-y"
                                id="chat-content"
                                style={{ overflowY: 'auto', height: '400px' }}
                                ref={chatContentRef}
                            >
                                {messages.map((message, index) => (
                                    <div key={index} className={`media media-chat ${message.isReverse ? "media-chat-reverse" : ""}`}>
                                        {message.avatar && <img className="avatar" src={message.avatar} alt="avatar" />}
                                        <div className="media-body">
                                            {message.text.map((line, idx) => <p key={idx}>{line}</p>)}
                                            <p className="meta"><time dateTime="2018">{message.time}</time></p>
                                        </div>
                                    </div>
                                ))}
                                <div className="media media-meta-day">Today</div>
                            </div>

                            <div className="publisher bt-1 border-light">
                                <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="avatar" />
                                <input
                                    className="publisher-input"
                                    type="text"
                                    placeholder="Write something"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') handleSendMessage(e);
                                    }}
                                />
                                <span className="publisher-btn file-group">
                                    <i className="fa fa-paperclip file-browser"></i>
                                    <input type="file" />
                                </span>
                                <a className="publisher-btn" href="#" data-abc="true"><i className="fa fa-smile"></i></a>
                                <a className="publisher-btn text-info" href="#" data-abc="true" onClick={handleSendMessage}><i className="fa fa-paper-plane"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
