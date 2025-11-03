import useFieldActions from "@/hooks/useFieldActions";
import { useSortable } from "@dnd-kit/sortable";
import { ActionIcon } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import { Grip, Trash } from "lucide-react";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

interface BlockProps {
  children: React.ReactNode;
  id: string;
}

export default function Block({ children, id }: BlockProps) {
  const { ref: fieldRef } = useFocusWithin();

  const { removeField, selectField, selectedField } = useFieldActions();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const handleClick = () => {
    selectField(id);
  };

  const isFieldSelected = selectedField === id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      onClick={handleClick}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative pb-2 mr-8  border-b-neutral-200 transition-all cursor-pointer ${
        isFieldSelected
          ? "border-blue-400 bg-blue-50/40"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      <div ref={fieldRef} className="p-4 pr-12">
        {children}
      </div>
      {isFieldSelected && (
        <div className="absolute -right-14 -top-4 flex flex-col gap-2 mt-4">
          <ActionIcon
            size="xl"
            onClick={() => removeField(id)}
            className="bg-red-100 rounded-full text-red-600 hover:bg-red-200 cursor-pointer"
          >
            <Trash />
          </ActionIcon>
          <ActionIcon
            size="xl"
            {...listeners}
            {...attributes}
            className="bg-green-100 rounded-full text-green-600 hover:bg-green-200 cursor-grab active:cursor-grabbing"
          >
            <Grip />
          </ActionIcon>
        </div>
      )}
    </div>
  );
}
