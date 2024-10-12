import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const Home = () => {
    const [userData , setUserData] = useState({});



    const loadData = async(e)=>{
        const res =await fetch('/home' , { 
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',


            },
            credentials:"include"
        })
        .then((data)=>data.json()).then((d)=>setUserData(d))
    }

    useEffect(()=>{
        loadData();
    },[])
  return (
      <>
      <Container>
            <Welcome>
                <div className="main">
                Welcome to the Online Voting System
                </div>
                <div className="down">
                    <div className="one">scroll down</div>
                    <div className="two">
                        v
                        </div> 
                    
                    </div>
            </Welcome>
            <LiveFeed>
                <Head>
                <h1>Live Stats</h1>
                </Head>
                <Stats>
                <Total>
                <h1>The total votes till date are : </h1>
                <h1 style={{color:'blue'}}>{userData.total}</h1>
                </Total>
                <PartyWise>
                <h1  className="partyWise">PartyWise vote are : </h1>
                <Grid>
                    <div className="party">
                        <h1>BJP</h1>
                        <img src="https://www.freepnglogos.com/uploads/bjp-logo-png/bjp-picture-png-logos-8.png" alt="" />
                        <h2>{userData.bjp}</h2>
                    </div>
                    <div className="party">
                    <h1>AAP</h1>
                        <img src="aap.png" alt="" className="aap"/>
                        <h2>{userData.aap}</h2>
                    </div>
                    <div className="party">
                    <h1>Congress</h1>
                        <img src="congress.png" alt="" />
                        <h2>{userData.congress}</h2>
                    </div>
                    <div className="party">
                    <h1>National Congress Party</h1>
                        <img src="inc.png" alt="" />
                        <h2>{userData.ncp}</h2>
                    </div>
                    <div className="party">
                    <h1>Indian National Lok Dal</h1>
                        <img src="inld.png" alt="" className="aap"/>
                        <h2>{userData.inld}</h2>
                    </div>
                </Grid>
                </PartyWise>
                </Stats>

            </LiveFeed>
      </Container>
      </>
  );
};

export default Home;
const Grid= styled.div`
display:grid;
grid-template-columns:repeat(3,33.33%);
div{
    box-shadow:1px 2px 5px black;
    height:50vh;
}

@media all and (max-width:1157px){
    grid-template-columns:repeat(2,50%);

}
@media all and (max-width:833px){
    grid-template-columns:1fr;

}

@media all and (max-width:395px){

    .aap{
        width:8rem;
    }
}

`
const PartyWise = styled.div`
width:100vw;
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:4rem;

.partyWise{
    height:10vh;
    @media all and (max-width:500px){
        font-size:1.4rem;
    }
}
div{
    margin:1rem;
    overflow:hidden;
    text-align:center;
    border:1px solid black;
    padding:2rem;
    h1{
        height:40%;
        font-size:1.3rem;
        
    }
    img{
        margin-bottom:2rem;
        height:40%;
       
        
    }
    h2{
        
        height:40%;
    }
}

@media all and (max-width:537px){
    padding:0rem;

}



`
const Total = styled.div`
width:100vw;
height:20vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
text-align:center;
@media all and (max-width:)
`
const Container = styled.div``
const Welcome = styled.div`
height:89.3vh;
background:rgba(0,0,0,0.2);
width:100%;
display:grid;
text-align:center;
grid-template-rows:50% 50%;


.main{

    font-size:4rem;
display:flex;
justify-content:center;
align-items:end;
@media all and (max-width:737px){
        font-size:3.5rem;
}
@media all and (max-width:650px){
        font-size:3rem;
}
@media all and (max-width:553px){
        font-size:2.6rem;
}
}
.down{
    display:flex;
    flex-direction:column;
    justify-content: end;
align-items:center;
padding-bottom:1rem;

.one{
font-size:1rem;
}

.two{
    animation-name: translate;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

}


`
const LiveFeed = styled.div``


const Head = styled.div`
width:100%;
height:20vh;
display:flex;
font-size:2.5rem;
justify-content:center;
color:red;
align-items:center;
@media all and (max-width:720px){
    font-size:2rem;
}
@media all and (max-width:400px){
    font-size:1.7rem;
}
@media all and (max-width:305px){
    font-size:1.5rem;
}
`
const Stats = styled.div``