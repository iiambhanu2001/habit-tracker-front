import React from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function Single({ habbits = [] }) {
  const { id } = useParams();

  const itemtoclick = habbits.find((item) => item.id === Number(id));

  if (!itemtoclick) {
    return <p>Loading habit...</p>;
  }
  function calculatestreak() {
    if (itemtoclick.history === 0) return 0;
    const sorted = itemtoclick.history
      .map((d) => new Date(d))
      .sort((a, b) => b - a);

    let streak = 1;
    let today = new Date(sorted[0]);
    console.log(today);
    for (let i = 1; i < sorted.length; i++) {
      const prevdate = new Date(sorted[i]);
      const diff = (today - prevdate) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
        today = prevdate;
      } else if (diff > 1) break;
    }
    return streak;
  }
  const streak = calculatestreak(itemtoclick.history);


  // making graph
  const completedcount=itemtoclick.history.length;
  const remain=30-completedcount;
  const pieData={
    labels:["Completed","Remaining"],
    datasets:[
      {
        data:[completedcount,remain],
        backgroundColor:["#4caf50","#ddd"]
      }
    ]
  }
  const days=Array.from({length:30}, (_,i)=>{
  const date=new Date();
  date.setDate(date.getDate()-(29-i));
const datastr=date.toISOString().slice(0,10)
const done=itemtoclick.history.includes(datastr)
return done;

  });
 return (
    <div className="single-dashboard">
      <div className="left-column">
        <h1>{itemtoclick.title}</h1>
        <p>Frequency: {itemtoclick.frequency}</p>
        <p>
          Completed:{" "}
          <span className={itemtoclick.iscompleted ? "completed" : "pending"}>
            {itemtoclick.iscompleted ? "Yes ✅" : "No ❌"}
          </span>
        </p>
        <p>History: {itemtoclick.history.join(", ") || "No activity yet"}</p>
        <p>
          <strong>Current Streak:</strong>{" "}
          <span className={`streak-badge ${streak >= 5 ? "long" : ""}`}>
            {streak} {streak === 1 ? "day" : "days"}
          </span>
        </p>
      </div>

      <div className="right-column">
        <h2>Completion Heatmap</h2>
        <div className="heatmap">
          {days.map((done, i) => (
            <div
              key={i}
              className={`heat-square ${done ? "done" : ""}`}
              title={`Day ${i + 1}`}
            ></div>
          ))}
        </div>

        <h2>Monthly Progress</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Single;