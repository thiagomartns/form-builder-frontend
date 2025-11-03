import { TextInput } from "@mantine/core";
import Block from "./block";

interface PhoneBlockProps {
  id: string;
}

export const PhoneBlock = ({ id }: PhoneBlockProps) => {
  return (
    <Block id={id}>
      <TextInput label="Phone Number" className="w-full" />
    </Block>
  );
};
