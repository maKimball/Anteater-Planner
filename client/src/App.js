import { useEffect, useState } from 'react'
import Axios from 'axios'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [listAssignments, setListAssignments] = useState([])
  const [assignmentClassName, setAssignmentClassName] = useState("")
  const [desc, setDesc] = useState("")
  const [month, setMonth] = useState(0)
  const [day, setDay] = useState(0)

  function createAssignment(){
    console.log({assignmentClassName, desc, month, day})
    Axios.post("http://localhost:3001/createAssignment", {className: assignmentClassName, desc, month, day,  })
    .then((response) => {
      setListAssignments([...listAssignments, {_id: "", className: assignmentClassName, desc, month, day,__v:0}])
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
      <div style={{margin: "10px", border: "1px solid black", display: "flex"}}>
        {/* Classes List */}
        <div className="classesCalendar" style={{width: "50%",margin: "5px", border: "1px solid black"}}>
        <h1> Classes </h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> Class Name</th>
                  <th> Monday </th>
                  <th> Tuesday</th>
                  <th> Wednesday</th>
                  <th> Thursday </th>
                  <th> Friday </th>
                  <th> Remove </th>
                </tr>
              </thead>
              <tbody>
              {listClasses.map((newClass) => {
                return(
                  <tr>
                    {Object.keys(newClass)[0] === "_id" ? 
                    <> {Object.values(newClass).slice(1,-1).map((test) => { console.log(test) 
                      return( 
                    <> 
                      {(Array.isArray(test) && test.length > 0)? <td> {`${test[0]} - ${test[1]}`}  </td>: <td> {test} </td> }
                      
                    </>
                    
                    
                    )})} </> : 
                    <> {Object.values(newClass).map((test) => {return(<td> {test}  </td>)})}</>
                    }
                    <td> <Button variant="danger"> x </Button> </td>
                  </tr>                  
                )})}
              </tbody>
            </Table>
        </div>
        {/* Classes Form */}
        <div className="classesForm" style={{width: "50%", margin: "5px", border: "1px solid black"}}>
          <Table striped bordered hover style={{border: "1px solid black"}}>
            <thead>
              <tr>
               <th> Create a Class </th>
              </tr>
            </thead>
            <tbody>
              <tr> <Form.Control type="text" placeholder='class name' onChange={(event) => {setClassName(event.target.value)}}/>  </tr>
              <tr style={{display: "flex"}}>
                <td> <h4> Monday: </h4> </td>
                 <td> <Form.Control type="text" placeholder='Start Time' onChange={(event) => {
                  let newArr = [...Monday]
                  newArr[0] = event.target.value
                  setMonday(newArr)}}/> </td>
                <td> <Form.Control type="text" placeholder='End Time' onChange={(event) => {
                  let newArr = [...Monday]
                  newArr[1] = event.target.value
                  setMonday(newArr)}}/> </td>
              </tr> 
              <tr style={{display: "flex"}}> 
                <td> <h4> Tuesday: </h4> </td>
                <td> <Form.Control type="text" placeholder='Start Time' onChange={(event) => {
                  let newArr = [...Tuesday]
                  newArr[0] = event.target.value
                  setTuesday(newArr) }}/> </td>
                <td> <Form.Control type="text" placeholder='End Time' onChange={(event) => {
                  let newArr = [...Tuesday]
                  newArr[1] = event.target.value
                  setTuesday(newArr) }}/> </td>
              </tr>
              <tr style={{display: "flex"}}> 
                <td> <h4> Wednesday: </h4> </td>
                <td> <Form.Control type="text" placeholder='Start Time' onChange={(event) => {
                  let newArr = [...Wednesday]
                  newArr[0] = event.target.value
                  setWednesday(newArr) }}/>  </td>
                <td> <Form.Control type="text" placeholder='End Time' onChange={(event) => {
                  let newArr = [...Wednesday]
                  newArr[1] = event.target.value
                  setWednesday(newArr) }}/>  </td>
              </tr>
              <tr style={{display: "flex"}}> 
                <td> <h4> Thursday: </h4> </td>
                <td> <Form.Control type="text" placeholder='Start Time' onChange={(event) => {
                  let newArr = [...Thursday]
                  newArr[0] = event.target.value
                  setThursday(newArr) }}/> </td>
                <td> <Form.Control type="text" placeholder='End Time' onChange={(event) => {
                  let newArr = [...Thursday]
                  newArr[1] = event.target.value
                  setThursday(newArr) }}/> </td>
              </tr>
              <tr style={{display: "flex"}}> 
                <td> <h4> Friday: </h4> </td>
                <td> <Form.Control type="text" placeholder='Start Time' onChange={(event) => {
                  let newArr = [...Friday]
                  newArr[0] = event.target.value
                  setFriday(newArr) }}/> </td>
                <td> <Form.Control type="text" placeholder='End Time' onChange={(event) => {
                  let newArr = [...Friday]
                  newArr[1] = event.target.value
                  setFriday(newArr) }}/> </td>
              </tr>
            </tbody>
          </Table>
          <Button style={{width: "100%"}}onClick={createClass}> Create Class </Button>
        </div>
      </div>
        <div className='Assignments' style={{ border: "1px solid black", margin: "10px", display: "flex"}}>
          {/* Assignments List */}
          <div className='AssignmentsList' style={{ width: "50%", margin:"5px", border: "1px solid black"}}>
            <h1> List of Assignments </h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> Class </th>
                  <th> Description </th>
                  <th> Month</th>
                  <th> Day</th>
                  <th> Remove </th>
                </tr>
              </thead>
              <tbody>
                  {listAssignments.map((assignment) => {
                    return(
                      <tr>
                        {Object.keys(assignment)[0] === "_id" ? 
                        <> {Object.values(assignment).slice(1,-1).map((value) => { return( <td> {value} </td> )})} </> : 
                        <> {Object.values(assignment).map((value) => { return( <td> {value} </td>)})} </>                          
                        }
                      <td> <Button variant="danger"> x </Button> </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </div>
          {/* Assignment Forms */}
          <div className='AssignmentsForm' style={{ width: "50%", margin:"5px", border: "1px solid black"}}>
            <Form style={{margin: "5px"}}>
              <Form.Control type="text" placeholder="Class Name" onChange={(event) => {setAssignmentClassName(event.target.value)}}/>
              <Form.Control type="text" placeholder="Description" onChange={(event) => {setDesc(event.target.value)}}/>
              <div style={{display:"flex"}} >
                <Form.Control type="number" placeholder="Due Month" style={{width:"50%"}} onChange={(event) => {setMonth(event.target.value)}}/>
                <Form.Control type="number" placeholder="Due Day" style={{width:"50%"}} onChange={(event) => {setDay(event.target.value)}}/>
              </div>
              <Button style={{width: "100%"}}onClick={createAssignment}> Create Assignment </Button>
            </Form>
          </div>
        </div>
    </div>
  );
}

export default App;
