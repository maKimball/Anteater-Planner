import { useEffect, useState } from 'react'
import Axios from 'axios'

function App() {
  const [listUsers, setlistUsers] = useState([
    { id: 1, name: "everox", age: 21, username:"everoxMERN"}, 
  ])

  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState("")

  function createUser(){
    Axios.post("http://localhost:3001/createUser", {name, age, username})
    .then((response) => {
      setlistUsers([...listUsers, {name, age, username}])
      console.log('user created')
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers")
    .then((response) => {
      setlistUsers(response.data)
    })
  }, [])



  return (
    <div>
      <div>
        {listUsers.map((user) => {
          return(
            <div> 
              <h1>  {user.id} </h1>
              <h1>  {user.name} </h1>
              <h1>  {user.age} </h1>
              <h1>  {user.username} </h1>
            </div>
          )
        })}
      </div>

      <input type="text" placeholder='name' onChange={(event) => {setName(event.target.value)}}/> 
      <input type="number" placeholder='age' onChange={(event) => {setAge(event.target.value)}}/> 
      <input type="text" placeholder='username' onChange={(event) => {setUsername(event.target.value)}}/> 
      <button onClick={createUser}> submit </button>

    </div>
      
    
  );
}

export default App;
