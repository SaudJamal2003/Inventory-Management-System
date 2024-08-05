import './App.css';
import InventoryTable from './InventoryTable';
import {useState} from 'react'
import app from './firebaseConfig'
import {getDatabase, ref, set, push, get} from 'firebase/database'

function App() {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const handleChange1 = (event) => {
      setType(event.target.value)
  };
  const handleChange2 = (event) => {
      setStatus(event.target.value)
  };

  const handleInputChange = (event) => {
      setName(event.target.value)
  };
  const handleCountChange = (event) => {
      setCount(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(type && name && status && count){
      writeData(type, name, status, count);
      console.log(type)
      console.log(name)
      console.log(status)
    }
    else{
      alert("Select the correct value")
    }
  };

  const writeData = async (typeData, nameData, statusData, countData) => {
    const db = getDatabase(app);
    console.log("WriteData function")
    console.log(typeData)
    console.log(nameData)
    console.log(statusData)
    console.log(countData)
    const newDocRef = push(ref(db, `${type}/${statusData}`));
    const fullDataRef = push(ref(db, `Full Data`));
    set(newDocRef,{
        Name: nameData,
        Count: countData
    })
    set(fullDataRef,{
        Name: nameData,
        Count: countData,
        Status: statusData
    })
  };

  const[fetchType, setFetchType] = useState('');
  const[fetchStatusType, setFetchStatusType] = useState('');
  const[fetchData, setFetchedData] = useState([]);
  const[fetchDataFully, setFetchedDataFully] = useState([]);

  const handlefetchChange = (event) => {
    setFetchType(event.target.value)
  };
  const handlefetchStatusChange = (event) => {
    setFetchStatusType(event.target.value)
  };

  const handleFetchSubmit = async (event) => {
    event.preventDefault();
    if (fetchType && fetchStatusType) {
      const db = getDatabase(app);
      const dbRef = ref(db, `${fetchType}/${fetchStatusType}`);
      const snapShot = await get(dbRef);
      if (snapShot.exists()) {
        const data = snapShot.val();
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setFetchedData(formattedData);
      } else {
        setFetchedData([]);
      }
    }
  };

  const viewFullTable = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'Full Data');
    const snapShot = await get(dbRef);
    if (snapShot.exists()) {
      const data = snapShot.val();
      const formattedData = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setFetchedDataFully(formattedData);
    } else {
      setFetchedDataFully([]);
    }
  } 
  
  
 
  return (
    <>
      <div className='main'>

        <div className='oprationDiv'>
            <div className='searchTableHeader'>
              <h4>Search Table</h4>
            </div>
            
            <form onSubmit={handleFetchSubmit} className='searchDiv'>
            

              <div className='tabledropdown'>
                <h4>Type</h4>
                <select value={fetchType} onChange={handlefetchChange}>
                  <option value='Organic Products'>Organic Products</option>
                  <option value='Appliances'>Appliances</option>
                </select>
              </div>

              <div className='tabledropdown'>
              <h4>Status</h4>
                <select value={fetchStatusType} onChange={handlefetchStatusChange}>
                  <option value='On Order'>On Order</option>
                  <option value='New'>New</option>
                  <option value='Ready'>Ready</option>
                </select>
              </div>
              <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'center', gap:'10px'}}>
                <button type='submit' className='viewBtn'>Filtered Data</button>
                <button style={{marginRight:'-45px'}} className='viewBtn' onClick={viewFullTable}>View Full Table</button>
              </div>
            </form>

            <div className='addTableHeader'>
              <h4>Add Row</h4>
            </div>
            
            <form  className='addDiv' onSubmit={handleSubmit}>

              <div className='tabledropdown'>
                <h4>Type</h4>
                <select value={type} onChange={handleChange1} >
                  <option value= 'Organic Products'>Organic Products</option>
                  <option value= 'Appliances'>Appliances</option>
                </select>
              </div>

              <div className='tabledropdown'>
              <h4>Status</h4>
                <select value={status} onChange={handleChange2}>
                  <option value='On Order'>On Order</option>
                  <option value='New'>New</option>
                  <option value='Ready'>Ready</option>
                </select>
              </div>

              <div className='countDiv'>
                <h4>Name</h4>
                <input type='text' onChange={handleInputChange} name= 'name' value={name || ' '} required/>
              </div>

              <div className='countDiv'>
                <h4>Count</h4>
                <input type='number' placeholder='  1' 
                onChange={handleCountChange} name='count' value={count || ' '} required/>
              </div>

              <button type='submit' className='submitBtn'>Submit</button>
            </form>
          </div>


        <div className='tableDiv'>
            <h2>Inventory Management System</h2>

            <h3>{fetchType}</h3>

            <div className='elementTable'>
              <div className='itemName'>
                  <h4>Item Name</h4>
              </div>
              <div className='statusAttr'>
                <h4>Status</h4>

              </div>
              <div className='countAttr'>
                 <h4>Count</h4>

              </div>
              <div className='deleteAttr'>
                <h4>Delete</h4>
              </div>              
            </div>

            
              <div className='data'>
                  {/* {fetchData.map((item) => {
                        return<InventoryTable Name={item.Name} Count={item.Count} Status={fetchStatusType} Type={fetchType} Id={item.key}/>
                      })} */}
                  {Array.isArray(fetchData) && fetchData.length > 0 ? (
                  fetchData.map((item) => (
                  <InventoryTable
                    key={item.id}
                    id={item.id} 
                    Name={item.Name}
                    Count={item.Count}
                    Status={fetchStatusType}
                    FullDataStatus = {item.Status} 
                    Type={fetchType}
                  />
                ))
              ) : (
                // <p>{fetchData.length === 0 ? 'Press Search Button from Left Panel' : fetchData}</p>
                Array.isArray(fetchDataFully) && fetchDataFully.length > 0 ? (
                  fetchDataFully.map((item) => (
                  <InventoryTable
                    key={item.id}
                    id={item.id} 
                    Name={item.Name}
                    Count={item.Count}
                    Status = {item.Status} 
                    Type='Full Data'
                  />
                ))
              ):(
                <p>{fetchData.length === 0 ? 'Press Search Button from Left Panel' : fetchData}</p>
              )
              )}
              </div>
        </div>
      </div>
    </>
  );
}

export default App;
