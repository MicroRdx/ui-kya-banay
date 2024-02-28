import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import NewItem from './components/NewItem/NewItem';
import FoodListItem from './components/FoodListItem/FoodListItem';
import Dialog from './components/UI/Dialog/Dialog';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  // Backend API service domain link
  const server_url = "https://api-kya-banay.onrender.com";

  // UseState hooks
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  // Loading initial Food List Items from backend
  useEffect(() => {
    const getFoodsPromise = new Promise((resolve) =>
      fetch(server_url + '/getFoods', {
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Access-Control-Allow-Origin": "*"
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          resolve(data)
          const savedItems = data.results
          const localSavedItems = localStorage.getItem('foodItems');
          if (savedItems) {
            const localSavedItemsList = JSON.parse(localSavedItems);
            // Store items in local storage
            let mergedItemsArray = savedItems //[...foodList.children].map(item => item.textContent);
            if (localSavedItemsList) {
              mergedItemsArray = [...localSavedItemsList, ...savedItems] //[...foodList.children].map(item => item.textContent);
            }
            const uniqueItemsArray = []
            mergedItemsArray.forEach((item, i, arr) => {
              if (uniqueItemsArray.filter(uItem => item.id === uItem.id).length < 1) {
                uniqueItemsArray.push(item)
                // console.log(item)
              }
            });
            setItems(uniqueItemsArray);
            localStorage.setItem('foodItems', JSON.stringify(uniqueItemsArray));
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
    );

    toast.promise(getFoodsPromise, {
      pending: "Getting food items!",
      success: "Fetched food items!",
      error: "Couldn't fetch food items",
    });



  }, []);

  const onSelectRandomDishHandler = (event) => {
    let randomIndex = Math.floor(Math.random() * items.length);
    setSelectedItem(
      <Dialog
        titleText='Selected Item'
        selectedItem={items[randomIndex]}
        onSelection={setSelectedItem} >
      </Dialog>
    )

  }
  const handleRemoveItem = (e, itemData) => {
    console.log(e)
    console.log(itemData)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: itemData.id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(server_url + "/removeFoodItem", requestOptions)
      .then(response => response.text())
      .then(result => {
        const filteredItems = items.filter(item => item.id !== itemData.id)
        setItems([...filteredItems])
        localStorage.setItem('foodItems', JSON.stringify(filteredItems));
        console.log(result)
        toast.success("Removed item successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch(error => {
        toast.error("Error - Couldn't remove !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log('error', error)
      });



  }
  const handleAddItem = (e, itemName) => {
    // setNewFoodItem({
    //   id: "FD" + uuidv4().slice(-4),
    //   title: itemName
    // })

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var oNewItem = {
      id: "FD" + uuidv4(),
      title: itemName
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(oNewItem),
      redirect: 'follow'
    };

    fetch(server_url + "/addFoodItem", requestOptions)
      .then(response => response.text())
      .then(result => {

        setItems(items => {
          items.push(oNewItem)
          return [...items]
        });
        localStorage.setItem('foodItems', JSON.stringify(items));
        toast.success("Add added successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        // console.log(result)
      })
      .catch(error => {
        toast.error("Error - Couldn't Add !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log('error', error)
      });


    // updateNewItemsBackend();
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
                <FoodListItem key={item.id} itemData={item} itemName={item.title} handleDelete={handleRemoveItem} ></FoodListItem>
              )
            })
          }
        </ul>
      </div>
      <button style={{ marginTop: 0.5 + 'rem' }} id="selectRandomDishButton" onClick={onSelectRandomDishHandler}>
        Select Random Dish
      </button>
      {selectedItem}
      <ToastContainer />
    </div>
  );
}

export default App;
