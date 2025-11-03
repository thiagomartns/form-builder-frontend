import { FieldType, FormField } from "@/models";
import { create } from "zustand";

interface FormBuilderStore {
  fields: FormField[];
  selectedField: string | null;
  addField: (fieldType: FieldType, label: string) => void;
  removeField: (fieldId: string) => void;
  selectField: (fieldId: string) => void;
  reorderFields: (oldIndex: number, newIndex: number) => void;
}

const getFieldDefaults = (
  type: FieldType,
  label: string,
): Omit<FormField, "id"> => {
  const defaults: Record<FieldType, Omit<FormField, "id">> = {
    title: {
      type: "title",
      label,
    },
    name: {
      type: "name",
      label,
    },
    email: {
      type: "email",
      label,
    },
    telephone: {
      type: "telephone",
      label,
    },
  };

  return defaults[type];
};

export const useFormBuilderStore = create<FormBuilderStore>((set) => ({
  fields: [],

  selectedField: null,

  addField: (fieldType, label) => {
    const newField: FormField = {
      id: new Date().getTime().toString(),
      ...getFieldDefaults(fieldType, label),
    };

    set((state) => ({
      fields: [...state.fields, newField],
    }));
  },

  removeField: (fieldId) => {
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== fieldId),
    }));
  },

  selectField: (fieldId) => {
    set({ selectedField: fieldId });
  },

  reorderFields: (oldIndex, newIndex) => {
    set((state) => {
      const newFields = [...state.fields];
      const [removed] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, removed);

      return { fields: newFields };
    });
  },
}));
