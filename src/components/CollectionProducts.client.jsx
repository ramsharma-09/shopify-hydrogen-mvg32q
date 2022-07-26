import ProductCard from "./ProductCard";
import { useState } from "react";

export default function CollectionProducts({ products }) {
  console.log(products);
  const [sortOrder, setSortOrder] = useState("title");
  const [filters, setFilters] = useState({});

  const activeFilters = Object.keys(filters).filter((key) => filters[key]);

  const sortedProducts = [...products];
  if (sortOrder === "title") {
    sortedProducts.sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  if (sortOrder === "price") {
    sortedProducts.sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      if (priceA < priceB) {
        return -1;
      }
      if (priceA > priceB) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <>
      <div className="flex mb-5">
        <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <Filter filters={filters} setFilters={setFilters} />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {sortedProducts
          .filter((product) => {
            return activeFilters.every((filter) => product[filter]);
          })
          .map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </>
  );
}

function Sort({ sortOrder, setSortOrder }) {
  const options = [
    { label: "Title", value: "title" },
    { label: "Price", value: "price" },
  ];
  return (
    <div className="mr-5">
      Sort:{" "}
      <select onChange={(e) => setSortOrder(e.target.value)}>
        {options.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
}

function Filter({ filters, setFilters }) {
  const handleFilterClick = (e) => {
    const newFilters = { ...filters };
    newFilters[e.target.value] = e.target.checked;
    setFilters(newFilters);
  };

  // See /collections/[handle].server.jsx for
  // madeInCanada field in query

  return (
    <p>
      Filter:{" "}
      <label className="mr-1">
        <input
          type="checkbox"
          value="madeInCanada"
          onClick={handleFilterClick}
        />{" "}
        Made in Canada
      </label>
      <label>
        <input
          type="checkbox"
          value="sustainable"
          onClick={handleFilterClick}
        />{" "}
        Sustainable
      </label>
    </p>
  );
}
