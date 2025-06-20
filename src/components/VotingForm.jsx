import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const VotingForm = () => {
  const { setShowModal } = useContext(AppContext);

  const [formData, setFormData] = useState({
    studentName: "",
    votedTo: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e, formData) => {
    console.log("FOrmDtaa", formData);
    e.preventDefault();
    if (formData.studentName == "" || formData.votedTo == "")
      return alert("Enter data");
    try {
      const response = await fetch(
        "https://react-movie-http-dcf91-default-rtdb.firebaseio.com/votingData.json",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log("responseData", data);

      setShowModal(false);
      alert("Voted");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <form
        className="modal-row"
        onSubmit={(e) => handleFormSubmit(e, formData)}
      >
        <label htmlFor="voterName">Student Name:</label>
        <input
          type="text"
          id="voterName"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
        />
        <label htmlFor="votingTo">Choose Monitor:</label>

        <select
          className="select"
          id="votingTo"
          name="votedTo"
          value={formData.votedTo}
          onChange={handleChange}
        >
          <option disabled value="">
            Choose
          </option>
          <option value="Rohit">Rohit</option>
          <option value="Suresh">Suresh</option>
          <option value="Aman">Aman</option>
        </select>

        <button className="vote-btn btn btn-primary">Vote</button>
        <button
          className="close-btn btn btn-danger"
          onClick={() => setShowModal(false)}
        >
          x
        </button>
      </form>
    </>
  );
};

export default VotingForm;
