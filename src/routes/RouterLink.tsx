import { forwardRef, ReactNode, Ref } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: string;
  children?: ReactNode;
}

const RouterLink = forwardRef(
  ({ href, ...other }: RouterLinkProps, ref: Ref<HTMLAnchorElement>) => (
    <Link to={href} ref={ref} {...other} />
  )
);

export { RouterLink };
