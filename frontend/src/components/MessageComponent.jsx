import ReactMarkdown from "react-markdown";
const MessageComponent = ({ message }) => {
  return (
    <div
      className={`my-2 p-4 bg-muted/40 max-w-[650px] rounded-lg flex flex-col items-start gap-4 ${
        message?.role === "user" ? "self-end" : "self-start"
      }`}
    >
      <div className="font-medium text-start">
        {message?.role === "assistant" ? "HALO:" : "You:"}
      </div>
      <ReactMarkdown className="text-start font-light react-markdown">
        {message?.value}
      </ReactMarkdown>
    </div>
  );
};

export default MessageComponent;
