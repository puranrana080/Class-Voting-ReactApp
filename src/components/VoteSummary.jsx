import React, { useContext } from "react";
import AppContext from "../context/AppContext";

const VoteSummary = () => {
  const { voteData, handleDeleteVote } = useContext(AppContext);

  const groupedVotes = voteData.reduce((acc, curr) => {
    const candidate = curr.votedTo;
    if (!acc[candidate]) {
      acc[candidate] = { count: 0, voters: [] };
    }
    acc[candidate].count += 1;
    acc[candidate].voters.push(curr.studentName);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedVotes).map(([name, data]) => (
        <div key={name}>
          <h3>
            {name} - {data.count} votes
          </h3>
          <div>
            {data.voters.map((voter) => (
              <p key={voter}>
                {voter}{" "}
                <button
                  onClick={() => {
                    handleDeleteVote(voter);
                  }}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>{" "}
              </p>
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default VoteSummary;
