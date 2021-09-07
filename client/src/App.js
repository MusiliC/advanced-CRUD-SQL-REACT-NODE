
import './App.css';
import {useState} from 'react';
import Axios from 'axios';


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  const [employeeList, setEmployeeList] = useState([]);
  const [newSalary, setNewSalary] = useState("")

  const addEmployee = () =>{

    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country, 
      position: position, 
      salary: salary
    }).then( () => {
      setEmployeeList([...employeeList,
     {
      name: name,
      age: age,
      country: country, 
      position: position, 
      salary: salary,
    },
    ]);
    });
  }

  const getEmployees= () => {

    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data)
    })
  }

  const updateEmployeeSalary = (id) =>{

    Axios.put('http://localhost:3001/update', {salary: newSalary, id: id}).then((response) => {

      alert("updated")
    })
  }

  const deleteEmployee = (id) =>{
    
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {

      setEmployeeList(
        employeeList.filter((val) =>{
          return val.id !== id;
        })
      )
    })
  }

  return (
    <div className="App">

    <div className="info">

      <h1>Just CRUD</h1>
      <label><b>Name:</b></label>
      <input type="text" onChange={(e)=> {setName(e.target.value)}}/>
      <label><b>Age:</b></label>
      <input type="number" onChange={(e)=> {setAge(e.target.value)}} />
      <label><b>Country:</b></label>
      <input type="text" onChange={(e)=> {setCountry(e.target.value)}}/>
      <label><b>Position:</b></label>
      <input type="text" onChange={(e)=> {setPosition(e.target.value)}}/>
      <label><b>Salary:</b></label>
      <input type="text" onChange={(e)=> {setSalary(e.target.value)}}/>

      <button onClick={addEmployee}>Add Employee</button>
      

    </div>

   
    <div className="employees">

    <button onClick={getEmployees}>Show Employees</button>

    {employeeList.map((val, key) => {
      return(
        <div className="employee">

          <div>
          <h5>Name: {val.name}</h5>
          <h5>Age: {val.age}</h5>
          <h5>Country: {val.country}</h5>
          <h5>Position: {val.position}</h5>
          <h5>Salary: {val.salary}</h5>
          </div>
          <div>
            <input type="text"  onChange={(e)=> {setNewSalary(e.target.value)}}/>
            <button onClick={() => {updateEmployeeSalary(val.id)}}>New Salary</button>
            <button onClick={() => {deleteEmployee(val.id)}}>Delete</button>
          </div>
           
        </div>
      )
    })}

    </div>
    </div>
  );
}

export default App;
