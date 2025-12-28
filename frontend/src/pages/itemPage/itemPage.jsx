import { useEffect, useState } from "react";
import ItemsCard from "../../components/itemCard/itemsCard";
import axios from "axios";
import Styles from "./itemPage.module.css";

function ItemPage() {

    const [itemList, setItemList] = useState([]);
    const categoryList = ["T-Shirt", "Pants", "Jacket"];
    const [selectedCategory, setSelectedCategory] = useState("");

    let searchCategory = async() => {
        
        try{
            const AxiosResponse = await axios.get(
                `http://localhost:3000/api/v1/shopping/getItems?category=${selectedCategory.trim().toLowerCase()}`
            );

            if(AxiosResponse.status === 500){
                alert(AxiosResponse.data.error);
            }
            else{
                (AxiosResponse.data.msg === "Successfully")?setItemList(AxiosResponse.data.itemLists):alert(AxiosResponse.data.msg);
            }
        }
        catch(err){
            console.log(err.message)
        }
    }

    return (
        <div className={Styles.item_page}>
            <div className={Styles.filter_section}>
                <select className={Styles.category_select} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select the Category</option>
                    {categoryList.map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                    })}
                </select>
                <button className={Styles.search_btn} onClick={() => searchCategory()}>Search</button>
            </div>
            <div className={Styles.items_container}>
                {itemList.length > 0 ? (
                    itemList.map(item => (
                        <ItemsCard key={item._id} itemData={item} />
                    ))
                ) : (
                    <p className={Styles.empty_text}>No items available</p>
                )}
            </div>
        </div>
    )
}

export default ItemPage;