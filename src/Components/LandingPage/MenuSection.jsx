import { useState } from "react";

const menuItems = [
  {
    name: "Garden Salad",
    description: "Fresh greens, cherry tomatoes, and avocado.",
    price: "$8.99",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Margherita Pizza",
    description: "Tomato, mozzarella, and fresh basil.",
    price: "$12.99",
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef, cheddar, lettuce, and tomato.",
    price: "$11.49",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Creamy Pasta",
    description: "Pasta tossed in a creamy parmesan sauce.",
    price: "$13.49",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sushi Platter",
    description: "A fresh selection of sushi rolls.",
    price: "$15.99",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chicken Tacos",
    description: "Seasoned chicken, salsa, and lime.",
    price: "$10.99",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Grilled Salmon",
    description: "Grilled salmon served with fresh vegetables.",
    price: "$17.99",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chicken Sandwich",
    description: "Crispy chicken with lettuce and house sauce.",
    price: "$9.99",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Berry Pancakes",
    description: "Fluffy pancakes topped with fresh berries.",
    price: "$8.49",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake with smooth ganache.",
    price: "$6.99",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Avocado Toast",
    description: "Toasted sourdough topped with creamy avocado.",
    price: "$7.99",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "French Fries",
    description: "Golden crispy fries served with dipping sauce.",
    price: "$4.99",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  },
];

function MenuSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? menuItems : menuItems.slice(0, 6);

  return (
    <section id="menu" className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Menu</h2>
          <p className="mt-2 text-gray-600">
            Fresh favorites made for you.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <span className="shrink-0 font-semibold text-orange-600">
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        {menuItems.length > 6 && (
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
  );
}

export default MenuSection;
