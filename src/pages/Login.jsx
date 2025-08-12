import React, {useState} from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');

  const login = async ()=> {
    try{
      await signInWithEmailAndPassword(auth,email,password);
      window.location.href = '/';
    }catch(e){
      setErr(e.message);
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <br/>
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <br/>
      <button onClick={login}>Login</button>
      <div style={{color:'red'}}>{err}</div>
    </div>
  );
}
