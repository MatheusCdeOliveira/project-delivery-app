const { Sale, SaleProduct, User } = require('../../database/models');

const createSale = async (body) => {
  const sale = await Sale.create({ ...body });
  return sale.id;
};

const createSaleProducts = async (saleId, saledProds) => {
  const sale = SaleProduct.create({ saleId, ...saledProds });
  return sale;
};

const getSalesByUserId = async (saleId) => {
  const sale = Sale.findAll(
    {
      where: { userId: saleId },
      include: [
        { model: SaleProduct, as: 'products' },
      ],
    },
  );
  return sale;
};

const findSaleById = async (id) => {
  try {
    const sale = await Sale.findByPk(id, {
      include: [
        { model: SaleProduct, as: 'products' },
        { model: User, as: 'seller' },
      ],
    });
    return sale;
  } catch (err) {
    throw new Error();
  }
};

module.exports = {
  createSale,
  createSaleProducts,
  getSalesByUserId,
  findSaleById,
};