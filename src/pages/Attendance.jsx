import React, {useState, useEffect} from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Attendance(){
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,u=> setUser(u));
    return ()=>unsub();
  },[]);

  const clockIn = async ()=>{
    if(!user) return alert('Login required');
    await addDoc(collection(db,'attendance'), {userId:user.uid, clockIn:new Date(), clockOut:null});
    setStatus('Clocked in');
  }
  const clockOut = async ()=>{
    if(!user) return alert('Login required');
    await addDoc(collection(db,'attendance'), {userId:user.uid, clockIn:null, clockOut:new Date()});
    setStatus('Clocked out');
  }

  return (
    <div>
      <h3>Attendance</h3>
      <div>User: {user ? user.email : 'Not logged in'}</div>
      <button onClick={clockIn}>Clock In</button>
      <button onClick={clockOut}>Clock Out</button>
      <div>{status}</div>
    </div>
  )
}
