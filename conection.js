const knex=require("knex")({
    client:"mysql",
    connection:{
        user:"root",
        host:"localhost",
        database:"Express_crud",
        password:"raja@123"
        
    }
})

knex.schema.createTable("crud",(table)=>{
    table.increments("id").primary()
    table.string("name").notNullable()
    table.string("email").unique().notNullable()
    table.string("password")
    table.integer("age")
})
.then(()=>{
    console.log("Your Table Is Created Succesfully...........!");
}).catch((err)=>{                
    console.log("Your Table Is All-Ready Exists..............!");
    //if you want see error then  you can cansol (err).
})

module.exports=knex
