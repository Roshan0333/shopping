import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ItemsCard from "../../components/itemCard/itemsCard";
import axios from "axios";
import Styles from "./itemPage.module.css";
import { Link } from "react-router-dom";

function ItemPage() {

    const [itemList, setItemList] = useState([]);
    const categoryList = ["T-Shirt", "Pants", "Jacket"];
    const [selectedCategory, setSelectedCategory] = useState("");

    const [cartCount, setCartCount] = useState(0);


    let searchCategory = async () => {

        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/shopping/item/getItems?category=${selectedCategory.trim().toLowerCase()}`,
                { withCredentials: true }
            );


            (response.data.msg === "Successfully") ? setItemList(response.data.itemLists) : console.log(response.data.msg);

        }
        catch (err) {
            if (err.response) {
                if (err.response) {
                    if (err.response.status === 401) {
                        alert(`Error: ${err.response.data.msg}`)
                    }
                    else if (err.response.status === 500) {
                        console.log(`Error: ${err.response.data.error}`)
                    }
                }
            }
            else if (err.request) {

                console.log("Server did not respond");
            }
            else {

                console.log(err.message);
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
                    )

                    let cartItems = response.data.itemList;
                    
                    setCartCount(cartItems.length);
                }
                catch (err) {
                    if (err.response) {
                        let responseStatus = err.response.status;

                        if (responseStatus === 401) {
                            alert(`Error: ${err.response.data.msg}`)
                        }
                        else if (responseStatus === 500) {
                            console.log(err.response.data.error)
                        }
                    }
                    else {
                        console.log(err.message)
                    }
                }
            }
        )()
    }, [])

    return (
        <div className={Styles.item_page}>

            {/* 🔝 Top Section */}
            <div className={Styles.top_bar}>

                <div className={Styles.filter_section}>
                    <select
                        className={Styles.category_select}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select the Category</option>
                        {categoryList.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>

                    <button
                        className={Styles.search_btn}
                        onClick={searchCategory}
                    >
                        Search
                    </button>
                </div>

                <div className={Styles.cart_icon_box}>
                    <Link to="/cartPage"><FaShoppingCart className={Styles.cart_icon} /></Link>
                    {cartCount > 0 && (
                        <span className={Styles.cart_count}>{cartCount}</span>
                    )}
                </div>

            </div>

            {/* 📦 Items */}
            <div className={Styles.items_container}>
                {itemList.length > 0 ? (
                    itemList.map(item => (
                        <ItemsCard
                            key={item._id}
                            itemData={item}
                            addToCart={() => setCartCount(prev => prev + 1)}
                        />
                    ))
                ) : (
                    <p className={Styles.empty_text}>No items available</p>
                )}
            </div>

        </div>
    );

}

export default ItemPage;