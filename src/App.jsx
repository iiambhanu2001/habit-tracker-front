import { Routes, Route } from "react-router-dom";
import All from "./HabbitTracker/Page/All";
import Single from "./HabbitTracker/Page/Single";
import Add from "./HabbitTracker/Page/Add";
import { useEffect, useState } from "react";
import Header from "./HabbitTracker/Header";
import Footer from "./HabbitTracker/Footer";
import api from "../src/api/jwt";

import Login from "./auth/login";
import Signup from "./auth/signup";
import PrivateRoute from "./auth/private";

const App = () => {
  const [habbits, sethabbits] = useState([]);
   const [islogedin, setlogin] = useState(
    !!localStorage.getItem("token")
  );
  const fetchdata = async () => {
    try {
      const res = await api.get("/habits");

      sethabbits(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if(islogedin) {
    fetchdata();
    }
    else {
      sethabbits([  ])
    }
  }, [islogedin]);

  const addHabit = async (newhabit) => {
    if(!islogedin) {
      alert("Login First")
    }
    try {
      const res = await api.post("/habits", newhabit);

      sethabbits((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };
 

  const editHabit = async (id, editdata) => {
    try {
      await api.put(`/habits/${id}`, editdata);
      // sethabbits((prev) => {
      //   prev.map((item) => (item._id === id ? res.data : item));
      // });
      // return res.data;
      await fetchdata();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await api.delete(`/habits/${id}/`);

      sethabbits((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const markCompleted = async (id) => {
    try {
      const res = await api.put(`/habits/${id}/complete`);

      sethabbits((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-root">
      <Header
      islogedin={islogedin}
      setlogin={setlogin}
      />

      <main className="main-content container">
        <Routes>
          <Route path="/login" element={<Login setlogin={setlogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <All
                habbits={habbits}
                deleteHabit={deleteHabit}
                editHabit={editHabit}
                markCompleted={markCompleted}
              />
            }
          />
          <Route path="/single/:id" element={<Single habbits={habbits} />} />
          <Route
            path="/add/"
            element={<Add habbits={habbits} addHabit={addHabit} />}
          />

          <Route
            path="/edit/:abc"
            element={<Add habbits={habbits} editHabit={editHabit} />}
          />
         
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
