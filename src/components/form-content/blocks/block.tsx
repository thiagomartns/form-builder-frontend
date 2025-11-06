"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useFieldActions from "@/hooks/useFieldActions";
import { ActionIcon } from "@mantine/core";
import { Grip, Trash } from "lucide-react";
import React from "react";

interface BlockProps {
  children: React.ReactNode;
  id: string;
  fieldType: string;
}

export default function Block({ children, id, fieldType }: BlockProps) {
  const { removeField, selectField, selectedField } = useFieldActions();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "field",
      fieldType,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = () => {
    selectField(id);
  };

  const isFieldSelected = selectedField === id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={`flex justify-between pb-2 mr-8 border-b transition-all ${
        isFieldSelected
          ? "border-blue-400 bg-blue-50/40"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      <div className="p-4 pr-12 w-full">{children}</div>
      <div className="flex flex-col gap-2 m-4">
        <ActionIcon
          size="xl"
          onClick={(e) => {
            e.stopPropagation();
            removeField(id);
          }}
          className="bg-red-100 rounded-full text-red-600 hover:bg-red-200 cursor-pointer"
        >
          <Trash />
        </ActionIcon>
        <ActionIcon
          size="xl"
          {...attributes}
          {...listeners}
          className="bg-green-100 rounded-full text-green-600 hover:bg-green-200 cursor-grab active:cursor-grabbing"
        >
          <Grip />
        </ActionIcon>
      </div>
    </div>
  );
}
