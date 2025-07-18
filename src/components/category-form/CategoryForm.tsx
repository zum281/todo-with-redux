import type { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import type { Category } from "@/types";
import { CATEGORY_GENERAL } from "@/redux/categoriesSlice";

export const CategoryForm: FC<CategoryFormProps> = ({
  action,
  sumbitLabel = "Add category",
  category,
}) => {
  return (
    <form action={action} className="space-y-4 py-6">
      <div>
        <Label htmlFor="category-name" className="mb-2">
          Category name *
        </Label>
        <Input
          type="text"
          id="category-name"
          name="category-name"
          required
          {...(!!category && { defaultValue: category.name })}
        />
      </div>
      <div>
        <Label htmlFor="category-color" className="mb-2">
          Category color*
        </Label>
        <Input
          type="color"
          id="category-color"
          name="category-color"
          className="max-w-32 cursor-pointer p-0"
          required
          defaultValue={CATEGORY_GENERAL.color}
        />
      </div>
      <Button type="submit" className="w-fit">
        {sumbitLabel}
      </Button>
    </form>
  );
};

interface CategoryFormProps {
  action: (data: FormData) => void;
  sumbitLabel?: string;
  category?: Category;
}
