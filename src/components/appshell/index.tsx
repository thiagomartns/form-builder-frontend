"use client";
import { AppShell, Burger, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Heading, Mail, Phone, User } from "lucide-react";

import useFieldActions from "@/hooks/useFieldActions";
import { DraggableButton } from "../draggable-button";

interface CollapseDesktopProps {
  children?: React.ReactNode;
}

export type MainLink = {
  icon: React.ReactNode;
  label: string;
  type: string;
};

export function CollapseDesktop({ children }: CollapseDesktopProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { fields, removeAllFields, addField } = useFieldActions();

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
          <DraggableButton key={link.type} onAdd={addField} link={link} />
        ))}
        <Button
          disabled={fields.length === 0}
          onClick={removeAllFields}
          color="red"
        >
          Remove all fields
        </Button>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
