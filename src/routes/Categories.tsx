import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/categoriesSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { Category } from "../types";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "@/components/category-form/CategoryForm";

function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector<RootState>(
    (store) => store.categories.categories,
  ) as Category[];

  const submit = (formData: FormData) => {
    const name = formData.get("category-name") as string;
    const color = formData.get("category-color") as string;

    console.log(color);

    const newCategory = {
      id: crypto.randomUUID(),
      name,
      color,
    };

    dispatch(add(newCategory));
  };

  const deleteCategory = (id: string) => dispatch(remove(id));

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Add a new category</h1>

      <CategoryForm action={submit} />

      <Separator />
      {(!categories || categories.length === 0) && (
        <p className="mt-6 text-center font-medium">
          Add a category to see it in this section!
        </p>
      )}
      {!!categories && categories.length > 0 && (
        <section className="py-6 space-y-4">
          <h2 className="font-bold text-xl">All your categories:</h2>
          <ul className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <li key={category.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardAction
                      style={{ background: category.color }}
                      className="aspect-square w-4 rounded-full border"
                    ></CardAction>
                  </CardHeader>
                  <CardFooter className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/edit/category/${category.id}`}>
                        Edit category
                      </Link>
                    </Button>
                    <Button
                      onClick={() => deleteCategory(category.id)}
                      size="sm"
                      variant="destructive"
                    >
                      Delete category
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Categories;
