import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Pagination } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${selectedProductId}`);
      setProducts(products.filter((product) => product.id !== selectedProductId));
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <Container>
   
      <Grid container spacing={4} style={{ marginTop: 20 }}>
        {currentProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.images[0]} 
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => router.push(`/products/edit?id=${product.id}`)}
                  style={{ marginRight: 10 }}
                >
                  Edit
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleOpenDialog(product.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
      />

      
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductList;
