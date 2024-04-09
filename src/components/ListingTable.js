import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import './scss/ListingTable.scss';

function ListingTable(props) {
  const [archivedItems, setArchivedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeEditableColumn, setActiveEditableColumn] = useState({});
  const [activeEditableColumnIndex, setActiveEditableColumnIndex] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const isAdmin = useSelector(state => state.isAdmin);

  useEffect(() => {
    const isEqual = Object.keys(editedValues).every(
      key => editedValues[key] === activeEditableColumn[key]
    );
    setIsSaveDisabled(isEqual);
  }, [editedValues, activeEditableColumn]);

  const handleEditClick = index => {
    if (isAdmin) {
      setIsModalOpen(true);
      setActiveEditableColumn(props.inventoryList[index]);
      setActiveEditableColumnIndex(index);
      setEditedValues({});
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleArchieveClick = index => {
    if (isAdmin) {
      setArchivedItems(prevArchivedItems => {
        if (prevArchivedItems.includes(index)) {
          return prevArchivedItems.filter(item => item !== index);
        } else {
          return [...prevArchivedItems, index];
        }
      });
    }
  };

  const handleDeleteClick = index => {
    if (isAdmin) {
      props.deleteRow(index);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setEditedValues(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
    if (fieldName === 'price' || fieldName === 'quantity') {
      const editedPrice = parseFloat(editedValues.price || activeEditableColumn.price.replace('$', ''));
      const editedQuantity = parseFloat(editedValues.quantity || activeEditableColumn.quantity);
      const newValue = editedPrice * editedQuantity;
      setEditedValues(prevState => ({
        ...prevState,
        value: newValue
      }));
    }
  };

  const handleSaveChanges = () => {
    const updatedColumn = {
      ...activeEditableColumn,
      ...editedValues
    };
    updatedColumn.value = `$${parseFloat(activeEditableColumn.price.replace('$', '')) * parseFloat(activeEditableColumn.value.replace('$', ''))}`
    if (typeof updatedColumn.price === 'string' && !updatedColumn.price.includes('$')) {
      updatedColumn.price = `$${updatedColumn.price}`;
    }
    if (typeof updatedColumn.value === 'string' && !updatedColumn.value.includes('$')) {
      updatedColumn.value = `$${updatedColumn.value}`;
    }
    props.updateColumn(activeEditableColumnIndex, updatedColumn);
    handleCloseModal();
  };

  return (
    <div>
      <div className="listing-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.inventoryList.map((row, index) => (
              <tr key={index} className={archivedItems.includes(index) ? 'archived' : ''}>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.price}</td>
                <td>{row.quantity}</td>
                <td>{row.value}</td>
                <td>
                  {isAdmin}
                  <div className="action">
                    <div className="icon" onClick={() => handleEditClick(index)}>
                      <EditRoundedIcon className={isAdmin ? 'admin-edit' : ''} />
                    </div>
                    <div className="icon" onClick={() => handleArchieveClick(index)}>
                      {archivedItems.includes(index) ? (
                        <VisibilityOffRoundedIcon className={isAdmin ? 'admin-archive' : ''} />
                      ) : (
                        <RemoveRedEyeRoundedIcon className={isAdmin ? 'admin-archive' : ''} />
                      )}
                    </div>
                    <div className="icon" onClick={() => handleDeleteClick(index)}>
                      <DeleteRoundedIcon className={isAdmin ? 'admin-delete' : ''} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <div className="modal-title">
              Edit Modal
            </div>
            <div className="modal-sub-title">
              {activeEditableColumn.name}
              Value will automatically update when u change price or quantity
            </div>
            <div className="input-feild">
              <div className="input-feild__section">
                <div className="input-feild__section-holder">
                  <label htmlFor="category">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    className="edit-box"
                    value={editedValues.category || activeEditableColumn.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                </div>
                <div className="input-feild__section-holder">
                  <label htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    className="edit-box"
                    value={editedValues.price || parseFloat(activeEditableColumn.price.replace('$', ''))}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
              </div>
              <div className="input-feild__section">
                <div className="input-feild__section-holder">
                  <label htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    className="edit-box"
                    value={editedValues.quantity || activeEditableColumn.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                  />
                </div>
                <div className="input-feild__section-holder">
                  <label htmlFor="value">
                    Value
                  </label>
                  <div className="edit-box">
                    {editedValues.value || parseFloat(activeEditableColumn.value.replace('$', ''))}
                  </div>
                </div>
              </div>
            </div>
            <div className="save-change">
              <button
                onClick={handleSaveChanges}
                disabled={isSaveDisabled}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingTable;
