import { Routes, Route } from "react-router-dom";
import All from "./HabbitTracker/Page/All";
import Single from "./HabbitTracker/Page/Single";
import Add from "./HabbitTracker/Page/Add";
import { useEffect, useState } from "react";
import Header from "./HabbitTracker/Header";
import Footer from "./HabbitTracker/Footer";

const App = () => {
  // stateuplifitn
  const [habbits, sethabbits] = useState(() => {
    try {
      const saved = localStorage.getItem("items");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load habits:", error);
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(habbits));
  }, [habbits]);

  const addHabit = (newhabit) => sethabbits([...habbits, newhabit]);

  const editHabit = (id, editdata) =>
    sethabbits(
      habbits.map((item) => (item.id === id ? { ...item, ...editdata } : item))
    );

  const deleteHabit = (id) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
    // if (!confirmDelete) return;

    sethabbits(habbits.filter((item) => item.id !== id));
  };

  const markCompleted = (id) => {
    const today = new Date().toISOString().slice(0, 10);

    sethabbits((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const history = Array.isArray(item.history) ? [...item.history] : [];
        if (history.includes(today)) {
          return { ...item, iscompleted: true };
        }
        history.push(today);
        return {
          ...item,
          iscompleted: true, // Always mark completed for today
          history: history,
        };
      })
    );
  };

  return (
    <div className="app-root">
      <Header />

      <main className="main-content container">
        <Routes>
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
