import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Avatar, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../pages/api/CategoryApi'; // Import API functions

const CategoryList = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddCategory = async () => {
    try {
      await addCategory(newCategory);
      setNewCategory('');
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await updateCategory(editingCategory.id, updatedCategoryName);
      setEditingCategory(null);
      setUpdatedCategoryName('');
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      const data = await fetchCategories();
      setCategories(data);
      handleCloseConfirmDialog();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleOpenConfirmDialog = (category) => {
    setCategoryToDelete(category);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCategoryToDelete(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Categories</Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} style={{ alignItems: 'center' }}>
            <Avatar 
              src={category.image} 
              alt={category.name} 
              style={{ width: 50, height: 50, marginRight: 16 }}
            />
            <ListItemText primary={category.name} />
            <Button onClick={() => {
              setEditingCategory(category);
              setUpdatedCategoryName(category.name);
            }}>Edit</Button>
            <Button onClick={() => handleOpenConfirmDialog(category)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        fullWidth
      />
      <Button onClick={handleAddCategory} color="primary">Add Category</Button>

      {editingCategory && (
        <div>
          <TextField
            label="Update Category Name"
            value={updatedCategoryName}
            onChange={(e) => setUpdatedCategoryName(e.target.value)}
            fullWidth
          />
          <Button onClick={handleUpdateCategory} color="primary">Update</Button>
        </div>
      )}
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>

      
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the category "{categoryToDelete?.name}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">Cancel</Button>
          <Button
            onClick={() => {
              if (categoryToDelete) {
                handleDeleteCategory(categoryToDelete.id);
              }
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoryList;
