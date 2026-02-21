import { FunctionComponent } from 'react';

interface ChipProps {
  text: string;
}

export const Chip: FunctionComponent<ChipProps> = (props) => (
  <span className="inline-block rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[0.64rem] font-semibold tracking-[0.12em] text-accent">
    {props.text}
  </span>
);
