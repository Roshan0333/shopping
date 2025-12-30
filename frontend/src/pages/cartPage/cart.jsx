import { useEffect, useState } from "react";
import Styles from "./cart.module.css";
import axios from "axios";

function CartPage() {

    let [cartItems, setCartItems] = useState([]);

    const [cartItemDetail, setCartItemDetail] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const placeOrder = async () => {
        try {
            let response = await axios.post(
                "http://localhost:3000/api/v1/shopping/buyItem/cartBuy",
                {
                    itemList: cartItems
                }, {
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
                    alert(`Error: ${err.response.data.msg}`)
                }
                else {
                    console.log(`Error: ${err.response.data.error}`)
                }
            }
            else {
                console.log(`Error: ${err.message}`);
            }
        }
    }


    useEffect(() => {
        ; (
            async () => {
                try {
                    let response = await axios.get(
                        "http://localhost:3000/api/v1/shopping/cart/totalCartItem",
                        {
                            withCredentials: true
                        }
                    );

                    if (response.status === 200) {
                        setCartItems(response.data.itemList);
                        console.log(response.data.itemList)

                        const itemRequests = response.data.itemList.map(item =>
                            axios.get(
                                `http://localhost:3000/api/v1/shopping/item/getItem_ById?itemId=${item.itemId}`,
                                { withCredentials: true }
                            )
                        );

                        const itemResponses = await Promise.all(itemRequests);

                        const mergedData = itemResponses.map((item, index) => ({
                            ...item.data.itemDetail,
                            quantity: response.data.itemList[index].quantity,
                            totalPrice:
                                item.data.itemDetail.price *
                                response.data.itemList[index].quantity
                        }
                    ));

                    let grantPrice =0 ;
                    mergedData.map(item => {
                        console.log(item.totalPrice)
                        grantPrice = grantPrice+item.totalPrice
                    })

                    setTotalPrice(grantPrice)
                
                        setCartItemDetail(mergedData);
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
                    else {
                        console.log(`Error: ${err.message}`);
                    }
                }
            }
        )()
    }, [])

    return (
        <div className={Styles.cart_container}>

            <h2 className={Styles.title}>Your Cart 🛒</h2>

            {cartItemDetail.length === 0 ? (
                <p className={Styles.empty}>Your cart is empty</p>
            ) : (
                <>
                    {cartItemDetail.map((item, index) => (
                        <div key={index} className={Styles.cart_item}>
                            <img
                                src={`data:image/*;base64,${item.image}`}
                                alt={item.category}
                            />

                            <div className={Styles.item_info}>
                                <p className={Styles.category}>{item.category}</p>
                                <p className={Styles.description}>{item.description}</p>
                                <p key={index} className={Styles.Quantity}>Quantity: {item.quantity}</p>
                                <p className={Styles.price}>₹ {item.price}</p>
                            </div>
                        </div>
                    ))}

                    <div className={Styles.total_section}>
                        <h3>Total: ₹ {totalPrice}</h3>
                        <button
                            className={Styles.checkout_btn}
                            onClick={placeOrder}>
                            Place Order
                        </button>
                    </div>
                </>
            )}

        </div>
    );
}

export default CartPage;
