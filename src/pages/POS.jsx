import React, {useEffect, useState} from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, addDoc, doc, runTransaction } from 'firebase/firestore';

export default function POS(){
  const [items,setItems] = useState([]);
  const [cart,setCart] = useState([]);

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'items'), snap=>{
      setItems(snap.docs.map(d=>({id:d.id,...d.data()})));
    });
    return ()=>unsub();
  },[]);

  const addToCart = (item)=> {
    setCart(prev=>{
      const exists = prev.find(p=>p.id===item.id);
      if(exists) return prev.map(p=> p.id===item.id ? {...p, qty: p.qty+1} : p);
      return [...prev, {...item, qty:1}];
    });
  }

  const checkout = async ()=>{
    if(cart.length===0) return alert('Cart empty');
    try{
      await runTransaction(db, async (t)=>{
        const txRef = doc(collection(db,'transactions'));
        t.set(txRef, {createdAt: new Date(), total: cart.reduce((s,i)=>s + (i.price*i.qty),0), lines: cart.map(c=>({itemId:c.id, qty:c.qty, price:c.price}))});
        for(const c of cart){
          const itemRef = doc(db,'items',c.id);
          const itemSnap = await t.get(itemRef);
          if(!itemSnap.exists()) throw `Item missing: ${c.name}`;
          const newQty = (itemSnap.data().stock_qty||0) - c.qty;
          if(newQty < 0) throw `Not enough stock for ${itemSnap.data().name}`;
          t.update(itemRef, {stock_qty: newQty});
        }
      });
      alert('Sale completed'); setCart([]);
    }catch(e){ alert('Error: '+e); }
  }

  return (
    <div>
      <h3>POS</h3>
      <div style={{display:'flex'}}>
        <div style={{flex:1}}>
          <h4>Items</h4>
          {items.map(it=> (
            <div key={it.id} style={{border:'1px solid #ccc', padding:8, margin:6}}>
              <b>{it.name}</b> - ₹{it.price} <br/>
              Stock: {it.stock_qty}
              <div><button onClick={()=>addToCart(it)}>Add</button></div>
            </div>
          ))}
        </div>
        <div style={{width:300, paddingLeft:20}}>
          <h4>Cart</h4>
          {cart.map((c,i)=> (<div key={i}>{c.name} x{c.qty} - ₹{c.price*c.qty}</div>))}
          <div>Total: ₹{cart.reduce((s,i)=>s + (i.price*i.qty),0)}</div>
          <button onClick={checkout}>Checkout</button>
        </div>
      </div>
    </div>
  )
}
