import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [itemList, setItemList] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }

  function handleAddNewItem(newItem) {
    setItemList([...itemList, newItem]);
  }

  const itemsToDisplay = itemList
    .filter((item) => {
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleAddNewItem} />
      <Filter onCategoryChange={handleCategoryChange} search={searchTerm} onSearchChange={handleSearchChange} 
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
