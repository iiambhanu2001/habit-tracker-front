import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import ConfirmModal from "./Confirmdelete";

function All({ habbits = [], deleteHabit, markCompleted }) {
  const [filter, setfilter] = useState("All");

  const navigate = useNavigate();
  function funopen(val) {
    navigate(`/single/${val}`);
  }

  function changefreq(val) {
    setfilter(val);
  }

  const [toDeleteId, setToDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function askDelete(id) {
    setToDeleteId(id);
    setModalOpen(true);
  }

  function handleCancel() {
    setModalOpen(false);
    setToDeleteId(null);
  }

  function handleConfirm() {
    if (toDeleteId != null) {
      deleteHabit(toDeleteId);
    }
    setModalOpen(false);
    setToDeleteId(null);
  }
  const filterd = habbits.filter((item) => {
    if (filter === "All") return true;
    return item.frequency?.trim().toLowerCase() === filter.toLowerCase();
  });
  const frequencyColors = {
    Daily: "#fff8e1",
    Weekly: "#e1f5fe",
    Monthly: "#f3e5f5",
  };
  return (
    <div className="habbits">
      <h1>Add yours Habits</h1>
      <button onClick={() => navigate("/add")}>Add</button>

      <select name="filter" id="" onChange={(e) => changefreq(e.target.value)}>
        <option value="All">All</option>
        <option value="Monthly">Monthly</option>

        <option value="Weekly">Weekly</option>
        <option value="Daily">Daily</option>
      </select>
      <div className="habbit">
        <ul>
          {filterd.map((item) => (
            <li
              key={item._id}
              onClick={() => funopen(item._id)}
              data-frequency={item.frequency} 
              style={{
                textDecoration: item.iscompleted ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              <h1>{item.title}</h1>
              <h5>{item.description}</h5>
              <button
                onClick={(e) =>  {e.stopPropagation();markCompleted(item._id)}}
                disabled={(item.history || []).includes(
                  new Date().toISOString().slice(0, 10)
                )}
              >
                {(item.history || []).includes(
                  new Date().toISOString().slice(0, 10)
                )
                  ? "Completed ✓"
                  : "Done"}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  askDelete(item._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(`/edit/${item._id}`);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>

        <ConfirmModal
          open={modalOpen}
          message="Are you sure you want to delete this habit? This action cannot be undone."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default All;
