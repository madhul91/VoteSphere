require('dotenv').config();
const express = require('express');
const auth = require('./src/middlewares/auth');
const bcrypt = require('bcrypt');
require('./src/db/conn')
const Register = require('./src/models/register')
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

const allowedOrigins = ['https://vote-sphere-rdko.vercel.app'];

app.use(cors({
    origin: allowedOrigins,  // Allow requests only from this domain
    credentials: true,  // Allow cookies & authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));



  





// view engine path  
const template_path = path.join(__dirname , './templates/views')
const partials_path = path.join(__dirname , './templates/partials')

// setting up view engine
app.set('view engine',"hbs");
app.set("views" , template_path)
hbs.registerPartials(partials_path)




//Routes defining
app.get('/register' , (req,res)=>{
res.render('register')
})
app.post('/register' , async(req,res)=>{
   try{
       const registerUser = new Register({
           name : req.body.name,
           email:req.body.email,
           contact:req.body.contact,
           password:req.body.password,
           aadhar :req.body.aadhar,
       })

       const userExist = await Register.findOne({aadhar : registerUser.aadhar});
       if(userExist){
           res.status(422).json({error:"User already exists"})
       }
       else{

           
           
           const token = await registerUser.generateAuthToken();
           
           
           const registered = await registerUser.save();
           console.log("User Created Successfully");
           res.status(201).json({message:"Registered Successfully"});
        }
   }catch(e){
       console.log(e.message);
       res.status(400).send('user already exists with these creditentials')
   }
})


app.get('/login' , (req,res)=>{
    res.render('login')
    })

// app.post('/login' , async(req,res)=>{
// try{
//     const aadhar = req.body.aadhar;
//     const password = req.body.password;
//     const user = await Register.findOne({aadhar:aadhar});
//     const isMatch =  await bcrypt.compare(password, user.password);
//     const token = await user.generateAuthToken();
//     res.cookie("jwt" , token , {
//         expires:new Date(Date.now() + 600000),
//         httpOnly:true,
//     })
//     if(isMatch){
//         console.log('Login Successfull')
//         res.status(200).send('Logged in ')
//     }
// }
// catch(e){
//     console.log(e.message)
//     res.status(400).send('error logging in')

// }
// })
app.post('/login', async (req, res) => {
    try {
        const { aadhar, password } = req.body;

        const user = await Register.findOne({ aadhar });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = await user.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
        });

        console.log("Login Successful");
        res.status(200).json({ message: "Logged in", token });
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ error: "Error logging in" });
    }
});



app.get('/home' , async(req,res)=>{
    var array= new Array();

    const total = await Register.find({voteStatus:true}).count();
    array.push(total);
    const bjp = await Register.find({voted:{$elemMatch:{party:"bjp"}}}).count();
    array.push(bjp);
    
    const congress =  await Register.find({voted:{$elemMatch:{party:"congress"}}}).count();
    array.push(congress);


    const aap = await Register.find({voted:{$elemMatch:{party:"aap"}}}).count();
    array.push(aap);


    const ncp =  await Register.find({voted:{$elemMatch:{party:"ncp"}}}).count();
    array.push(ncp);

       
    const inld =  await Register.find({voted:{$elemMatch:{party:"inld"}}}).count();
    array.push(inld);

    //    console.log(array)
       res.status(200).json({total ,bjp, congress , aap , ncp , inld});
    // res.status(200).send(array)
})

app.get('/logout' ,auth,async(req,res)=>{
    try{
        req.user.tokens=[];
        res.clearCookie('jwt');
        await req.user.save();
        res.status(200).send();
    }catch(e){
        res.status(404).send('Login to access this page')
    }
})




// app.post('/voterecording',auth,async(req,res)=>{
//     try{
//         const aadhar = req.body.aadhar;
//         const password = req.body.password;
//         const user = await Register.findOne({aadhar:aadhar});
//         const isMatch = await bcrypt.compare(password,user.password);
//         if(isMatch){
//             if(user.voted.length !== 1){
//                 const registerVote = user.voting(req.body.party);
//                 console.log('success')
//                 res.send('done');
//             }
//             else{
//                 console.log('already voted')
//                 res.status(500).send('already voted')
//             }
//         }
//     }catch(e){
//         console.log('problem in voting')
//         res.status(404).send()
//     }
// })



app.post("/voterecording", auth, async (req, res) => {
  try {
    const { aadhar, password, party } = req.body;

    // Check if user exists
    const user = await Register.findOne({ aadhar });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if user has already voted
    if (user.voted.length === 1) {
      return res.status(400).json({ error: "You have already voted" });
    }

    // Record the vote (assuming `voting` is an async function in the model)
    await user.voting(party);
    console.log("Vote recorded successfully");

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (e) {
    console.error("Error in voting:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});




// listening to server
app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})
