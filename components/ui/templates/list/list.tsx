import { ReactElement } from 'react';

interface ListProps<TProps> {
  render: (item: TProps) => ReactElement;
  items: TProps[];
}

export const List = <TProps,>({ items, render }: ListProps<TProps>) => (
  <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-6 divide-y divide-ink/10">
      {items.filter(Boolean).map((item, index) => (
        <span key={index} className={index !== 0 ? 'pt-7' : ''}>
          {render(item)}
        </span>
      ))}
    </div>
  </div>
);
