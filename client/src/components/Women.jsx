import { useState, useEffect } from 'react';
import womenShoppingImg from '../assets/women shopping.avif'; // Make sure the path is correct

function Women({ cart, setCart }) {
  const [likes, setLikes] = useState({});
  const [womenProducts, setWomenProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:https://draipe-backend.onrender.com/api/products/women?page=${page}&limit=50`)
      .then(res => res.json())
      .then(data => {
        setWomenProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const toggleLike = (id) => {
    setLikes(likes => ({ ...likes, [id]: !likes[id] }));
  };

  const addToCart = (product) => {
    setCart(cart => [...cart, product]);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={womenShoppingImg}
        alt="Women Shopping"
        style={{
          position: 'fixed',
          top: '100px',
          right: '0',
          height: '90vh',
          zIndex: 0,
          objectFit: 'contain',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(2px)',
          border: 'none',
          pointerEvents: 'none', // allow clicks to pass through
          userSelect: 'none',
        }}
      />

      <h2 style={{ textAlign: 'left', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        Women’s Collection
      </h2>
      <div style={{ paddingRight: '300px' }}>
        <div
          className="product-grid"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}
        >
          {womenProducts.map(product => (
            <div
              key={product._id}
              className="product-card"
              style={{
                flex: '0 0 180px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                minHeight: 320,
              }}
            >
              <button
                className="like-btn"
                onClick={() => toggleLike(product._id)}
                style={{
                  alignSelf: 'flex-end',
                  background: 'none',
                  border: 'none',
                  fontSize: 20,
                  cursor: 'pointer',
                  marginBottom: 8,
                }}
                aria-label={likes[product._id] ? 'Unlike' : 'Like'}
              >
                {likes[product._id] ? '❤️' : '🤍'}
              </button>
              <img
                src={product.images}
                alt={product.name}
                className="product-img"
                style={{
                  width: '100%',
                  height: 140,
                  objectFit: 'cover',
                  borderRadius: 6,
                  marginBottom: 12,
                }}
              />
              <div
                className="product-info"
                style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
              >
                <div
                  className="product-name"
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    marginBottom: 6,
                    minHeight: 40,
                  }}
                >
                  {product.name}
                </div>
                <div
                  className="product-price"
                  style={{ color: '#333', marginBottom: 12 }}
                >
                  ₹{product.price}
                </div>
                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                  style={{
                    marginTop: 'auto',
                    padding: '8px 12px',
                    border: 'none',
                    backgroundColor: '#000000ff',
                    color: '#fff',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{
            marginRight: 12,
            padding: '8px 16px',
            borderRadius: 4,
            border: '1px solid #ccc',
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            color: page === 1 ? '#ccc' : '#222',
            backgroundColor: 'white',
          }}
        >
          Prev
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={{
            marginLeft: 12,
            padding: '8px 16px',
            borderRadius: 4,
            border: '1px solid #ccc',
            cursor: page === totalPages ? 'not-allowed' : 'pointer',
            color: page === totalPages ? '#ccc' : '#222',
            backgroundColor: 'white',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Women;
