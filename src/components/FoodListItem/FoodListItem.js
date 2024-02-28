import React, { useId } from "react";

const FoodListItem = (props) => {
    const foodItemID = useId();
    return (
        <li id={foodItemID}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p
                // style={{display: 'inline-block'}}
                >{props.itemName}</p>
                <button
                    style={{ marginLeft: 1 + 'rem', backgroundColor: '#d11a2a' }}
                    className="btn-Delete"
                    onClick={(e) => props.handleDelete(e, props.itemData)}
                >
                    Delete
                </button>
            </div>
        </li>

    )
}

export default FoodListItem;