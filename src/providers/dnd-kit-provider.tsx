"use client";

import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
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

// Collision detection melhorada (similar ao exemplo oficial)
const customCollisionDetection: CollisionDetection = (args) => {
  // Primeiro tenta encontrar colisão com o pointer
  const pointerCollisions = pointerWithin(args);

  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }

  // Fallback para intersecção de retângulos
  return rectIntersection(args);
};

export function DndProvider({ children }: DndProviderProps) {
  const { fields, addField, addFieldAtPosition, reorderFields } =
    useFormBuilderStore();

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) return;

    const activeData = active.data.current;
    const isNewField = !activeData?.type || activeData.type !== "field";

    // CASO 1: Novo campo da sidebar
    if (isNewField) {
      // Drop no canvas vazio
      if (over.id === "form-canvas") {
        addField(
          activeData?.type || (active.id as FieldType),
          activeData?.label,
        );
        return;
      }

      // Drop sobre um campo existente (inserir antes/depois)
      const overIndex = fields.findIndex((f) => f.id === over.id);
      if (overIndex !== -1) {
        addFieldAtPosition(
          activeData?.type || (active.id as FieldType),
          activeData?.label,
          overIndex,
        );
      }
      return;
    }

    // CASO 2: Reordenação de campo existente
    if (active.id !== over.id) {
      reorderFields(active.id as string, over.id as string);
    }
  };

  // Buscar dados do item ativo
  const getActiveItemData = () => {
    if (!activeId) return null;

    // É um campo existente?
    const existingField = fields.find((f) => f.id === activeId);
    if (existingField) {
      return {
        type: existingField.type,
        label: existingField.label,
        isExisting: true,
      };
    }

    // É um botão da sidebar?
    return {
      type: activeId as FieldType,
      label: activeId,
      isExisting: false,
    };
  };

  const activeData = getActiveItemData();

  return (
    <DndContext
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>

      <DragOverlay>
        {activeData && !activeData.isExisting && (
          <Button
            leftSection={FIELD_ICONS[activeData.type]}
            className="opacity-80 shadow-xl cursor-grabbing"
            style={{
              width: activeData.isExisting ? "100%" : "auto",
            }}
          >
            {activeData.label}
          </Button>
        )}
      </DragOverlay>
    </DndContext>
  );
}
