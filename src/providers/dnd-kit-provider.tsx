"use client";

import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormBuilderStore } from "@/stores/useFormBuilderStore";
import { useState } from "react";
import { Button } from "@mantine/core";
import { Heading, Mail, Phone, User } from "lucide-react";
import { FieldType } from "@/models";

interface DndProviderProps {
  children: React.ReactNode;
}

const FIELD_ICONS: Record<FieldType, React.ReactNode> = {
  title: <Heading />,
  name: <User />,
  email: <Mail />,
  telephone: <Phone />,
};

export function DndProvider({ children }: DndProviderProps) {
  const { fields, addField, addFieldAtPosition, reorderFields } =
    useFormBuilderStore();

  const [activeItem, setActiveItem] = useState<{
    id: string;
    fieldType: FieldType;
    label: string;
    isExistingField: boolean;
  } | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;

    const isExistingField = fields.some((f) => f.id === active.id);

    if (isExistingField) {
      const field = fields.find((f) => f.id === active.id);
      setActiveItem({
        id: active.id as string,
        fieldType: field!.type,
        label: field!.label,
        isExistingField: true,
      });
    } else {
      setActiveItem({
        id: active.id as string,
        fieldType: data?.type,
        label: data?.label,
        isExistingField: false,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!activeItem) {
      setActiveItem(null);
      return;
    }

    // CASO 1: Reordenação de campo existente
    if (activeItem.isExistingField) {
      if (over && active.id !== over.id) {
        reorderFields(active.id as string, over.id as string);
      }
    }
    // CASO 2: Novo campo da sidebar
    else {
      if (!over) {
        setActiveItem(null);
        return;
      }

      if (over.id === "form-canvas") {
        addField(activeItem.fieldType, activeItem.label);
      } else {
        const overIndex = fields.findIndex((f) => f.id === over.id);

        if (overIndex !== -1) {
          addFieldAtPosition(
            activeItem.fieldType,
            activeItem.label,
            overIndex + 1,
          );
        } else {
          addField(activeItem.fieldType, activeItem.label);
        }
      }
    }

    setActiveItem(null);
  };

  const handleDragCancel = () => {
    setActiveItem(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          <Button
            leftSection={FIELD_ICONS[activeItem.fieldType]}
            className="opacity-80 shadow-xl cursor-grabbing"
            fullWidth
          >
            {activeItem.label}
          </Button>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
