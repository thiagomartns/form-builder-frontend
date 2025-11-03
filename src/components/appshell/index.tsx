"use client";
import { AppShell, Burger, Button, Group, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Heading, Mail, Phone, User } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

interface CollapseDesktopProps {
  children?: React.ReactNode;
}

type MainLink = {
  icon: React.ReactNode;
  label: string;
  type: string;
};

function DraggableButton({ link }: { link: MainLink }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: link.type,
    data: link,
  });

  return (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
    >
      <Button
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        leftSection={link.icon}
        className={isDragging ? "opacity-50" : ""}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {link.label}
      </Button>
    </Tooltip>
  );
}

export function CollapseDesktop({ children }: CollapseDesktopProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const mainLinksMockdata: MainLink[] = [
    { icon: <Heading />, label: "Title", type: "title" },
    { icon: <User />, label: "Name", type: "name" },
    { icon: <Mail />, label: "Email", type: "email" },
    { icon: <Phone />, label: "Telephone", type: "telephone" },
  ];

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header withBorder={false}>
        <Group h="100%" px="md">
          Elementos do Formulário
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar className="space-y-2 px-4">
        {mainLinksMockdata.map((link) => (
          <DraggableButton key={link.type} link={link} />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
