import { useFormBuilderStore } from "@/stores/useFormBuilderStore";

export default function useFieldActions() {
  const removeField = useFormBuilderStore((state) => state.removeField);
  const selectField = useFormBuilderStore((state) => state.selectField);
  const selectedField = useFormBuilderStore((state) => state.selectedField);

  const fields = useFormBuilderStore((state) => state.fields);

  const addField = useFormBuilderStore((state) => state.addField);

  const reorderFields = useFormBuilderStore((state) => state.reorderFields);

  return {
    removeField,
    selectField,
    selectedField,
    reorderFields,
    fields,
    addField,
  };
}
