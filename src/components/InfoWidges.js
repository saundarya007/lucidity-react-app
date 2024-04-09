import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import './scss/InfoWidges.scss';

function InfoWidges(props) {
  const items = [
    {
      id: 'totalProduct',
      image: <ShoppingCartRoundedIcon />,
      text: 'Total Product',
      value: props.widgesCount.totalProduct
    },
    {
      id: 'totalStoreValue',
      image: <CurrencyExchangeRoundedIcon />,
      text: 'Total Store Value',
      value: props.widgesCount.totalStoreValue
    },
    {
      id: 'outOfStock',
      image: <RemoveShoppingCartRoundedIcon />,
      text: 'Out Of Stock',
      value: props.widgesCount.outOfStock
    },
    {
      id: 'noOfCategory',
      image: <CategoryRoundedIcon />,
      text: 'Number Of Category',
      value: props.widgesCount.noOfCategory
    }
  ];

  return (
    <div className="info-widges">
      {items.map((item, index) => (
        <div key={index} className="info-widges__card">
          <div className="info-widges__card-title">
            { item.image }
            <div>
              { item.text }
            </div>
          </div>
          <div className="info-widges__card-count">
            { item.value }
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfoWidges;