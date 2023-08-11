import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CatalogCard.css';
import { setCurrentPlant } from '../../services/actions/currentPlant';

function CatalogCard(props) {
  const {plant } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function handleClick(plant) {
    console.log(plant);
    dispatch(setCurrentPlant(plant));
    navigate(`/catalog/:${plant.id}`);
  }
  
  return (
    <li className="catalogCard__card" onClick={() => handleClick(plant)}>
      <img src={plant.image} alt="Изображение цветка" className="catalogCard__image"/>
      <div className="catalogCard__text-container">
        <h3 className="catalogCard__title">{plant.name}</h3>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Советы по поливу:</p>
          <p className="catalogCard__text">{plant.watering.substring(7)}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Освещение:</p>
          <p className="catalogCard__text">{plant.light.substring(10)}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Температурный режим:</p>
          <p className="catalogCard__text">{plant.temperature.substring(13)}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Подбор горшка:</p>
          <p className="catalogCard__text">{plant.pot.substring(6)}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Отношения с животными:</p>
          <p className="catalogCard__text">{plant.pet_friendly}</p>
        </div>
      </div>
    </li>
  )
}

export default CatalogCard;
