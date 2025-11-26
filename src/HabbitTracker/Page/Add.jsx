import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Add({ habbits, addHabit, editHabit }) {
  const [inputval, setinputval] = useState("");
  const [freq, setfreq] = useState("");
  const [des, setDes] = useState("");

  const navigate = useNavigate();
  const { abc } = useParams();
  const editid = Number(abc);

  ///add funciton habit

  useEffect(() => {
    if (editid) {
      const itemtobedit = habbits.find((item) => item.id === editid);
      if (itemtobedit) {
        setinputval(itemtobedit.title);
        setfreq(itemtobedit.frequency);
      }
    }
  }, [editid]);
  function Submithabbits() {
    if (editid) {
      editHabit(editid, { title: inputval, frequency: freq, Description: des });
    } else {
      addHabit({
        id: Date.now(),
        title: inputval,
        frequency: freq,
        iscompleted: false,
        history: [],
        Description: des,
      });
    }
    navigate("/");
  }
  function resetform() {
    setinputval("");
    setfreq("");
  }

  return (
    <div className="add-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Submithabbits();
        }}
      >
        <input
          placeholder="title"
          value={inputval}
          onChange={(e) => setinputval(e.target.value)}
        />
        <input
          placeholder="freq"
          value={freq}
          onChange={(e) => setfreq(e.target.value)}
        />
        <input
          placeholder="Description"
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />

        <button disabled={inputval.trim().length < 1}>
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
