import { useEffect, useState } from 'react'
import Axios from 'axios'

function App() {

  const [listAssignments, setListAssignments] = useState([])
  const [assignmentClassName, setAssignmentClassName] = useState("")
  const [desc, setDesc] = useState("")
  const [month, setMonth] = useState(0)
  const [day, setDay] = useState(0)

  function createAssignment(){
    console.log({assignmentClassName, desc, month, day})
    Axios.post("http://localhost:3001/createAssignment", {className: assignmentClassName, desc, month, day})
    .then((response) => {
      setListAssignments([...listAssignments, {className: assignmentClassName, desc, month, day}])
      console.log('assignment created')
    })
  }

  const [listClasses, setListClasses] = useState([])
  const [className, setClassName] = useState([])
  const [Monday, setMonday] = useState([])
  const [Tuesday, setTuesday] = useState([])
  const [Wednesday, setWednesday] = useState([])
  const [Thursday, setThursday] = useState([])
  const [Friday, setFriday] = useState([])

  function createClass(){
    console.log({className, desc, month, day})
    Axios.post("http://localhost:3001/createClass", {className, Monday, Tuesday, Wednesday, Thursday, Friday})
    .then((response) => {
      setListClasses([...listClasses, {className, Monday, Tuesday, Wednesday, Thursday, Friday}])
      console.log('class created')
    })
  }




  useEffect(() => {
    Axios.get("http://localhost:3001/getAssignments")
    .then((response) => {
      setListAssignments(response.data)
    })

    Axios.get("http://localhost:3001/getClasses")
    .then((response) => {
      setListClasses(response.data)
    })

  }, [])



  return (
    <div>
        <div>
          {listAssignments.map((assignment) => {
            return(
              <div>
                {Object.values(assignment).map((heading) => {
                  return(
                    <h1> {heading} </h1>
                  )
                })} 
              </div>
            )
          })}
          <input type="text" placeholder='assignment name' onChange={(event) => {setAssignmentClassName(event.target.value)}}/> 
          <input type="text" placeholder='description' onChange={(event) => {setDesc(event.target.value)}}/> 
          <input type="number" placeholder='month' onChange={(event) => {setMonth(event.target.value)}}/> 
          <input type="number" placeholder='day' onChange={(event) => {setDay(event.target.value)}}/> 
          <button onClick={createAssignment}> create assignment </button>
        </div>

        <div>
          {listClasses.map((class1) => {
            return(
              <div> 
                <h1>  {class1.className} </h1>
                <h1>  {class1.Monday} </h1>
                <h1>  {class1.Tuesday} </h1>
                <h1>  {class1.Wednesday} </h1>
                <h1>  {class1.Thursday} </h1>
                <h1>  {class1.Friday} </h1>
              </div>
            )
          })}
          <input type="text" placeholder='class name' onChange={(event) => {setClassName(event.target.value)}}/> 
          <input type="text" placeholder='Monday1' onChange={(event) => {
            let newArr = [...Monday]
            newArr[0] = event.target.value
            setMonday(newArr)
          }}/> 

          <button onClick={createClass}> create assignment </button>
        </div>
      

    </div>
      
    
  );
}

export default App;
