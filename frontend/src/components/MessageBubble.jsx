// components/MessageBubble.jsx
export default function MessageBubble({ message, isMine, avatar, time }) {
  const containerStyle = {
    display: "flex",
    justifyContent: isMine ? "flex-end" : "flex-start",
    marginBottom: 12,
    alignItems: "flex-end",
  };

  const bubbleStyle = {
    maxWidth: "60%",
    padding: "8px 12px",
    borderRadius: 16,
    background: isMine ? "#0088cc" : "#fff",
    color: isMine ? "white" : "black",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    borderTopLeftRadius: isMine ? 16 : 4,
    borderTopRightRadius: isMine ? 4 : 16,
    wordBreak: "break-word",
    display: "flex",
    flexDirection: "column",
  };

  const avatarStyle = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    marginRight: 8,
    background: "#ccc",
    flexShrink: 0,
  };

  const timeStyle = {
    fontSize: 10,
    color: isMine ? "#e0e0e0" : "#888",
    alignSelf: "flex-end",
    marginTop: 4,
  };

  return (
    <div style={containerStyle}>
      {!isMine && <div style={avatarStyle}>{avatar ? <img src={avatar} style={{ width: "100%", borderRadius: "50%" }} /> : null}</div>}
      <div style={bubbleStyle}>
        <div>{message}</div>
        <div style={timeStyle}>{time}</div>
      </div>
    </div>
  );
}