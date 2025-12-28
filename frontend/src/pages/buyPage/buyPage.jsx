import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import Styles from "./buyPage.module.css";

function BuyPage() {

    const { state } = useLocation();

    const itemData = state?.itemData;

    const [quanity, setQuanity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(itemData.price)

    const increaseQuanity = () => {
        setQuanity(prev => prev + 1);
    }

    const decreaseQuanity = () => {
        if (quanity > 1) {
            setQuanity(prev => prev - 1);
        }
    }

    const itemsTotalPrice = () => {
        setTotalPrice(quanity * itemData.price);
    }

    useEffect(() => {

    }, [quanity])

    return (
        <div className={Styles.buy_container}>
            <div className={Styles.image_box}>
                <img src={`data:image/*;base64,${itemData.image}`} />
            </div>
            <div className={Styles.info_box}>
                <p>{itemData.category}</p>
                <p className={Styles.desc}>{itemData.description}</p>
                <p className={Styles.price}>{itemData.price}</p>
            </div>

            <div className={Styles.quantity_box}>
                <button onClick={increaseQuanity}>+</button>
                <span>{quanity}</span>
                <button onClick={decreaseQuanity}>-</button>
            </div>

            <div className={Styles.total_box}>
                <p>{totalPrice}</p>
                <button onClick={itemsTotalPrice} className={Styles.total_btn}>Total Price</button>
            </div>

        </div>
    )
}

export default BuyPage;