import React, { useState, useEffect } from 'react';
import InfoWidges from "../components/InfoWidges";
import ListingTable from "../components/ListingTable";

function InventoryListing() {
  const dummyResponse = [
    {
    "name": "Bluetooth",
    "category": "Electronic",
    "value": "$150",
    "quantity": 5,
    "price": "$30"
    },
    {
    "name": "Edifier M43560",
    "category": "Electronic",
    "value": "0",
    "quantity": 0,
    "price": "$0"
    },
    {
    "name": "Sony 4k ultra 55 inch TV",
    "category": "Electronic",
    "value": "$1190",
    "quantity": 17,
    "price": "$70"
    },
    {
    "name": "Samsumg 55 inch TV",
    "category": "Electronic",
    "value": "$600",
    "quantity": 50,
    "price": "$12"
    },
    {
    "name": "samsumg S34 Ultra",
    "category": "phone",
    "value": "0",
    "quantity": 0,
    "price": "$0"
    }
  ]
  const [inventoryList, setInventoryList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [widgesCount, setWidgesCount] = useState({
    totalProduct: 0,
    totalStoreValue: 0,
    outOfStock: 0,
    noOfCategory: 0
  });

  const deleteRow = index => {
    const updatedInventoryList = [...inventoryList];
    updatedInventoryList.splice(index, 1);
    setInventoryList(updatedInventoryList);
    const uniqueCategories = new Set(updatedInventoryList.map(item => item.category));
    setWidgesCount({
      totalProduct: updatedInventoryList.length,
      totalStoreValue: updatedInventoryList.reduce((total, item) => total + parseFloat(item.value.replace('$', '')) * item.quantity, 0),
      outOfStock: updatedInventoryList.filter(item => item.quantity === 0).length,
      noOfCategory: uniqueCategories.size
    });
  };
  const updateColumn = (index, col)  => {
    const updatedInventoryList = [...inventoryList];
    updatedInventoryList[index] = col;
    setInventoryList(updatedInventoryList);
    const uniqueCategories = new Set(updatedInventoryList.map(item => item.category));
    setWidgesCount({
      totalProduct: updatedInventoryList.length,
      totalStoreValue: updatedInventoryList.reduce((total, item) => total + parseFloat(item.value.replace('$', '')) * item.quantity, 0),
      outOfStock: updatedInventoryList.filter(item => item.quantity === 0).length,
      noOfCategory: uniqueCategories.size
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://9c7becb8dfe2420e9e7e5f3ff4352700.api.mockbin.io/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = dummyResponse;
        setInventoryList(jsonData);
        if (jsonData.length) {
          const uniqueCategories = new Set(jsonData.map(item => item.category));
          setWidgesCount({
            totalProduct: jsonData.length,
            totalStoreValue: jsonData.reduce((total, item) => total + parseFloat(item.value.replace('$', '')) * item.quantity, 0),
            outOfStock: jsonData.filter(item => item.quantity === 0).length,
            noOfCategory: uniqueCategories.size
          });
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="inventory-listing">
      <InfoWidges widgesCount={widgesCount} />
      <ListingTable
        inventoryList={inventoryList}
        deleteRow={deleteRow}
        updateColumn={updateColumn}
      />
    </div>
  );
}

export default InventoryListing;