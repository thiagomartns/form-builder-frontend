"use client";
import { useDroppable } from "@dnd-kit/core";
import { Card } from "@mantine/core";
import React from "react";
import { TitleBlock } from "./blocks/title-block";
import { NameBlock } from "./blocks/name-block";
import { EmailBlock } from "./blocks/email-block";
import { PhoneBlock } from "./blocks/phone-block";
import useFieldActions from "@/hooks/useFieldActions";
import { FormField } from "@/models";

export default function FormContent() {
  const { setNodeRef, isOver } = useDroppable({
    id: "form-canvas",
  });

  const { fields } = useFieldActions();

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "title":
        return <TitleBlock key={field.id} id={field.id} />;
      case "name":
        return <NameBlock key={field.id} id={field.id} />;
      case "email":
        return <EmailBlock key={field.id} id={field.id} />;
      case "telephone":
        return <PhoneBlock key={field.id} id={field.id} />;
      default:
        return <h1 key={field.id}>{field.label}</h1>;
    }
  };

  return (
    <Card className="shadow-2xl " ref={setNodeRef}>
      <Card.Section
        className={`p-4 px-12 min-h-[400px] ${isOver ? "bg-blue-50" : ""}`}
      >
        {fields.length === 0 && (
          <div className="text-center text-gray-400 min-h-[200px] flex items-center justify-center">
            {isOver
              ? "Solte aqui para adicionar o campo"
              : "Arraste campos da sidebar para começar"}
          </div>
        )}

        <div className="space-y-2">{fields.map(renderField)}</div>
      </Card.Section>
    </Card>
  );
}
