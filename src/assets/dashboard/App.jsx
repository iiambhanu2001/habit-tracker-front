import React, { useEffect, useState } from 'react';
import './App.css'; // optional CSS for styling

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch multiple APIs in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
        ]);

        const usersData = await usersRes.json();
        const postsData = await postsRes.json();

        setUsers(usersData);
        setPosts(postsData);
        setFilteredUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard</h1>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Posts</h3>
          <p>{posts.length}</p>
        </div>
        <div style={cardStyle}>
          <h3>Average Posts per User</h3>
          <p>{(posts.length / users.length).toFixed(2)}</p>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', fontSize: '16px' }}
      />

      {/* Users Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  flex: '1 1 200px',
  padding: '20px',
  borderRadius: '10px',
  background: '#f7f7f7',
  textAlign: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
};

const thStyle = { padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #ddd' };

export default Dashboard;
