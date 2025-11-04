// useFormBuilderStore.ts
import { FieldType, FormField } from "@/models";
import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable"; // Adicione essa dependência

interface FormBuilderStore {
  fields: FormField[];
  selectedField: string | null;
  addField: (fieldType: FieldType, label: string) => void;
  addFieldAtPosition: (
    fieldType: FieldType,
    label: string,
    position: number,
  ) => void; // NOVO
  removeField: (fieldId: string) => void;
  selectField: (fieldId: string) => void;
  reorderFields: (activeId: string, overId: string) => void; // NOVO
  removeAllFields: () => void; // NOVO
}

const getFieldDefaults = (
  type: FieldType,
  label: string,
): Omit<FormField, "id"> => {
  const defaults: Record<FieldType, Omit<FormField, "id">> = {
    title: { type: "title", label },
    name: { type: "name", label },
    email: { type: "email", label },
    telephone: { type: "telephone", label },
  };

  return defaults[type];
};

export const useFormBuilderStore = create<FormBuilderStore>((set) => ({
  fields: [],
  selectedField: null,

  addField: (fieldType, label) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      ...getFieldDefaults(fieldType, label),
    };

    set((state) => ({
      fields: [...state.fields, newField],
    }));
  },

  // NOVO: Adicionar em posição específica
  addFieldAtPosition: (fieldType, label, position) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      ...getFieldDefaults(fieldType, label),
    };

    set((state) => {
      const newFields = [...state.fields];
      newFields.splice(position, 0, newField);
      return { fields: newFields };
    });
  },

  removeField: (fieldId) => {
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== fieldId),
    }));
  },

  selectField: (fieldId) => {
    set({ selectedField: fieldId });
  },

  // NOVO: Reordenar campos
  reorderFields: (activeId, overId) => {
    set((state) => {
      const oldIndex = state.fields.findIndex((f) => f.id === activeId);
      const newIndex = state.fields.findIndex((f) => f.id === overId);

      return {
        fields: arrayMove(state.fields, oldIndex, newIndex),
      };
    });
  },
  removeAllFields: () => {
    set({ fields: [] });
  },
}));
