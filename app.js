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
let output=[];
let currencyConvert=new CC();
output=currencyConvert.currencyCode;
app.get('/',async(req,res)=>{
    return res.status(200).send("Hello Welcome To Currency Converter App")
})
app.get('/api/converter',async(req,res)=>{
    try {
        const {source,target,value}=req.query;
        let currencyConvert=new CC();
        if(output.includes(source.toUpperCase()) && output.includes(target.toUpperCase())){
            currencyConvert.from(source).to(target).convert(parseFloat(value)).then((response)=>{
                if(response){
                 return res.status(200).json({
                     success:true,
                     Country:`${currencyConvert.currencies[source.toUpperCase()]} to ${currencyConvert.currencies[target.toUpperCase()]}`,
                     sourse:source,
                     target:target,
                     value:value,
                     convertedAmount:response
                 })
                }else{
                 return res.status(400).json({
                     success:false,
                     Country:`${currencyConvert.currencies[source.toUpperCase()]} to ${currencyConvert.currencies[target.toUpperCase()]}`,
                     sourse:source,
                     target:target,
                     value:value,
                     convertedAmount:"Conveted Error"
                 })
                }
             }).catch((error)=>{
                 return res.status(500).json({
                     success:false,
                     Country:`${currencyConvert.currencies[source.toUpperCase()]} to ${currencyConvert.currencies[target.toUpperCase()]}`,
                     sourse:source,
                     target:target,
                     value:value,
                     convertedAmount:error
                 })
             })
        }else{
            return res.status(501).json({
                success:false,
                Country:`${currencyConvert.currencies[source.toUpperCase()]} to ${currencyConvert.currencies[target.toUpperCase()]}`,
                sourse:source,
                target:target,
                value:value,
                convertedAmount:"Please Write The Suitable Symbol"
            })
        }
    } catch (error) {
        return res.status(401).json({
            success:false,
            convertedAmount:error
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
