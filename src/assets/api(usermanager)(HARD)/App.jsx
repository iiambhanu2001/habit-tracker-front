
import React, { useEffect, useState } from "react";

function App() {
  const [list, setlist] = useState([]);
  const [title, setttile] = useState("");
  const [body, setbody] = useState("");
  const [selected, setselected] = useState(null);
  const[page,setpage]=useState(1)
  const API = `https://jsonplaceholder.typicode.com/posts/?_page={page}&_limit=10`;

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(API);
      const data = await res.json();

      setlist(data);
    }
    fetchdata();
  }, [page]);

  async function postadd() {
    if (selected) {
      const updated = { title, body };
      setlist(
        list.map((item) =>
          item.id === selected ? { ...item, ...updated } : item
        )
      );
      const res = await fetch(`API/${selected}`, {
        method: "PUT",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });
      setselected(null);
    }
    const newpost = {
      title: title,
      body: body,
      userId: 1,
    };

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newpost),
    });
    const data = await res.json();
    setlist([data, ...list]);
  }
  async function postdelete(val) {
    const res = await fetch(
      `API/${val}`,
      {
        method: "DELETE",
      }
    );
    setlist(list.filter((item) => item.id !== val));
  }
  function postedit(val) {
    const tasktoedit = list.find((item) => item.id === val);

    setttile(tasktoedit.title);
    setbody(tasktoedit.body);
    setselected(val);
  }

  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          postadd();
        }}
      >
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={(e) => setttile(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <br />
        <input
          type="text"
          value={body}
          placeholder="body"
          onChange={(e) => setbody(e.target.value)}
        />
        <button>{selected ? "Update" : "Add"}</button>
      </form>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
            <button onClick={() => postdelete(item.id)}>Delete</button>
            <button onClick={() => postedit(item.id)}>Edit</button>
            <hr />
          </li>
        ))}
      </ul>
      <button onClick={()=>setpage(page-1)} disabled={page===1}>prev</button>
      <button>{page}</button>
      <button onClick={()=>setpage(page+1)} >next</button>
    </div>
  );
}

export default App;
