import { TextInput } from "@mantine/core";
import Block from "./block";

interface NameBlockProps {
  id: string;
}

export const NameBlock = ({ id }: NameBlockProps) => {
  return (
    <Block id={id}>
      <div className="flex justify-between gap-4">
        <TextInput readOnly label="First Name" className="w-full" />
        <TextInput readOnly label="Last Name" className="w-full" />
      </div>
    </Block>
  );
};
