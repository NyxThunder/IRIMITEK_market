import React from 'react';
import './Home.css';
import ProductCard from './ProductCard';
import MataData from '../layouts/MataData/MataData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layouts/loader/Loader';
import NotificationService, { NotificationContainer } from '../NotificationService';
import HomeSlider from './HomeSlider';
import FeaturedSlider from './FeatureSlider';
function Home() {
  // we provided all parameter for react-alert at index.js

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  React.useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MataData title="IRMITEK" />
            <div className="Home_Page">
              <div className="heroSlider_Home">
                <HomeSlider />;
              </div>
              <div className="feature" style={{ marginTop: '2.7rem' }}>
                <h2
                  style={{
                    textAlign: 'center',
                    fontFamily: `"Archivo", sans-serif`,
                    fontWeight: '800'
                  }}
                >
                  Featured Products
                </h2>
                {products && <FeaturedSlider products={products} />}
              </div>
              <h2 className="trending_heading">Trending Products</h2>
              <div className="trending-products">
                {products &&
                  products.map((product) => <ProductCard key={product._id} product={product} />)}
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}

export default Home;
