import { TextInput } from "@mantine/core";
import Block from "./block";

interface EmailBlockProps {
  id: string;
}

export const EmailBlock = ({ id }: EmailBlockProps) => {
  return (
    <Block id={id}>
      <TextInput label="Email Address" className="w-full" />
    </Block>
  );
};
