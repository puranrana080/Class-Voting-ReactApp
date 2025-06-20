import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voteData, setVoteData] = useState([]);

  const fetchVotingData = async () => {
    try {
      const response = await fetch(
        "https://react-movie-http-dcf91-default-rtdb.firebaseio.com/votingData.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      let savedVoteData = [];

      for (let key in data) {
        savedVoteData.push({
          id: key,
          studentName: data[key].studentName,
          votedTo: data[key].votedTo,
        });
      }
      setTotalVotes(savedVoteData.length);
      setVoteData(savedVoteData);
    } catch (err) {
      console.log(err);
      alert("Error in fecthing voting data");
    }
  };
  useEffect(() => {
    fetchVotingData();
  }, [showModal]);

  const handleDeleteVote = async (voterName) => {
    const voteToDelete = voteData.find((v) => v.studentName == voterName);
    if (!voteToDelete) return;
    const id = voteToDelete.id;
    try {
      await fetch(
        `https://react-movie-http-dcf91-default-rtdb.firebaseio.com/votingData/${id}.json`,
        {
          method: "DELETE",
        }
      );
      setVoteData((prev) => prev.filter((v) => v.id !== id));
      setTotalVotes((prev) => prev - 1);
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
        totalVotes,
        voteData,
        handleDeleteVote,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
