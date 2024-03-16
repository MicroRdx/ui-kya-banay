import React, { useState } from 'react';

const NewItem = (props) => {
    const [enteredFoodItem, setEnteredFoodItem] = useState('');
    const foodItemChangeHandler = (event) => {
        setEnteredFoodItem(event.target.value);
    };
    const addItemButtonHandler = (event) => {
      props.onAdd(event, enteredFoodItem+'');
      setEnteredFoodItem('')
    }
    return (
        <div>
        <input type="text" id="foodItemInput"
            placeholder="Enter a food item"
            value={enteredFoodItem}
            onChange={foodItemChangeHandler}
        />
        <button onClick={addItemButtonHandler}  id="addItemButton">Add Item</button>
        </div>
    )

}

export default NewItem;