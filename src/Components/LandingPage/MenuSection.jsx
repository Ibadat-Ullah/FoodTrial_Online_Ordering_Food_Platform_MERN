import { useEffect, useRef, useState } from "react";
import foodController from "../../controllers/foodController";
import { useCart } from "../../context/useCart";

const menuItems = [
  {
    name: "Garden Salad",
    description: "Fresh greens, cherry tomatoes, and avocado.",
    price: "PKR 150",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Margherita Pizza",
    description: "Tomato, mozzarella, and fresh basil.",
    price: "PKR 1850",
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef, cheddar, lettuce, and tomato.",
    price: "PKR 580",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Creamy Pasta",
    description: "Pasta tossed in a creamy parmesan sauce.",
    price: "PKR 1600",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sushi Platter",
    description: "A fresh selection of sushi rolls.",
    price: "PKR 2800",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chicken Tacos",
    description: "Seasoned chicken, salsa, and lime.",
    price: "PKR 2500",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Grilled Salmon",
    description: "Grilled salmon served with fresh vegetables.",
    price: "PKR 3000",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chicken Sandwich",
    description: "Crispy chicken with lettuce and house sauce.",
    price: "PKR 1700",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Berry Pancakes",
    description: "Fluffy pancakes topped with fresh berries.",
    price: "PKR 890",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake with smooth ganache.",
    price: "PKR 750",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Avocado Toast",
    description: "Toasted sourdough topped with creamy avocado.",
    price: "PKR 1200",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "French Fries",
    description: "Golden crispy fries served with dipping sauce.",
    price: "PKR 1050",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  },
];

