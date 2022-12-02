const MessageContent = ({name,username,date,message}) => {
    return (
        <div style={{margin: '20px'}}>
            <b>{name}</b><span style={{color: '#89949d', margin: 'auto 10px'}}>@{username} - {date}</span><br/>
            <p style={{marginBottom: '10px', color: '#89949d'}}>{message}</p>
        </div>
    );
};

export default MessageContent;