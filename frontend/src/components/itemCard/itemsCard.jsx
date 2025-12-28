import Styles from "./itemCard.module.css";
import { useNavigate } from "react-router-dom"

function ItemsCard({ itemData }) {

    let navigate = useNavigate();

    const shiftBuyPage = () => {
        navigate("/bugPage", { state: { itemData } });
    }

    return (
        <div className={Styles.item_card} onClick={shiftBuyPage}>
            <img src={`data:image/*;base64,${itemData.image}`} alt={itemData.category} className={Styles.item_image} />
            <div className={Styles.item_info}>
                <p className={Styles.item_category}>{itemData.category}</p>
                <p className={Styles.item_description}>{itemData.description}</p>
                <p className={Styles.item_price}>{itemData.price}</p>
            </div>
        </div>
    )
}

export default ItemsCard;