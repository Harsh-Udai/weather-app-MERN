import React,{Component,useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


const useStyles = withStyles((theme) => ({
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



class BasicTextFields extends Component {
  
    constructor(props){
        super(props)
        this.state = {
            city:'',
            err:false,
            prog:false,
            forecast:{
                value:''
            }
        }
    }

    submitOn = (e)=>{
        e.preventDefault();
        console.log(this.state);
        let value = this.state.city.trim();
        console.log(value);

        if(value == undefined | value == ""){
          this.setState({
            err: true,
            prog:false,
            forecast:{
              value:''
            }
          })
        }
        else{
          this.setState({
            err:false,
            prog:true,
            forecast:{
              value:''
            }
          })

          axios.get(`http://localhost:5000/weather?address=${this.state.city}`)
            .then((data)=>{
              this.setState({
                forecast:{
                  value:data.data.forecastData
                },
                prog:false

                
              })
              console.log(this.state);
              
            })
            .catch((err)=>{
              console.log(err);
            })
        }
        console.log(this.state)
    }

//   submitOn = (e)=>{
//     e.preventDefault();
//     console.log(city)
//     let value = city.city.trim();
//     // console.log(value);

//     if(value==undefined  | value == ""){
      
//       setCity({
//         city:value,
//         err: true,
//         prog:city.prog,
        
//       })
//     }

//     else{
//       setCity({
//         city:value,
//         err: false,
//         prog:!city.prog,
        
//       })

//       axios.get(`http://localhost:5000/weather?address=${value}`)
//         .then((data)=>{
          
//           setCity({
//             forecast:{
//               value:String(data.data.forecastData)
//             }
//           })
//           console.log(city)

//         })
//         .catch((err)=>{
//           console.log(err);
//         })

      

      
//     } 
    
    
//   }

//   onChange = (e)=>{
    
//     let value = e.target.value;
    
//     setCity({
//       city:value,
//       err: city.err,
//       prog:city.prog,
      
//     });
    
//   };

    onChange = (e) =>{
        let value = e.target.value;

        this.setState({
            city:value
        })
        console.log(this.state)
    }


  render(){
    const classes = this.props;
    // const classes = useStyles();
    console.log(classes);
    return (
    

        <div>
          <p className={classes.ele}>Check Weather by just typing the name of City or place.</p>
          <form  className={classes.root}  >
            
            <TextField required id="outlined-basic" label="City Name" variant="outlined" onChange={this.onChange} />
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={(e)=>this.submitOn(e)}>
              Submit
            </Button>
            <br></br>
            <br></br>
            
          
          </form>
          <div className={classes.body}>
            <div className={classes.root}>
              {this.state.err ? 
                  <Alert  severity="error">Write proper input — check it out!</Alert>
              : null}
            </div>
          </div>
    
         <div className={classes.body}> 
          <div className={classes.root1}>
              {this.state.prog ? <CircularProgress /> : null}
          </div>
          <div>
            {this.state.forecast.value.length > 0 ? this.state.forecast.value : null  }
          </div>
         </div>
        </div>
        
      );
  }
}


export default (BasicTextFields)