import { TextInput } from "@mantine/core";
import Block from "./block";

interface NameBlockProps {
  id: string;
}

export const NameBlock = ({ id }: NameBlockProps) => {
  return (
    <Block id={id} fieldType="name">
      <div className="flex justify-between gap-4">
        <TextInput w-full disabled label="First Name" className="w-full" />
        <TextInput w-full disabled label="Last Name" className="w-full" />
      </div>
    </Block>
  );
};
