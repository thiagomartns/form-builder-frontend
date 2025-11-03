export type FieldType = "title" | "name" | "email" | "telephone";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
}
