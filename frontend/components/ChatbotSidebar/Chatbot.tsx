import React, { useState } from "react";
import styles from "./Chatbot.module.css";

type Message = {
    sender: "user" | "bot";
    text: string;
};

const Chatbot: React.FC = () => {
    // Chatbot state
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        // Ajouter le message utilisateur
        setMessages((prev) => [...prev, { sender: "user", text: input }]);

        try {
            // Appel à l'API chatbot
            const response_chat = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            const data = await response_chat.json();

            // Ajouter la réponse du chatbot
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: data.answer || "Le chatbot n'a pas répondu." },
            ]);
        } catch (error) {
            console.error("Erreur lors de l'appel au chatbot :", error);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Erreur serveur, veuillez réessayer." },
            ]);
        }

        // Réinitialiser le champ de saisie
        setInput("");
    };

    return (
        <div className="col-md-4">
            <div className="border rounded p-3 gris-clair" style={{ height: "100%" }}>
                <h5 className="mb-3">💬 Chatbot</h5>
                <div
                    className="mb-3 p-2 border rounded bg-white"
                    style={{ height: 250, overflowY: "auto", backgroundColor: "#f8f9fa" }}
                >
                    {messages.length === 0 && (
                        <p className="text-muted">Démarre la conversation…</p>
                    )}
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={msg.sender === "user" ? "text-end" : "text-start"}
                        >
                            <span
                                className={
                                    msg.sender === "user"
                                        ? `${styles.user} badge ${styles.badge}`
                                        : `${styles.bot} ${styles.badge} badge`
                                }
                            >
                                <p>{msg.text}</p>
                            </span>
                        </div>
                    ))}
                </div>

                <div className="input-group">
                    <textarea
                        className="form-control"
                        rows={2}
                        value={input}
                        placeholder="Écris un message..."
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            (e.preventDefault(), handleSend())
                        }
                    />
                    <button className="btn btn-send" onClick={handleSend}>
                        <i className="bi bi-send"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;




