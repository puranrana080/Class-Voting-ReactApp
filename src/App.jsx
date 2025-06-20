import React, { useContext, useState } from "react";
import VotingForm from "./components/VotingForm.jsx";
import AppContext from "./context/AppContext.jsx";
import Modal from "./components/Modal.jsx";
import VoteSummary from "./components/VoteSummary.jsx";

const App = () => {
  const { showModal, setShowModal, totalVotes } = useContext(AppContext);

  return (
    <>
      <div className="container text-center my-5">
        <h1>Class Monitor Voting</h1>
        <h2>Total Votes: {totalVotes} </h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Vote
        </button>
        {showModal && <Modal></Modal>}
      </div>
      <hr />
      <div className="container voteSummary">
        <VoteSummary />
      </div>
    </>
  );
};

export default App;
