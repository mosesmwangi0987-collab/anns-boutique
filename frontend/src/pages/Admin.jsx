import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState('');
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', category: 'Women' });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const SECRET_PIN = "196700"; 
  const CLOUD_NAME = "dgbin04ws"; 
  const UPLOAD_PRESET = "boutique_preset"; // 👈 DOUBLE CHECK: This MUST be "Unsigned" in Cloudinary!
  const API_URL = 'https://anns-boutique.onrender.com/api/products';

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setProducts(data);
    } catch (err) { 
      console.error("Fetch error", err); 
      setMessage('❌ Failed to load products');
    }
  };

  useEffect(() => { 
    if(isLoggedIn) fetchProducts(); 
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === SECRET_PIN) {
      setIsLoggedIn(true);
      setPin('');
    } else {
      alert("Wrong PIN! Please try again.");
      setPin('');
    }
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    // ⚠️ HARDCODE THE NAME HERE TO BE SAFE
    // Make sure this matches your Cloudinary "Upload Presets" name exactly
    data.append("upload_preset", "boutique_preset"); 

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select a photo first!");
    
    setUploading(true);
    setMessage('⏳ Uploading to shop...');
    
    try {
      // 1. Upload to Cloudinary (This part is working!)
      const imageUrl = await handleUpload();
      console.log("Image uploaded successfully:", imageUrl);

      // 2. Send to Render (This is where the 500 error happens)
      const productData = {
        name: form.name.trim(),
        price: Number(form.price), // 👈 CRITICAL: Converts "2300" to 2300
        category: form.category,
        imageUrl: imageUrl
      };

      await axios.post(API_URL, productData);

      setMessage('✅ Success! Item is now live.');
      setForm({ name: '', price: '', category: 'Women' });
      setImage(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      fetchProducts();
    } catch (err) {
      console.error("Full Error Object:", err.response?.data || err.message);
      setMessage(`❌ Server Error: ${err.response?.data?.message || 'Check Render Logs'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this product?')) return;
    
    try {
      await axios.delete(`${API_URL}/${productId}`);
      setMessage('✅ Product deleted successfully');
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      setMessage(`❌ Failed to delete product: ${err.response?.data?.message || err.message}`);
    }
  };

  // --- LOGIN VIEW ---
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#fffaf5', fontFamily: 'serif' }}>
        <h1 style={{ letterSpacing: '2px', color: '#2c1810' }}>MANAGEMENT ACCESS</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
          <input 
            type="password" 
            placeholder="Enter Secret PIN" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)}
            style={{ padding: '15px', textAlign: 'center', fontSize: '1.2rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '15px', background: '#2c1810', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            UNLOCK DASHBOARD
          </button>
        </form>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'serif' }}>
       <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2>Shop Manager</h2>
          <button onClick={() => setIsLoggedIn(false)} style={{ background:'none', border:'1px solid #ccc', padding:'5px 10px', borderRadius:'5px', cursor:'pointer' }}>Logout</button>
       </div>
      
      {message && <p style={{ background: '#fdf5e6', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #d4af37' }}>{message}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} />
        <input type="number" placeholder="Price (KSh)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} />
        
        <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}}>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="New Arrivals">New Arrivals</option>
        </select>

        <div style={{ border: '2px dashed #d4af37', padding: '20px', textAlign: 'center', borderRadius: '8px', background: '#fff' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>Product Photo:</p>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        </div>

        <button 
          type="submit" 
          disabled={uploading}
          style={{ padding: '15px', background: uploading ? '#ccc' : '#2c1810', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px' }}
        >
          {uploading ? 'UPLOADING...' : 'PUBLISH TO WEBSITE'}
        </button>
      </form>

      <h3 style={{ marginTop: '40px' }}>Current Inventory ({products.length})</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {products.map(p => (
          <div key={p._id} style={{ display: 'flex', gap: '15px', background: '#fff', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', alignItems: 'center' }}>
            <img src={p.imageUrl} width="60" height="60" style={{ objectFit: 'cover', borderRadius: '6px' }} alt={p.name} />
            <div style={{ flex: 1 }}>
               <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{p.name}</div>
               <div style={{ color: '#8b4513', fontSize: '0.85rem' }}>KSh {Number(p.price).toLocaleString()}</div>
            </div>
            <button onClick={() => handleDelete(p._id)} style={{ color: '#ff4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;