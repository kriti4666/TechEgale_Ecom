import { useEffect, useState } from 'react';
import Card from './Card';
import { BASE_URL } from '../App';

const Products = () => {
  const [inventory, setInventory] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customer/inventory`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }

        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error.message);
      }
    };

    fetchInventory();
  }, [token]);


console.log(inventory)


  return (
    <div className=' w-full p-10 border-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
      {inventory.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
