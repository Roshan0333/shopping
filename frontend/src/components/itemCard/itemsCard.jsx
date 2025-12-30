import Styles from "./itemCard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ItemsCard({ itemData }) {

    let navigate = useNavigate();

    const shiftBuyPage = () => {
        navigate("/bugPage", { state: { itemData } });
    }

    const addCart = async () => {
        try {
            let response = await axios.post(`http://localhost:3000/api/v1/shopping/cart/addToCart`,
                {
                    itemID: itemData._id,
                    quantity: 1
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )

            if (response.status === 200) {
                alert(response.data.msg);
            }

        }
        catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    alert(`Error: ${err.response.data.msg}`)
                }
                else if (err.response.status === 500) {
                    console.log(`Error: ${err.response.data.error}`)
                }
            }
        }
    }

    return (
        <div className={Styles.item_card} onClick={shiftBuyPage}>
            <div>
                <img src={`data:image/*;base64,${itemData.image}`} alt={itemData.category} className={Styles.item_image} />
                <div className={Styles.item_info}>
                    <p className={Styles.item_category}>{itemData.category}</p>
                    <p className={Styles.item_description}>{itemData.description}</p>
                    <p className={Styles.item_price}>{itemData.price}</p>
                </div>
            </div>

            <button
                className={Styles.add_to_cart_btn}
                onClick={addCart}
            >
                Add to Cart
            </button>
        </div>
    )
}

export default ItemsCard;