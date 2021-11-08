import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

const URL = 'http://localhost/ostoslista';

function App() {

  const [item, setItem] = useState ('');
  const [amount, setAmount] = useState ('');
  const [items, setItems] = useState([])

  useEffect(()=> {
    axios.get(URL)
      .then((response) => {
        console.log(response.data)
        setItems(response.data);
        setAmount(response.data)
      }).catch (error => {
        alert(error);
      })
  },[])

  
  function Add (e) {
    e.preventDefault()
    const json = JSON.stringify({ description: item })
    axios
      .post(URL + 'add.php', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data)
        setItems(items => [...items, response.data]);
        setItem('');
      })
      .catch(error => {
        alert(error.response.data.error)
      })
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
      <ol>
        {items?.map(item => (
          <li key={item.id}>
            <span> {item.description} </span> 
            <span> {item.amount} </span> 
          </li>
        ))}
      </ol>
    </div>
  )}

export default App;