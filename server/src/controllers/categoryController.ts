import Category from "../models/category/category";
import {Request, Response} from "express";


// add a category
export const addCategory = async (req: Request, res: Response) => {
  const { name, description,slug } = req.body;

  try {
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const newCategory = new Category({
      name,
        description,
      slug
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', savedCategory });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create category', details: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ message: 'Categories retrieved successfully', categories });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Unable to retrieve categories', details: error.message });
  }
};

// Get a single category
export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category retrieved successfully', category });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Unable to retrieve category', details: error.message });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description,slug } = req.body;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (name) {
      category.name = name;
    }
    if (description) {
      category.description = description;
    }
    if (slug) {
      category.slug = slug;
    }

    await category.save();
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update category', details: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully', category });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete category', details: error.message });
  }
};
