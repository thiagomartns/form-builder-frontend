"use client";

import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
} from "@dnd-kit/core";
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
  const addField = useFormBuilderStore((state) => state.addField);

  const [activeItem, setActiveItem] = useState<{
    fieldType: FieldType;
    label: string;
  } | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;

    setActiveItem({
      fieldType: data?.type,
      label: data?.label,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (activeItem && event.over) {
      addField(activeItem.fieldType, activeItem.label);
    }

    setActiveItem(null);
  };

  const handleDragCancel = () => {
    setActiveItem(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}

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
