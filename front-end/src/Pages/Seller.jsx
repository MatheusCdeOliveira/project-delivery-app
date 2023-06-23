import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../context/Context';
import Navbar from '../Components/NavbarSeller';
import convertDate from '../utils/convertDate';

const ITEM = 'seller_orders__element-order-id-';
const ADDRESS = 'seller_orders__element-card-address-';
const DATE = 'seller_orders__element-order-date-';
const PRICE = 'seller_orders__element-card-price-';
const STATUS = 'seller_orders__element-delivery-status-';

export default function Seller() {
  const navigate = useNavigate();
  const { getSalesBySellerId } = useContext(MyContext);
  const [salesByUserId, setSalesByUserId] = useState([]);

  useEffect(() => {
    const getSellerLocal = JSON.parse(localStorage.getItem('user') || {});
    async function awaitSeller() {
      if (getSellerLocal) {
        const response = await getSalesBySellerId(getSellerLocal.id);
        setSalesByUserId(response);
      }
    }
    awaitSeller();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {salesByUserId.map((sale, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => navigate(`/seller/orders/${sale.id}`) }
          >
            <div>
              <p data-testid={ `${ITEM}${sale.id}` }>{sale.id}</p>
              <p data-testid={ `${STATUS}${sale.id}` }>{sale.status}</p>
              <p data-testid={ `${DATE}${sale.id}` }>{convertDate(sale) }</p>
              <p data-testid={ `${PRICE}${sale.id}` }>{sale.totalPrice}</p>
              <p data-testid={ `${ADDRESS}${sale.id}` }>{sale.deliveryAddress}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
