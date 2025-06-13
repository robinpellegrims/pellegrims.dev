import { ReactElement } from 'react';

interface GridProps<TProps> {
  render: (item: TProps) => ReactElement;
  items: TProps[];
}

export const Grid = <TProps,>({ items, render }: GridProps<TProps>) => (
  <div className="flex flex-wrap">
    {items.map((item, index) => (
      <div key={index} className="p-4 md:w-1/3">
        {render(item)}
      </div>
    ))}
  </div>
);
