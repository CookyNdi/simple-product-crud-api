import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const wellcome = (req, res) => {
  res.status(200).json("hello world");
};

export const getAllProducts = async (req, res) => {
  try {
    const response = await prisma.products.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Product Not Found" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    await prisma.products.create({
      data: {
        name: name,
        price: price,
      },
    });
    res.status(201).json({ msg: "Product Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.products.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!product) return res.status(404).json({ msg: "Product Notfound" });
    await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        name: name,
        price: price,
      },
    });
    res.status(200).json({ msg: "Product Updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!product) return res.status(404).json({ msg: "Product Notfound" });

    await prisma.products.delete({
      where: {
        id: product.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
