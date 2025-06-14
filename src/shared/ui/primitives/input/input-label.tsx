import { Flex } from '../flex';
import { Label, LabelProps } from '../label';

interface InputLabelProps extends LabelProps {
  label?: string;
}

export function InputLabel({ children, label, ...props }: InputLabelProps) {
  return (
    <Flex col gap='sm'>
      <Label {...props}>{label}</Label>
      {children}
    </Flex>
  );
}
