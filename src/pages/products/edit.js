import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import ProductForm from '../../components/ProductForm';
import axios from 'axios';

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
      };
      fetchProduct();
    }
  }, [id]);

  return (
    <>
      <Navbar />
      {product && <ProductForm product={product} />}
    </>
  );
};

export default EditProduct;
