import React, { useState, useEffect } from 'react';

import './App.css';
import NewItem from './components/NewItem/NewItem';
import FoodListItem from './components/FoodListItem/FoodListItem';
import Dialog from './components/UI/Dialog/Dialog';


function App() {
  const [items, setItems] = useState(['Item1', 'Item2']);
  // Loading initial Food List Items from backend
  useEffect(() => {
    fetch('https://vra-back.onrender.com/', {
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const savedItems = data.name.replaceAll(`'`, `"`);
        const localSavedItems = localStorage.getItem('foodItems');
        if (savedItems) {
          const localSavedItemsList = JSON.parse(localSavedItems);
          const savedItemsArray = JSON.parse(savedItems);
          // Store items in local storage
          let mergedItemsArray = savedItemsArray //[...foodList.children].map(item => item.textContent);
          if (localSavedItemsList) {
            mergedItemsArray = [...localSavedItemsList, ...savedItemsArray] //[...foodList.children].map(item => item.textContent);
          }
          const uniqueItemsArray = mergedItemsArray.filter((item, index) => mergedItemsArray.indexOf(item) === index);
          setItems(uniqueItemsArray);
          localStorage.setItem('foodItems', JSON.stringify(uniqueItemsArray));

        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Updating localStorage with backed 
  const updateNewItemsBackend = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "newValue": localStorage.getItem('foodItems')
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://vra-back.onrender.com/VRAFoods", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }


  const [selectedItem, setSelectedItem] = useState();

  const onSelectRandomDishHandler = (event) => {
    let randomIndex = Math.floor(Math.random() * items.length);
    // alert(items[randomIndex]);
    setSelectedItem(
      <Dialog
        titleText='Selected Item'
        selectedItem={items[randomIndex]}
        onSelection={setSelectedItem} >
      </Dialog>
    )

  }
  const handleRemoveItem = (e, itemName) => {
    console.log(e)
    console.log(itemName)
    const filteredItems = items.filter(item => item !== itemName)
    setItems([...filteredItems])
    localStorage.setItem('foodItems', JSON.stringify(filteredItems));
    updateNewItemsBackend();
  }
  const handleAddItem = (e, itemName) => {
    setItems((items) => {
      items.push(itemName);
      return items.map(i => i);
    });
    localStorage.setItem('foodItems', JSON.stringify(items));
    updateNewItemsBackend();
  }
  return (
    <div className="App">
      <h1>Kya Banay</h1>
      <NewItem onAdd={handleAddItem}></NewItem>

      <div className="verticalScroll">
        <ul id="foodList">
          {
            items.map((item) => {
              return (
                <FoodListItem key={item} itemName={item} handleDelete={handleRemoveItem} ></FoodListItem>
              )
            })
          }
        </ul>
      </div>
      <button style={{ marginTop: 0.5 + 'rem' }} id="selectRandomDishButton" onClick={onSelectRandomDishHandler}>
        Select Random Dish
      </button>
      {selectedItem}
    </div>
  );
}

export default App;
