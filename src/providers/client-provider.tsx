"use client";
import theme from "@/app/theme";

import { MantineProvider } from "@mantine/core";
import { DndProvider } from "./dnd-kit-provider";

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return (
    <MantineProvider theme={theme}>
      <DndProvider>{children}</DndProvider>
    </MantineProvider>
  );
}
