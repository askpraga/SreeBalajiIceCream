import React, {useEffect, useState} from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function Inventory(){
  const [items,setItems] = useState([]);

  useEffect(()=>{
    const q = query(collection(db,'items'));
    const unsub = onSnapshot(q,snap=>{
      setItems(snap.docs.map(d=>({id:d.id,...d.data()})));
    });
    return ()=>unsub();
  },[]);

  return (
    <div>
      <h3>Inventory</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>Name</th><th>SKU</th><th>Stock</th><th>Reorder</th></tr></thead>
        <tbody>
          {items.map(it=> (
            <tr key={it.id}>
              <td>{it.name}</td>
              <td>{it.sku}</td>
              <td>{it.stock_qty}</td>
              <td>{it.stock_qty <= (it.reorder_level||5)? 'LOW' : 'OK'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
