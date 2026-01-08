import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading dress details...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>Item not found!</div>;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi Ann! I'm interested in the ${product.name} (KES ${product.price}). Is it available?`);
    window.open(`https://wa.me/254722774122?text=${message}`, '_blank');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px', cursor: 'pointer', border: 'none', background: '#eee', padding: '10px 20px', borderRadius: '5px' }}>
        ← Back to Shop
      </button>

      <div style={{ display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap: '40px' }}>
        {/* Left: Image */}
        <div style={{ flex: 1 }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', objectFit: 'cover' }} 
          />
        </div>

        {/* Right: Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px', color: '#333' }}>{product.name}</h1>
          <h2 style={{ color: '#d4af37', fontSize: '1.8rem', marginBottom: '20px' }}>KES {product.price.toLocaleString()}</h2>
          <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '20px' }} />
          <p style={{ lineHeight: '1.8', color: '#555', fontSize: '1.1rem', marginBottom: '30px' }}>
            {product.description}
          </p>
          
          <button 
            onClick={handleWhatsApp}
            style={{ 
              backgroundColor: '#25D366', color: 'white', padding: '18px', 
              border: 'none', borderRadius: '10px', fontSize: '1.2rem', 
              fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)' 
            }}
          >
            ORDER VIA WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;