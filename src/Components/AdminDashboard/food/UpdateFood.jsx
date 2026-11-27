import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import foodController from "../../../controllers/foodController";
import { isValidPricedOptionInput } from "../../../utils/addOnInput";

const optionalText = z.string().trim().min(2, "Use at least 2 characters.").max(80, "Value is too long.").or(z.literal(""));
const optionalImage = z.custom(
  (files) =>
    !files?.length ||
    (typeof FileList !== "undefined" &&
      files instanceof FileList &&
      files.length === 1 &&
      ["image/jpeg", "image/png", "image/webp"].includes(files[0].type) &&
      files[0].size <= 4 * 1024 * 1024),
  "Choose a JPEG, PNG, or WebP image up to 4 MB.",
);
const schema = z.object({
  foodId: z.string().trim().min(1, "Enter a food ID.").max(64, "Food ID is too long."),
  name: optionalText,
  category: z.string().trim().min(2, "Use at least 2 characters.").max(40, "Category is too long.").or(z.literal("")),
  description: z.string().trim().min(10, "Use at least 10 characters.").max(500, "Description is too long.").or(z.literal("")),
  price: z.union([z.literal(""), z.coerce.number().finite().positive("Price must be greater than zero.").max(100000, "Price is too high.")]),
  image: optionalImage,
  isAvailable: z.enum(["", "true", "false"]),
  preparationTime: z.union([
    z.literal(""),
    z.coerce.number().int().min(1, "Use at least 1 minute.").max(240, "Preparation time cannot exceed 240 minutes."),
  ]),
  portionSize: z.string().trim().max(60, "Portion size is too long."),
  ingredients: z.string().max(500, "Ingredients are too long."),
  allergens: z.string().max(500, "Allergen notes are too long."),
  toppings: z.string().max(500, "Toppings are too long."),
  toppingOptions: z.string().max(1200, "Topping options are too long.").refine(
    isValidPricedOptionInput,
    "Use one `Name: price` option per line (up to 20).",
  ),
  addOns: z.string().max(1200, "Add-on options are too long.").refine(
    isValidPricedOptionInput,
    "Use one `Name: price` option per line (up to 20).",
  ),
  clearAddOns: z.boolean(),
  clearToppingOptions: z.boolean(),
}).refine(
  ({ name, category, description, price, image, isAvailable, preparationTime, portionSize, ingredients, allergens, toppings, toppingOptions, addOns, clearAddOns, clearToppingOptions }) =>
    [name, category, description, price, isAvailable, preparationTime, portionSize, ingredients, allergens, toppings, toppingOptions, addOns].some((value) => value !== "") ||
    clearAddOns ||
    clearToppingOptions ||
    Boolean(image?.length),
  { path: ["name"], message: "Enter at least one field to update." },
);

function UpdateFood() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: "",
      isAvailable: "",
      preparationTime: "",
      portionSize: "",
      ingredients: "",
      allergens: "",
      toppings: "",
      toppingOptions: "",
      addOns: "",
      clearAddOns: false,
      clearToppingOptions: false,
    },
  });

  const onSubmit = async ({ foodId, image, clearAddOns, clearToppingOptions, ...fields }) => {
    setMessage("");
    const values = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value !== ""),
    );
    if (image?.length) values.image = image;
    if (clearAddOns) {
      values.clearAddOns = true;
      delete values.addOns;
    }
    if (clearToppingOptions) {
      values.clearToppingOptions = true;
      delete values.toppingOptions;
    }
    try {
      await foodController.update(foodId, values);
      reset();
      setMessage("Food updated.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Update Food</h2>
      <label className="block">
        Food ID
        <input
          {...register("foodId")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.foodId && <p className="text-sm text-red-600">{errors.foodId.message}</p>}
      </label>
      <p className="text-sm text-gray-500">
        Enter only the fields that should change.
      </p>
      <label className="block">
        Food name
        <input {...register("name")} className="mt-1 w-full rounded-md border p-2" />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </label>
      <label className="block">
        Category
        <input {...register("category")} className="mt-1 w-full rounded-md border p-2" />
        {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
      </label>
      <label className="block">
        Description
        <textarea
          {...register("description")}
          rows="3"
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </label>
      <label className="block">
        Price (PKR)
        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
      </label>
      <label className="block">
        Replace food image (optional)
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          {...register("image")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
      </label>
      <label className="block">
        Availability
        <select {...register("isAvailable")} className="mt-1 w-full rounded-md border p-2">
          <option value="">No change</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </label>
      <label className="block">
        Preparation time in minutes (optional)
        <input
          type="number"
          min="1"
          max="240"
          {...register("preparationTime")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.preparationTime && <p className="text-sm text-red-600">{errors.preparationTime.message}</p>}
      </label>
      <label className="block">
        Portion size (optional)
        <input {...register("portionSize")} className="mt-1 w-full rounded-md border p-2" />
        {errors.portionSize && <p className="text-sm text-red-600">{errors.portionSize.message}</p>}
      </label>
      <p className="text-sm text-gray-500">Optional lists: separate entries with commas.</p>
      <label className="block">
        Ingredients
        <textarea {...register("ingredients")} rows="2" className="mt-1 w-full rounded-md border p-2" />
        {errors.ingredients && <p className="text-sm text-red-600">{errors.ingredients.message}</p>}
      </label>
      <label className="block">
        Allergens
        <textarea {...register("allergens")} rows="2" className="mt-1 w-full rounded-md border p-2" />
        {errors.allergens && <p className="text-sm text-red-600">{errors.allergens.message}</p>}
      </label>
      <label className="block">
        Descriptive toppings
        <textarea {...register("toppings")} rows="2" className="mt-1 w-full rounded-md border p-2" />
        {errors.toppings && <p className="text-sm text-red-600">{errors.toppings.message}</p>}
      </label>
      <label className="block">
        Selectable toppings (optional)
        <textarea
          {...register("toppingOptions")}
          rows="3"
          placeholder={"Extra cheese: 150\nJalapeños: 80"}
          className="mt-1 w-full rounded-md border p-2"
        />
        <span className="text-xs text-gray-500">
          Customers can select these toppings. Enter one per line as Name: price in PKR.
        </span>
        {errors.toppingOptions && <p className="text-sm text-red-600">{errors.toppingOptions.message}</p>}
      </label>
      <label className="block">
        Other optional add-ons (optional)
        <textarea
          {...register("addOns")}
          rows="3"
          placeholder={"Extra cheese: 150\nJalapeños: 80"}
          className="mt-1 w-full rounded-md border p-2"
        />
        <span className="text-xs text-gray-500">
          Customers can select these just like toppings. One per line as Name: price in PKR.
        </span>
        {errors.addOns && <p className="text-sm text-red-600">{errors.addOns.message}</p>}
      </label>
      <label className="flex items-start gap-2">
        <input type="checkbox" {...register("clearAddOns")} className="mt-1" />
        <span>Remove all other optional add-ons</span>
      </label>
      <label className="flex items-start gap-2">
        <input type="checkbox" {...register("clearToppingOptions")} className="mt-1" />
        <span>Remove all selectable toppings</span>
      </label>
      <button disabled={isSubmitting} className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:opacity-50">
        {isSubmitting ? "Updating..." : "Update food"}
      </button>
      {message && <p role="status" className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}

export default UpdateFood;
