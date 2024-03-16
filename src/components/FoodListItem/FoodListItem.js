import React, { useId } from "react";

const FoodListItem = (props) => {
    const foodItemID = useId();
    return (
        <li id={foodItemID}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p
                // style={{display: 'inline-block'}}
                >{props.itemName}</p>
                <div>
                <button
                    style={{ marginLeft: 1 + 'rem' }}
                    className="btn-Edit"
                    onClick={(e) => props.handleEdit(e, props.itemData)}
                >
                    Edit
                </button>
                <button
                    style={{ marginLeft: 1 + 'rem', backgroundColor: '#d11a2a' }}
                    className="btn-Delete"
                    onClick={(e) => props.handleDelete(e, props.itemData)}
                >
                    Delete
                </button>
                </div>
            </div>
        </li>

    )
}

export default FoodListItem;