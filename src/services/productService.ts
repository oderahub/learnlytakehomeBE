import Product from '../models/product';

export const createProduct = async (name: string, description: string, price: number, imageURL: string, createdBy: string) => {
  const product = await Product.create({ name, description, price, imageURL, createdBy });
  return product;
};

export const getProducts = async () => {
  const products = await Product.findAll();
  return products;
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const [affectedRows, [updatedProduct]] = await Product.update(updates, {
    where: { id },
    returning: true,
  });
  if (affectedRows === 0) throw new Error('Product not found');
  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const result = await Product.destroy({ where: { id } });
  if (result === 0) throw new Error('Product not found');
};
