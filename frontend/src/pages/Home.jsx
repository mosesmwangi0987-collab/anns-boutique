import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('All');
  
  const PHONE_NUMBER = "254722774122"; 

  const categories = ['All', 'Women', 'Kids', 'New Arrivals'];

 useEffect(() => {
    const fetchProducts = async () => {
      try {

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';
        
        console.log("Fetching from:", API_URL); // Helpful for debugging

        const { data } = await axios.get(API_URL);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        // Fallback dummy data...
        setProducts([
          { _id: '1', name: 'African Print Summer Dress', price: '4500', category: 'Women', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800' },
          { _id: '2', name: 'Nairobi Chic Wrap', price: '3800', category: 'Women', imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleWhatsApp = (p) => {
    const msg = `Hi Ann! I'm interested in the ${p.name}. Is it available?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:+${PHONE_NUMBER}`, '_self');
  };

  if (loading) return <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', color:'#8b4513'}}>Mambo! Ann's Boutique is loading...</div>;

  return (
    <div style={{ background: '#fffaf5', minHeight: '100vh', fontFamily: '"Playfair Display", serif', color: '#2c1810' }}>
      
      {/* TRUST BANNER */}
      <div style={{ background: '#2c1810', color: '#d4af37', padding: '8px', textAlign: 'center', fontSize: '0.65rem', letterSpacing: '2px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <span>🇰🇪 DELIVERY COUNTRYWIDE</span>
        <span>•</span>
        <span>📞 CALL TO ORDER: 0722774122</span>
      </div>

      <header style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', margin: 0, fontWeight: '500', color: '#2c1810', letterSpacing: '1px' }}>ANN'S BOUTIQUE</h1>
        <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#a0522d', marginTop: '10px' }}>Elegance • Quality • Style</p>
      </header>

      {/* STICKY NAV */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '15px 0', position: 'sticky', top: 0, background: 'rgba(255,250,245,0.95)', borderBottom: '1px solid #eee', zIndex: 10 }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCat(cat)}
            style={{ 
              background: 'none', border: 'none', fontSize: '0.75rem', fontWeight: activeCat === cat ? 'bold' : 'normal',
              color: activeCat === cat ? '#2c1810' : '#a0522d', textTransform: 'uppercase', cursor: 'pointer',
              borderBottom: activeCat === cat ? '2px solid #2c1810' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* PRODUCT GRID */}
      <main style={{ padding: '25px 15px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '25px' }}>
          {products.filter(p => activeCat === 'All' || p.category === activeCat).map(p => (
            <div key={p._id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}>
              
              {/* IMAGE AREA */}
              <div style={{ aspectRatio: '3/4', background: '#f0f0f0', position: 'relative' }}>
                <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>NEW</div>
              </div>

              {/* DETAILS AREA */}
              <div style={{ padding: '12px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '0.85rem', margin: '0 0 5px 0', fontWeight: '600', height: '35px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>{p.name}</h3>
                <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2c1810', margin: '0 0 12px 0' }}>KSh {Number(p.price).toLocaleString()}</p>
                
                {/* ACTION BUTTONS */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleCall()}
                    style={{ flex: 1, background: '#2c1810', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}
                  >
                    📞 Call
                  </button>
                  <button 
                    onClick={() => handleWhatsApp(p)}
                    style={{ flex: 2, background: '#25D366', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}
                  >
                    💬 WhatsApp
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ padding: '40px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#8b4513', background: '#f3e5d8', marginTop: '40px' }}>
        <p style={{ fontWeight: 'bold' }}>VISIT OUR SHOP</p>
        <p>Nairobi CBD</p>
        <p style={{ fontSize: '0.7rem', opacity: 0.7, marginTop:'20px' }}>© 2024 Ann's Boutique</p>
      </footer>
    </div>
  );
}

export default Home;