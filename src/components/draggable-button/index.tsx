import { useDraggable } from "@dnd-kit/core";
import { MainLink } from "../appshell";
import { FieldType } from "@/models";
import { Button, Tooltip } from "@mantine/core";

interface DraggableButtonProps {
  link: MainLink;
  onAdd?: (type: FieldType, label: string) => void;
}
export function DraggableButton({ link, onAdd }: DraggableButtonProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: link.type,
    data: {
      type: link.type, // Consistente com o resto
      label: link.label,
    },
  });

  const handleClick = () => {
    if (!isDragging) {
      onAdd?.(link.type as FieldType, link.label);
    }
  };

  return (
    <Tooltip label={link.label} position="right" withArrow>
      <Button
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={handleClick}
        leftSection={link.icon}
        className={isDragging ? "opacity-50" : ""}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {link.label}
      </Button>
    </Tooltip>
  );
}
