"use client";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  DragOverEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useFormBuilderStore } from "@/stores/useFormBuilderStore";
import { useState } from "react";
import { Button } from "@mantine/core";
import { Heading, Mail, Phone, User } from "lucide-react";
import { FieldType } from "@/models";

interface DndProviderProps {
  children: React.ReactNode;
}

// Mapa de ícones por tipo
const FIELD_ICONS: Record<FieldType, React.ReactNode> = {
  title: <Heading />,
  name: <User />,
  email: <Mail />,
  telephone: <Phone />,
};

type DragType = "sidebar" | "reorder";

export function DndProvider({ children }: DndProviderProps) {
  const addField = useFormBuilderStore((state) => state.addField);
  const fields = useFormBuilderStore((state) => state.fields);
  const reorderFields = useFormBuilderStore((state) => state.reorderFields);

  // Estado para controlar o que está sendo arrastado
  const [activeDrag, setActiveDrag] = useState<{
    type: DragType;
    data?: { fieldType: FieldType; label: string };
  } | null>(null);

  // Configurar sensors para melhor detecção de drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Precisa mover 8px para iniciar drag (evita conflito com click)
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    // Detectar se é da sidebar ou reordenação
    const isSidebarDrag =
      active.data.current?.type && active.data.current?.label;

    if (isSidebarDrag) {
      // Drag da sidebar
      setActiveDrag({
        type: "sidebar",
        data: {
          fieldType: active.data.current?.type,
          label: active.data.current?.label,
        },
      });
      console.log("🟢 DRAG START (Sidebar):", active.data.current);
    } else {
      // Drag de reordenação
      setActiveDrag({
        type: "reorder",
      });
      console.log("🟢 DRAG START (Reorder):", active.id);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !activeDrag) return;

    // Se está reordenando E os IDs são diferentes
    if (activeDrag.type === "reorder" && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // Reordena em tempo real durante o drag
        reorderFields(oldIndex, newIndex);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log("🔴 DRAG END:", {
      type: activeDrag?.type,
      active: active.id,
      over: over?.id,
    });

    if (!over) {
      setActiveDrag(null);
      return;
    }

    // CASO 1: Arrastando da sidebar para o canvas OU sobre um campo
    if (activeDrag?.type === "sidebar" && activeDrag.data) {
      // Adicionar em posição específica se soltar sobre um campo
      if (over.id !== "form-canvas") {
        const overIndex = fields.findIndex((f) => f.id === over.id);
        if (overIndex !== -1) {
          console.log(`✅ Adicionando campo na posição ${overIndex}`);
          // Primeiro adiciona no final
          addField(activeDrag.data.fieldType, activeDrag.data.label);
          // Depois move para a posição correta
          setTimeout(() => {
            reorderFields(fields.length, overIndex);
          }, 0);
        }
      } else {
        // Adicionar no final se soltar na área vazia
        console.log("✅ Adicionando campo no final");
        addField(activeDrag.data.fieldType, activeDrag.data.label);
      }
    }

    // CASO 2: Reordenação já foi feita no onDragOver
    // Não precisa fazer nada aqui

    setActiveDrag(null);
  };

  const handleDragCancel = () => {
    setActiveDrag(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}

      {/* Overlay visual que segue o cursor */}
      <DragOverlay>
        {activeDrag?.type === "sidebar" && activeDrag.data ? (
          <Button
            leftSection={FIELD_ICONS[activeDrag.data.fieldType]}
            className="opacity-80 shadow-xl cursor-grabbing"
            style={{
              transform: "rotate(-2deg)",
            }}
          >
            {activeDrag.data.label}
          </Button>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
