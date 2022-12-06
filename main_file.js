
const express=require("express");
const app=express();
const knex=require('./conection');
const port=3000
const {genrateToken,veryfyToken}=require("./authantication");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


app.listen(port,()=> {
    console.log("server listing...")
});
 
// insert data.

app.post("/insert",async(req,res) => {
    try{
        await knex("crud").insert(req.body)
        res.send({data:req.body,massage:"your data inserted successfuly.."});
    }
    catch (error){
        res.send("Your Data Is Not Inserted........!");
    }

})


// login ...............*.................// signup;

app.get("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const info=await knex("crud");
        const email_pass = [];
        for(let Emailpassword of info){
            email_pass.push(Emailpassword.email);
            email_pass.push(Emailpassword.password);
        };
        if(email_pass.includes(email)){
            if(email_pass.includes(password)){
                console.log('login successful');
                
                const token1=genrateToken(email);
                console.log(token1);
                res.cookie('user',token1)
                // res.send('we done')
                res.send('login successfull...');
            }else{
                console.log('password is wrong');
            }
        }else{
            console.log('Email is wrong');
        }
    }
    catch (error){
        res.send(error.massage)
        console.log(error);
    };
})

// Display all Data.......

app.get("/read",async(req,res)=>{
    try{
        const info=await knex("crud")
        res.send(info)
    }
    catch(error){
        res.send("something here wrong.....! ")
    }
})

// Display single Data......

app.get("/single_data/:id",veryfyToken,async(req,res)=>{
    try{
        const info=await knex("crud").where({id:req.params.id})
        res.send(info)

    }catch(error){
        res.send(error)

    }
})

// update data..

app.patch("/update/:id",veryfyToken,async(req,res)=>{
    try{
        const info=await knex("crud").where({id:req.params.id}).update(req.body)
        res.send(200)
        console.log("your data updated succesfully....!");

    }
    catch(error){
        res.send(error)
    }
})

// delete data.....

app.delete("/delete/:id",veryfyToken,async(req,res)=>{
    try{
        const info=await knex("crud").where({id:req.params.id}).delete(req.body)
        res.send(200)
        console.log("your data is deleted succesfully....!");
    }
    catch(error){
        res.send(error)
    }
})



