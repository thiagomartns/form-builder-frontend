"use client";
import { useDroppable } from "@dnd-kit/core";
import { Card } from "@mantine/core";
import React from "react";
import { TitleBlock } from "./blocks/title-block";
import { NameBlock } from "./blocks/name-block";
import { EmailBlock } from "./blocks/email-block";
import { PhoneBlock } from "./blocks/phone-block";
import useFieldActions from "@/hooks/useFieldActions";

export default function FormContent() {
  const { setNodeRef, isOver } = useDroppable({
    id: "form-canvas",
  });

  const { fields } = useFieldActions();

  return (
    <Card className="shadow-2xl ">
      <Card.Section ref={setNodeRef} className={`p-4 px-12 min-h-[400px]}`}>
        {fields.length === 0 && (
          <div className="text-center text-gray-400 min-h-[200px] flex items-center justify-center">
            {isOver
              ? "Solte aqui para adicionar o campo"
              : "Arraste campos da sidebar para começar"}
          </div>
        )}

        <div>
          {fields.map((field) => {
            if (field.type === "title") {
              return <TitleBlock key={field.id} id={field.id} />;
            }

            if (field.type === "name") {
              return <NameBlock key={field.id} id={field.id} />;
            }

            if (field.type === "email") {
              return <EmailBlock key={field.id} id={field.id} />;
            }

            if (field.type === "telephone") {
              return <PhoneBlock key={field.id} id={field.id} />;
            }

            return <h1 key={field.id}>{field.label}</h1>;
          })}
        </div>
      </Card.Section>
    </Card>
  );
}
