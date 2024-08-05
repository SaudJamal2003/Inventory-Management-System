import React from 'react';
import app from './firebaseConfig'
import {getDatabase, ref, set, push, get, remove} from 'firebase/database'


function InventoryTable({id, Name, Count, Status, Type}) {
    const handleDelete = async () => {
        const db = getDatabase(app);
        console.log(Type, Name, Count, Status, id)
        if (Type === 'Full Data'){
            var dbRef = ref(db, `${Type}/${id}`)
        }
        else{
            var dbRef = ref(db, `${Type}/${Status}/${id}`)
        }
        await remove(dbRef);
        alert('Record Deleted');
        window.location.reload();
    }



  return (
    <>
        <div className='tableEntry'>
            <div className='name'>
                <h4>{Name}</h4>
            </div>

            <div className='status'>
            <h4>{Status}</h4>
            </div>

            <div className='count'>
            <h4>{Count}</h4>
            </div>
            
            <div className='deleteBtn'>
            <button onClick={handleDelete}>X</button>
            </div>              
        </div>
    
    </>
  )
}

export default InventoryTable