function MenuSection() {
  const { addItem } = useCart();
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState(menuItems);
  const [loadError, setLoadError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    foodController
      .list()
      .then(setItems)
      .catch((error) => {
        setLoadError(error.message);
      });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedItem && !dialog.open) dialog.showModal();
    if (!selectedItem && dialog.open) dialog.close();
  }, [selectedItem]);

  const visibleItems = showAll ? items : items.slice(0, 6);
  const selectedItemKey = selectedItem?._id || selectedItem?.name;
  const selection = selectedOptions[selectedItemKey] || {
    toppingOptions: [],
    addOns: [],
  };
  const optionGroups = selectedItem
    ? [
        {
          key: "toppingOptions",
          label: "Toppings",
          options: selectedItem.toppingOptions || [],
        },
        {
          key: "addOns",
          label: "Other optional add-ons",
          options: selectedItem.addOns || [],
        },
      ].filter((group) => group.options.length > 0)
    : [];
  const selectedToppings = (selectedItem?.toppingOptions || []).filter((option) =>
    selection.toppingOptions.includes(String(option._id)),
  );
  const selectedAddOns = (selectedItem?.addOns || []).filter((option) =>
    selection.addOns.includes(String(option._id)),
  );
  const selectedPrice = [...selectedToppings, ...selectedAddOns]
    .reduce((sum, option) => sum + option.price, 0);

  const toggleOption = (groupKey, optionId) =>
    setSelectedOptions((current) => {
      const currentSelection = current[selectedItemKey] || {
        toppingOptions: [],
        addOns: [],
      };
      const selectedIds = currentSelection[groupKey];
      return {
        ...current,
        [selectedItemKey]: {
          ...currentSelection,
          [groupKey]: selectedIds.includes(optionId)
            ? selectedIds.filter((id) => id !== optionId)
            : [...selectedIds, optionId],
        },
      };
    });

  const addSelectedItemToCart = () => {
    if (!selectedItem?._id || selectedItem.isAvailable === false) return;
    addItem({
      id: selectedItem._id,
      name: selectedItem.name,
      image: selectedItem.image,
      basePrice: selectedItem.price,
      toppingOptions: selectedToppings.map((option) => ({
        id: String(option._id),
        name: option.name,
        price: option.price,
      })),
      addOns: selectedAddOns.map((option) => ({
        id: String(option._id),
        name: option.name,
        price: option.price,
      })),
    });
    setSelectedOptions((current) => ({
      ...current,
      [selectedItemKey]: { toppingOptions: [], addOns: [] },
    }));
    setSelectedItem(null);
  };

  return (
    <>
      <section id="menu" className="scroll-mt-20 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Menu</h2>
            <p className="mt-2 text-gray-600">Fresh favorites made for you.</p>
          </div>

          {loadError && (
            <p role="alert" className="mb-4 text-center text-sm text-red-600">
              {loadError} Showing sample menu items.
            </p>
          )}
          {items.length === 0 && !loadError && (
            <p className="mb-4 text-center text-gray-600">
              No food items are available yet.
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <article
                key={item._id || item.name}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  aria-haspopup="dialog"
                  className="block w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <span className="shrink-0 font-semibold text-orange-600">
                        {typeof item.price === "number"
                          ? `PKR ${item.price.toFixed(2)}`
                          : item.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                </button>
              </article>
            ))}
          </div>

          {items.length > 6 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAll((currentValue) => !currentValue)}
                className="rounded-lg bg-orange-600 px-6 py-3 font-medium text-white hover:bg-orange-700"
              >
                {showAll ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="food-detail-title"
        onCancel={(event) => {
          event.preventDefault();
          setSelectedItem(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedItem(null);
        }}
        className="fixed m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-xl p-0 shadow-2xl backdrop:bg-black/60"
      >
        {selectedItem && (
          <div>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="h-56 w-full object-cover"
            />
            <div className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="food-detail-title" className="text-2xl font-bold text-gray-900">
                    {selectedItem.name}
                  </h2>
                  <p className="mt-2 text-gray-600">{selectedItem.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close food details"
                  className="rounded-full px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100"
                >
                  ×
                </button>
              </div>

              {selectedItem.portionSize && (
                <p className="text-sm text-gray-600">Portion: {selectedItem.portionSize}</p>
              )}
              {selectedItem.preparationTime && (
                <p className="text-sm text-gray-600">
                  Preparation: about {selectedItem.preparationTime} minutes
                </p>
              )}
              {selectedItem.ingredients?.length > 0 && (
                <p className="text-sm text-gray-600">
                  Ingredients: {selectedItem.ingredients.join(", ")}
                </p>
              )}
              {selectedItem.allergens?.length > 0 && (
                <p className="text-sm text-amber-800">
                  Allergens: {selectedItem.allergens.join(", ")}
                </p>
              )}
              {selectedItem.toppings?.length > 0 && (
                <p className="text-sm text-gray-600">
                  Toppings: {selectedItem.toppings.join(", ")}
                </p>
              )}

              {optionGroups.map((group) => (
                <fieldset key={group.key} className="space-y-2 rounded-lg border border-gray-200 p-3">
                  <legend className="px-1 text-sm font-medium text-gray-800">
                    {group.label}
                  </legend>
                  {group.options.map((option) => {
                    const optionId = String(option._id);
                    return (
                      <label key={`${group.key}-${optionId}`} className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={selection[group.key].includes(optionId)}
                          onChange={() => toggleOption(group.key, optionId)}
                          className="h-4 w-4"
                        />
                        <span>{option.name} (+PKR {option.price.toFixed(2)})</span>
                      </label>
                    );
                  })}
                </fieldset>
              ))}

              <div className="flex items-center justify-between border-t pt-4">
                <p className="font-semibold text-gray-900">
                  {typeof selectedItem.price === "number"
                    ? `PKR ${(selectedItem.price + selectedPrice).toFixed(2)}`
                    : selectedItem.price}
                </p>
                <button
                  type="button"
                  onClick={addSelectedItemToCart}
                  disabled={!selectedItem._id || selectedItem.isAvailable === false}
                  className="rounded-lg bg-orange-600 px-5 py-3 font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {!selectedItem._id
                    ? "Sample item"
                    : selectedItem.isAvailable === false
                      ? "Unavailable"
                      : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

export default MenuSection;
