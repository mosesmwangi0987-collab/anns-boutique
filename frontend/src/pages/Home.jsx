import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- BUSINESS LOGIC: WhatsApp Ordering ---
  const handleWhatsAppOrder = (product) => {
    
    const phoneNumber = "+254722774122"; 
    const message = `Hello Ann's Boutique! 🌟 I'm interested in:
- Item: ${product.name}
- Price: KES ${product.price}
- Link: ${window.location.href}

Is this item still available?`;

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
      {/* Navigation Bar */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 5%', 
        backgroundColor: '#fff', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <h2 style={{ margin: 0, color: '#d4af37', letterSpacing: '2px' }}>ANN'S BOUTIQUE</h2>
        <div style={{ display: 'flex', gap: '20px', fontWeight: '500' }}>
          <span>New Arrivals</span>
          <span style={{ cursor: 'pointer' }} onClick={() => window.location.href='/admin'}>Admin Panel</span>
          <span style={{ position: 'relative' }}>🛒 Cart</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ padding: '40px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontWeight: '300' }}>Our Collection</h1>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading the latest collection...</p>
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
            <p>Connection Error: {error}</p>
            <button onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>Retry</button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '30px',
            width: '100%'
          }}>
            {products.map((product) => (
              <div key={product._id} style={{ 
                backgroundColor: '#fff',
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s'
              }}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  style={{ width: '100%', height: '350px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#333' }}>{product.name}</h3>
                    <p style={{ color: '#777', fontSize: '0.85rem', marginBottom: '15px', lineHeight: '1.4' }}>{product.description}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>KES {product.price}</span>
                    <button 
                      onClick={() => handleWhatsAppOrder(product)}
                      style={{ 
                        backgroundColor: '#25D366', 
                        color: '#fff', 
                        border: 'none', 
                        padding: '10px 16px', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        fontWeight: '600',
                        fontSize: '0.8rem'
                      }}>
                      Order via WhatsApp
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