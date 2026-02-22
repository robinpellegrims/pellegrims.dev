import { FunctionComponent, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container: FunctionComponent<ContainerProps> = (props) => (
  <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
    {props.children}
  </div>
);
