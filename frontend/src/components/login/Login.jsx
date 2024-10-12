import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'

const Login = () => {
    const history = useHistory()

    const [aadhar , setAadhar] = useState('')
    // const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const LoginUser = async(e)=>{
localStorage.setItem("aadhar",aadhar)
localStorage.setItem("aadhar-password",password)

        e.preventDefault();
        const res = await fetch('/login' , {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                password,aadhar
            })

        });

        const data = res.json();
        if(res.status===400){
            alert("Wrong login creditentials")
        }
        else{
            alert("Logged in Successfull")
            history.push('/')
        }
    }
  return (
      <>
      <Container>
          <Form>

        <form method="POST">
                <div className="head">Login</div>

                    <div className="aadhar">
                <label htmlFor="aadhar">Aadhar Number</label>
                <input type="text" name="aadhar" id="aadhar" placeholder="Enter your aadhar number" value={aadhar} onChange={(e)=>setAadhar(e.target.value)}/>
                    </div>
                {/* <div className="email">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="name" placeholder="Enter your email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div> */}

                <div className="password">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>


                <button type="submit" onClick={LoginUser}>Login</button>
        </form>
          </Form>
      </Container>
      </>
  );
};

export default Login;
const Container = styled.div`
height:79vh;
width:100vw;
display:flex;
justify-content: center;
align-items: center;
`

const Form = styled.div`
height:60%;
width:30%;
border-radius:4px;
box-shadow:1px 1px 5px black;
border:2px solid black;
padding:2rem;



@media all and (max-width:1236px){
    width:40%;
}

@media all and (max-width:1000px){
    width:50%;
}

@media all and (max-width:900px){
    width:60%;
}

@media all and (max-width:800px){
    width:70%;
}
@media all and (max-width:700px){
    width:80%;
}
@media all and (max-width: 400px){
    width:90%;
    padding:0;
}



form{
display:flex;
flex-direction: column;
gap:1.4rem;
height:100%;

.password , .email , .aadhar {
    display:flex;
flex-direction: column;
padding:0px 2rem;
input{
    height:1.4rem;
}
}
.head{
    height:17%;
    display:flex;
    justify-content: center;
    align-items:center;
    font-size:1.8rem;
}

}

button{
    margin:0px 2rem;
    
    height:2rem;
    background:rgba(0,0,0,0.2);
    border:none;
    outline:none;
    cursor:pointer;
    border-radius:4px;
}


`