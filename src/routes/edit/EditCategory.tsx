import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Category } from "../../types";
import { Link, useLocation } from "wouter";
import { update } from "../../redux/categoriesSlice";
import { CategoryForm } from "@/components/category-form/CategoryForm";

function EditCategory(params: { id: string }) {
  const [, navigate] = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector<RootState>((store) =>
    store.categories.categories.find((category) => category.id === params.id),
  ) as Category | null;

  const submit = (formData: FormData) => {
    if (!category) return;
    const name = formData.get("category-name")! as string;

    dispatch(update({ ...category, name }));
    navigate("/categories");
  };

  return (
    <>
      {!category && (
        <>
          <p>No category found with id {params.id}</p>
          <Link href="/categories">Return to categories</Link>
        </>
      )}
      {!!category && (
        <>
          <h1 className="text-2xl font-bold">Update task {category.name}</h1>
          <CategoryForm
            action={submit}
            sumbitLabel="Update category"
            category={category}
          />
        </>
      )}
    </>
  );
}

export default EditCategory;
