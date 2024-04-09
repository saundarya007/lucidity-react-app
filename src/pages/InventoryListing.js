import React, { useState, useEffect } from 'react';
import InfoWidges from "../components/InfoWidges";
import ListingTable from "../components/ListingTable";
import './scss/InventoryListing.scss';

function InventoryListing() {
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
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory', { signal });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();

        if (!signal.aborted) { // Check if the component is still mounted
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
        }
      } catch (error) {
        if (!signal.aborted) { // Check if the component is still mounted
          setError(error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Function to cancel the API call if the component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error.message}</div>;
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