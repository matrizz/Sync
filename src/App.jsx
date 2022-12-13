import { app, db_App } from "./services/firebaseConfig"
import { getAuth } from "firebase/auth";
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import './App.css'

const auth = getAuth(app)

export const App = () => {
    const [user] = useAuthState(auth)
    return (
        <div className='App'>
            <header>
            </header>
            <SignOut />
            <div>{user ? <ChatRoom /> : <SignIn />}</div>
        </div>
    ) 
}

export const SignIn = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  
    return (
        <div className="login-content">
            <header>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </header>
            <div id="logo"><img className="logo" src="../pics/logomark-white.png" alt="" /></div>
            <button onClick={ () => signInWithGoogle() } id="sign" className="sign-in" type="submit" value={''}>
                <img id="google-symbol" src="../pics/google-symbol.png"/>
                <label htmlFor="sign" className="txt-label">
                    Login with Google
                </label>
            </button>    
        </div>
    )
}

export const SignOut = () => {
    return (
        auth.currentUser && (
            <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
        )
    )
}

export const ChatRoom = () => {
    const messagesRef = collection(db_App, "messages");
    const queryMessage = query(messagesRef, orderBy("createdAt"), limit(25));
    const [messages] = useCollectionData(queryMessage, { idField: "id" });
  
    const [formValue, setFormValue] = useState("");
    const sendMessage = async (e) => {
      e.preventDefault();
      const { photoURL, uid } = auth.currentUser;
  
      await addDoc(messagesRef, {
        text: formValue,
        uid,
        photoURL,
        createdAt: serverTimestamp()
      });
      setFormValue('')
    };
  
    return (
      <>
        <section className="menu"></section>
        <main>
          {messages &&
            messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
        </main>
        <form onSubmit={sendMessage}>
          <input type="text" id="inpt" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Mensagem"/>
          <button type="submit" disabled={!formValue}>Send</button>
        </form>
      </>
    );
  };

export const ChatMessage = (props) => {
  const { text, photoURL, uid } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const tailClass = uid === auth.currentUser.uid ? "tail-message-sent" : "tail-message-received";
  const tailColorClass = uid === auth.currentUser.uid ? "blue" : "white";
  return (
    <div className={`message ${messageClass}`}>
      <img className="img-users" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}/>
      <svg className={`${tailClass}`} viewBox="0 0 8 13" width="8" height="13"><path className={`${tailClass}`} opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path className={`${tailClass, tailColorClass}`} fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg>
        <p>{text}</p>
    </div>
  )
}

export default App