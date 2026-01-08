import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Opening the Boutique...</h2>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <nav style={{ background: '#fff', padding: '1rem 5%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#d4af37', margin: 0 }}>ANN'S BOUTIQUE</h1>
      </nav>

      <div style={{ padding: '2rem 5%' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p>No dresses yet!</p>
            <Link to="/admin" style={{ color: '#d4af37' }}>Go to Admin to Add Products</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {products.map((product) => (
              <Link to={`/product/${product?._id}`} key={product?._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={product?.imageUrl} style={{ width: '100%', height: '300px', objectFit: 'cover' }} alt="" />
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ margin: 0 }}>{product?.name}</h3>
                    <p style={{ fontWeight: 'bold' }}>KES {product?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;