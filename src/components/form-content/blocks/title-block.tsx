import { TextInput } from "@mantine/core";
import Block from "./block";

interface TitleBlockProps {
  id: string;
}

export const TitleBlock = ({ id }: TitleBlockProps) => {
  return (
    <Block id={id}>
      <TextInput
        placeholder="Insira um cabeçalho"
        variant="unstyled"
        size="lg"
      />
      <TextInput
        placeholder="Insira um subtítulo"
        variant="unstyled"
        size="md"
      />
    </Block>
  );
};
