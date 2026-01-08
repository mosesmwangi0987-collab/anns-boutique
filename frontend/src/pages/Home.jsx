import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Added this for navigation

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleWhatsAppOrder = (e, product) => {
    e.preventDefault(); // Prevents clicking the button from opening the product page
    const phoneNumber = "+254722774122"; 
    const message = encodeURIComponent(`Hello Ann's Boutique! 🌟 I'm interested in ${product.name} (KES ${product.price}). Is it available?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      
      {/* RESPONSIVE NAVBAR */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '10px 5%', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky', top: 0, zIndex: 1000, minHeight: '60px'
      }}>
        <h2 style={{ margin: 0, color: '#d4af37', fontSize: 'clamp(1rem, 4vw, 1.5rem)', whiteSpace: 'nowrap' }}>
          ANN'S BOUTIQUE
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f0f0f0', padding: '6px 14px', borderRadius: '20px' }}>
            <span>🛒</span>
            <span style={{ fontWeight: 'bold' }}>0</span>
          </div>
        </div>
      </nav>

      {/* PRODUCT GRID */}
      <div style={{ padding: '30px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontWeight: '300' }}>Our Collection</h1>

        {loading ? ( <p style={{ textAlign: 'center' }}>Loading...</p> ) : error ? ( <p style={{ color: 'red' }}>Error: {error}</p> ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '25px', width: '100%' 
          }}>
            {products.map((product) => (
              <div key={product._id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
                {/* Clicking the image or name goes to Details */}
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    onError={(e) => { e.target.src="https://via.placeholder.com/350x450?text=Image+Coming+Soon"; }}
                    style={{ width: '100%', height: '320px', objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '15px' }}>
                    <h3 style={{ margin: '0 0 5px', fontSize: '1.1rem' }}>{product.name}</h3>
                    <p style={{ color: '#777', fontSize: '0.85rem', height: '40px', overflow: 'hidden' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                      <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>KES {product.price}</span>
                      <button 
                        onClick={(e) => handleWhatsAppOrder(e, product)}
                        style={{ backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Order 📱
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;