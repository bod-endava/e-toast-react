import React from 'react';
import getClassName from 'getclassname';

export interface TagProps {
  /**
   * The `close` attribute to be passed to the create a tag element with close action
   */
  hasCloseAction: boolean;

  /**
   * Whether the tag is disabled
   */
  isDisabled?: boolean;


  /**
   * The `label` attribute to be passed to the underlying tag element
   */
  label: string;

  /**
   * The `onClick` attribute to be passed to the underlying tag element
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Optional props to pass to the underlying tag component
   */
  tagProps?: React.ComponentPropsWithoutRef<"div">;
}

const Tag: React.FC<TagProps> = ((
  {
    isDisabled = false,
    hasCloseAction = false,
    label,
    onClick = () => { },
    tagProps = {},
  }: TagProps
) => {
  const clTag = getClassName({
    base: "eds-tags",
  })

  const clCloseAction = getClassName({
    base: "eds-icon",
    [`close`]: Boolean(hasCloseAction),
  })

  const clSuffix = clTag.extend('&__tag');

  // TODO: disabled attribute is not defined for HTMLDivElement type 
  // partial solution: use data-attribute to custom properties
  return (
    <div className={clTag}>
      <div className={clSuffix} data-disabled={isDisabled} {...tagProps}>
        {label}
        <span className={clCloseAction} onClick={onClick} />
      </div>
    </div>
  )
});

export default Tag;
