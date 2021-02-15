const express =  require('express');
const app = express();
const port = process.env.PORT || 5000;
const geocode = require('./src/geocode');
const forecast = require('./src/forecast');
const cors = require('cors');


app.use(cors());


app.get('/',(req,res)=>{
    res.send("hello");
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "No address"
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error})
        }
    
        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            
            else{
                return res.send ({
                    forecastData: forecastData,
                    address: req.query.address
                })
            }
        })
    })
     
})

app.listen(port,()=>{
    console.log("Server Started");
})