// import logo from './logo.svg'; 
import './App.css';
import React from 'react';
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import image from './Assets/images/header.jpg';



function App() {


  // const result={
  //   active:null,
  //   admin2:"",
  //   lastUpdate:"",
  //   deaths:""
  // }
  

//use the Hook for fetch the data and errors


const [latest,setLatest]=useState([]); 
const [cases,setCases]=useState(); 
const [countries, setCountries] = useState([]);

useEffect(() => {
  axios.get("https://covid19.mathdro.id/api/countries").then(response=>{
    console.log("countries:"+response.data);

    let countryList=response.data.countries.map((item)=>{
       let country={label:item.name}
       return country
    });
    // setCountries(response.data.countries);
    setCountries(countryList);
    console.log(countryList);
  }).catch((error)=>console.log(error));
}, []);


const changeCountry=(countryName)=>{
  console.log(countryName);
  axios.get(`https://covid19.mathdro.id/api/countries/${countryName}`).then(response=>{
    
    setCases(response.data)

  });

}

useEffect(()=>{
  changeCountry("Iran")
    
},[]);

//   axios.get("https://covid19.mathdro.id/api/countries/USA/confirmed").then(response=>{
//     console.log(response.data);
    

//     const filtered_data=response.data.filter((item)=>item.provinceState=='California');

//     const filtered_data_recovered=response.data.filter((item)=>item.recovered);
//     console.log("number of:" + filtered_data_recovered);

//      setLatest(filtered_data);
     
//      console.log(filtered_data);
//      setCases(response.data[10]);
// }
// ).catch((error)=>console.log(error));

// },[]);





  return (
   
< div className='container'>
  {/* <Header/> */}
  <img src={image} alt="COVID-19" className='header'/>
  {/* // latest.map((item,index)=> */}
    {cases && 
    <CardGroup >
      
      {/* this for validation */}
      {/* {cases.active && */}
      <Card className='cases text-center'bg="secondary" text="white" style={{borderRadius:"7px"}} >
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title>The number of Cases</Card.Title>
          <Card.Text>

            {/* cases:{cases.active} */}
            cases:{ cases.confirmed.value}
            

          </Card.Text>

        </Card.Body>

        <Card.Footer>
          {/* <small text="white">Last updated 3 mins ago</small> */}
        </Card.Footer>
      </Card>
      {/* } */}
      

      <Card className='recovered text-center'bg="success" text="white" style={{borderRadius:"7px"}}>
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title> the number of recovered</Card.Title>
          <Card.Text>
            cases:{cases.recovered.value}
            {/* cases:{ item.recovered} */}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {/* <small className="text-muted">Last updated 3 mins ago</small> */}
        </Card.Footer>
      </Card>

      <Card className='death text-center' bg="danger" text="white" style={{borderRadius:"7px"}}>
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title>The number of Deaths</Card.Title>
          <Card.Text>
                    cases:{cases.deaths.value}
                    {/* cases:{ item.deaths} */}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {/* <small className="text-muted">Last updated 3 mins ago</small> */}
        </Card.Footer>
      </Card>
    </CardGroup>
  }
    {/* // ) */}
  
 <div className='input-country'>
    <Autocomplete 
      disablePortal
      id="combo-box-demo"
      options={countries}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Countries"/>}
      onChange={(e,value)=>changeCountry(value.label)} 
    />
    </div>



    </div>
  );
}


export default App;
