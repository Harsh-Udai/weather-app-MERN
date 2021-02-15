import React,{Component,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  body:{
    display:'flex',
    justifyContent:'center',
    
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
  root1: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  ele:{
    textAlign:'center',
    fontSize:'150%'
  },
  button: {
    margin: theme.spacing(1),
  },
}));



export default function BasicTextFields() {
  const classes = useStyles();

 

  let [city, setCity]=useState({
    city:'',
    err:false,
    prog:false,
    forecast:{
      value:''
    }
  })

  let submitOn = (e)=>{
    e.preventDefault();
    console.log(city)
    let value = city.city.trim();
    // console.log(value);

    if(value==undefined  | value == ""){
      
      setCity({
        city:value,
        err: true,
        prog:city.prog,
        
      })
    }

    else{
      setCity({
        city:value,
        err: false,
        prog:!city.prog,
        
      })

      axios.get(`http://localhost:5000/weather?address=${value}`)
        .then((data)=>{
          
          setCity({
            forecast:{
              value:String(data.data.forecastData)
            }
          })
          console.log(city)

        })
        .catch((err)=>{
          console.log(err);
        })

      

      
    } 
    
    
  }

  let onChange = (e)=>{
    
    let value = e.target.value;
    
    setCity({
      city:value,
      err: city.err,
      prog:city.prog,
      
    });
    
  }

  return (
    
    <div>
      <p className={classes.ele}>Check Weather by just typing the name of City or place.</p>
      <form  className={classes.root}  >
        
        <TextField required id="outlined-basic" label="City Name" variant="outlined" onChange={onChange} />
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" onClick={(e)=>submitOn(e)}>
          Submit
        </Button>
        <br></br>
        <br></br>
        
      
      </form>
      <div className={classes.body}>
        <div className={classes.root}>
          {city.err ? 
              <Alert  severity="error">Write proper input — check it out!</Alert>
          : null}
        </div>
      </div>

     <div className={classes.body}> 
      <div className={classes.root1}>
          {city.prog ? <CircularProgress /> : null}
      </div>
      <div>
        {}
      </div>
     </div>
    </div>
    
  );
}
