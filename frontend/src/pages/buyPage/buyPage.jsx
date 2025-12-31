import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import Styles from "./buyPage.module.css";
import axios from "axios";
import socket from "../../utilis/socket.js";
import { useNavigate } from "react-router-dom";

function BuyPage() {

    const { state } = useLocation();

    let Navigate = useNavigate();

    const itemData = state?.itemData;

    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(itemData.price);

    const [availableQty, setAvailableQty] = useState(itemData.itemQuantityAvailable);

    const increaseQuantity = () => {
        if(quantity < availableQty){
            setQuantity(prev => prev + 1);
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    }

    const itemsTotalPrice = () => {
        setTotalPrice(quantity * itemData.price);
    }

    const addCart = async () => {
        try {
            let response = await axios.post(
                "http://localhost:3000/api/v1/shopping/cart/addToCart",
                {
                    itemID: itemData._id,
                    quantity: quantity
                },
                {
                    withCredentials: true
                }
            )

            if (response.status === 200) {
                alert(response.data.msg)
            }
        }
        catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    alert(`Error: ${err.response.data.msg}`);
                }
                else if (err.response.status === 500) {
                    alert(`Error: ${err.response.data.error}`);
                    console.log(`Error: ${err.response.data.error}`);
                }
            }
            else {
                alert(`Error: ${err.message}`)
                console.log(`Error: ${err.message}`)
            }
        }
    }

    const placeOrder = async () => {
        try {
            let response = await axios.post(
                "http://localhost:3000/api/v1/shopping/buyItem/buy",
                {
                    itemID: itemData._id,
                    quantity: quantity
                },
                {
                    withCredentials: true
                }
            )

            if (response.status === 200) {
                alert(response.data.msg);
                Navigate("/itemPage");
                setQuantity(0)
            }
        }
        catch (err) {
            if (err.response) {
               alert(`Error: ${err.response.data.msg}`);
            }
            else {
                console.log(`Error: ${err.message}`);
            }
        }
    }

    useEffect(() => {

    }, [quantity])

    useEffect(() => {
        socket.emit("joinItemRoom", itemData._id);

        socket.on("quantityUpdate", (data) => {
            if (data.itemID === itemData._id) {
                setAvailableQty(data.available);
            }
        });

        return () => {
            socket.off("quantityUpdate");
        };
    }, [itemData._id]);

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
                <button onClick={increaseQuantity}>+</button>
                <span>{quantity}</span>
                <button onClick={decreaseQuantity}>-</button>
            </div>

            <div className={Styles.total_box}>
                <p>{totalPrice}</p>
                <button onClick={itemsTotalPrice} className={Styles.total_btn}>Total Price</button>
                <button
                    className={Styles.cart_btn}
                    onClick={addCart}
                >
                    Add to Cart
                </button>

                <button
                    className={Styles.place_order_btn}
                    onClick={placeOrder}
                >
                    Place Order
                </button>
            </div>

        </div>
    )
}

export default BuyPage;