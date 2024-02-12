const express=require('express')
const cors=require('cors')
const CC = require('currency-converter-lt');
const bodyParser=require('body-parser')
require('dotenv').config()
const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
const PORT=process.env.PORT||4000;
let output;
app.get('/api/converter',async(req,res)=>{
    try {
        const {source,target,value}=req.query;
        let currencyConvert=new CC();
        currencyConvert.from(source).to(target).convert(parseFloat(value)).then((response)=>{
           if(response){
            return res.status(200).json({
                success:true,
                sourse:source,
                target:target,
                value:value,
                convetedAmount:response
            })
           }else{
            return res.status(400).json({
                success:false,
                sourse:source,
                target:target,
                value:value,
                convetedAmount:"Conveted Error"
            })
           }
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            sourse:source,
            target:target,
            value:value,
            convetedAmount:error
        })
    }

    // return res.status(200).json({
    //     name:name,
    //     id:id,
    //     age:age
    // })
})
app.listen(PORT,()=>{
    console.log(`App Are Listening at port ${PORT}`)
})
