import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import api from "../../api/jwt";

function Add({ habbits, addHabit, editHabit }) {
  const [title, settitle] = useState("");
  const [frequency, setfrequency] = useState("");
  const [description, setdescription] = useState("");

  const navigate = useNavigate();
  const { abc: editid } = useParams();
  const isedit = Boolean(editid);
  const habitalreadyexist = habbits.find((item) => item._id === editid);

  useEffect(() => {
    if (editid && habitalreadyexist) {
      settitle(habitalreadyexist.title);
      setfrequency(habitalreadyexist.frequency);
      setdescription(habitalreadyexist.description || "");
    }
  }, [editid, habitalreadyexist]);

  const Submithabbits = async (e) => {
      e.preventDefault();
    try {
      if (editid) {
        await editHabit(editid, {
    title,
    frequency,
    description,
  });
        

      } 
      else {
        await addHabit({
          title,
          frequency,
          description,
        });
      }
        navigate("/");
    } catch (error) {
      console.log(error);
    }

  
  };

  function resetform() {
    settitle("");
    setfrequency("");
  }

  return (
    <div className="add-container">
      <form
        onSubmit= {Submithabbits}
      >
        <input
          placeholder="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          placeholder="daily/weekly/monthly/yearly"
          value={frequency}
          onChange={(e) => setfrequency(e.target.value)}
        />
        <input
          placeholder="description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />

        <button disabled={title.trim().length < 1}>
          {editid ? "Update" : "Add"}
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Add;
