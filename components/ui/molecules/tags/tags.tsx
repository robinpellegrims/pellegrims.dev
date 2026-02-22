import { FunctionComponent } from 'react';
import { Chip } from '@/components/ui/atoms/chip/chip';

interface TagsProps {
  tags: string[];
}

export const Tags: FunctionComponent<TagsProps> = (props) => (
  <div className="flex flex-wrap gap-1 uppercase">
    {props.tags
      .map((tag) => `#${tag}`.toUpperCase())
      .map((tag) => (
        <Chip key={tag} text={tag} />
      ))}
  </div>
);
