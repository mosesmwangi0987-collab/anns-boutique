import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleWhatsAppOrder = (product) => {
    const phoneNumber = "+254722774122"; 
    const message = `Hello Ann's Boutique! 🌟 I'm interested in:\n- Item: ${product.name}\n- Price: KES ${product.price}\n- Link: ${window.location.href}\n\nIs this item still available?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
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
      
      {/* NAVBAR: Fixed Responsiveness */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 5%', 
        backgroundColor: '#fff', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        minHeight: '60px',
        gap: '10px' // Prevents elements from touching on tiny screens
      }}>
        <h2 style={{ 
          margin: 0, 
          color: '#d4af37', 
          fontSize: 'clamp(1rem, 4vw, 1.5rem)', // Fluid typography: shrinks on mobile
          whiteSpace: 'nowrap',
          flexShrink: 1
        }}>
          ANN'S BOUTIQUE
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Cart Icon: Responsive Pill Design */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: '#f0f0f0', 
            padding: '6px 14px', 
            borderRadius: '20px',
            cursor: 'pointer',
            border: '1px solid #e0e0e0'
          }}>
            <span style={{ fontSize: '1rem' }}>🛒</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#333' }}>0</span>
          </div>
        </div>
      </nav>

      <div style={{ padding: '30px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontWeight: '300', fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>
          Latest Collection
        </h1>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Loading styles...</p>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#d9534f', padding: '20px' }}>
            <p>Connection Error: {error}</p>
            <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Retry</button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
            gap: '25px',
            width: '100%'
          }}>
            {products.map((product) => (
              <div key={product._id} style={{ 
                backgroundColor: '#fff',
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease'
              }}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/350x450?text=Image+Coming+Soon"; }} 
                  style={{ width: '100%', height: '320px', objectFit: 'cover' }} 
                />
                
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', color: '#222' }}>{product.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.5', flexGrow: 1 }}>
                    {product.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', fontSize: '1.2rem', color: '#d4af37' }}>
                      KES {product.price.toLocaleString()}
                    </span>
                    <button 
                      onClick={() => handleWhatsAppOrder(product)}
                      style={{ 
                        backgroundColor: '#25D366', 
                        color: '#fff', 
                        border: 'none', 
                        padding: '10px 16px', 
                        borderRadius: '8px', 
                        cursor: 'pointer', 
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 5px rgba(37, 211, 102, 0.3)'
                      }}>
                      Order 📱
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;