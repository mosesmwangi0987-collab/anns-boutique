import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 1. Set a secret password here
  const SECRET_PASSWORD = "AnnsBoutique2024"; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Password! Access Denied.");
    }
  };

  // 2. If not logged in, show ONLY the password box
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#d4af37' }}>Boutique Management</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#d4af37', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Login to Admin
          </button>
        </form>
        <button onClick={() => window.location.href='/'} style={{ marginTop: '20px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          ← Back to Shop
        </button>
      </div>
    );
  }

  // 3. The rest of your existing Admin code goes here...
  // (The form for adding products, name, price, etc.)
  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
        {/* Your existing product upload form code */}
    </div>
  );
}