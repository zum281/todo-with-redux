import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/categoriesSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { Category } from "../types";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector<RootState>(
    (store) => store.categories.categories,
  ) as Category[];

  const deleteCategory = (id: string) => dispatch(remove(id));

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage your categories</h1>

      {(!categories || categories.length === 0) && (
        <div className="space-y-2">
          <p className="font-medium">
            There are no categories to display at this time.
          </p>
          <Button asChild>
            <Link href="/add/category">Add a new category</Link>
          </Button>
        </div>
      )}
      {!!categories && categories.length > 0 && (
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
      )}
    </>
  );
}

export default Categories;
