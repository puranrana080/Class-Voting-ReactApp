import React, { useState ,useEffect} from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const [showModal, setShowModal] = useState(false);


const fetchVotingData=async()=>{

  try{
    const response=await fetch("https://react-movie-http-dcf91-default-rtdb.firebaseio.com/votingData.json")
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }
      const data = await response.json();
      console.log("Voting box",data)

  }
  catch(err){
    console.log(err)
    alert("Error in fecthing voting data")
  }
}

  useEffect(()=>{
    fetchVotingData()
  },[])
  

  

  return (
    <AppContext.Provider value={{ showModal, setShowModal }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
