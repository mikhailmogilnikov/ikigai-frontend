import { createLink, LinkComponent } from '@tanstack/react-router';

import { Button, ButtonProps } from '../button/button';

const BasicLinkButton = ({ children, ...props }: ButtonProps<'a'>) => {
  return (
    <Button as='a' {...props}>
      {children}
    </Button>
  );
};

const CreatedLinkButton = createLink(BasicLinkButton);

export const LinkButton: LinkComponent<typeof BasicLinkButton> = (props) => {
  return <CreatedLinkButton preload={'intent'} {...props} />;
};
