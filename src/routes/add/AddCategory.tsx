import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useLocation } from "wouter";
import { CategoryForm } from "@/components/category-form/CategoryForm";
import { add } from "@/redux/categoriesSlice";

function AddCategory() {
  const [, navigate] = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const submit = (formData: FormData) => {
    const name = formData.get("category-name") as string;
    const color = formData.get("category-color") as string;

    const newCategory = {
      id: crypto.randomUUID(),
      name,
      color,
    };

    dispatch(add(newCategory));
    navigate("/categories");
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Add a new category</h1>
      <CategoryForm action={submit} />
    </>
  );
}

export default AddCategory;
