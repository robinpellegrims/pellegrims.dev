import { ReactElement } from 'react';

interface GridProps<TProps> {
  render: (item: TProps) => ReactElement;
  items: TProps[];
}

export const Grid = <TProps,>({ items, render }: GridProps<TProps>) => (
  <div className="-mx-2 flex flex-wrap sm:-mx-3">
    {items.map((item, index) => (
      <div key={index} className="w-full p-2 sm:p-3 md:w-1/2 xl:w-1/3">
        {render(item)}
      </div>
    ))}
  </div>
);
