import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image); // The actual file

    try {
      await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Dress uploaded successfully to the boutique!');
      window.location.href = '/';
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add New Inventory</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price (KES)" onChange={(e) => setPrice(e.target.value)} required />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
        
        <label>Upload Dress Photo:</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        
        <button type="submit" disabled={uploading} style={{ backgroundColor: '#d4af37', color: 'white', padding: '10px' }}>
          {uploading ? 'Uploading...' : 'SAVE TO SHOP'}
        </button>
      </form>
    </div>
  );
}

export default Admin;