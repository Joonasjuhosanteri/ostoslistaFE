import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

const URL = 'http://localhost/ostoslista/';

function App() {

  const [item, setItem] = useState ('');
  const [amount, setAmount] = useState ('');
  const [items, setItems] = useState([])

  useEffect(()=> {
    axios.get(URL)
      .then(response => {
        console.log(response.data)
        setItems(response.data);
        }).catch(error => {
          alert(error.response ? error.response.data.error : error)
      })
  },[])

  
  function Add (e) {
    e.preventDefault()
    const json = JSON.stringify({ description: item, amount: amount })
    axios
      .post(URL + 'add.php', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data);
        setItems(items => [...items, response.data]);
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  }

  function remove (id) {
    const json = JSON.stringify({ id: id })
    axios
      .post(URL + 'delete.php', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data)
        const newListWithoutRemoved = items.filter(item => item.id !== id)
        setItems(newListWithoutRemoved)
      })
      .catch(error => {
        alert(error.response ? error.response.data.error : error)
      })
  }

  return (
    <div className="container">
      <h3>Shopping list </h3>
      <form onSubmit={Add}>
        <label>New item</label>
        <input value={item} placeholder="type description" onChange={e => setItem(e.target.value)} />
        <input value={amount} placeholder="type amount" type="number" onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>
      <table>
        {items?.map(item => (
          <tr key={item.id}>
            <td><span> {item.description} </span></td>
            <td><span> {item.amount} </span></td> 
            <a href="#" className='delete' onClick={() => remove(item.id)}>
              Delete
            </a>
            &nbsp;
          </tr>
        ))}
      </table>
    </div>
  )}

export default App;