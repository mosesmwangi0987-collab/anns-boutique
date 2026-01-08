import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Boutique Admin Logic
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const SECRET_PASSWORD = "2286annadmin"; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Password!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post('/api/products', formData);
      alert('Product Added!');
      window.location.href = '/';
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Add New Dress</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Save Product'}</button>
      </form>
    </div>
  );
}


export default Admin;