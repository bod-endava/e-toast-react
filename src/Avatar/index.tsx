import React from "react";

export interface AvatarProps {
  /**
   * Text to be displayed by the avatar. Formatted using the supplied formatter function
   */
  label?: string;
  /**
   * Background color of the avatar. The default value depends on the `@e-toast/css` implementation used
   */
  fill?: string;
  /**
   * Formatter function to be used to format `label`. The default formatter is a function that takes the first two characters of `label`
   */
  formatter?: (str: string) => string;
  /**
   * Click event handler. Will receive the event and the avatar props
   */
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    props: AvatarProps
  ) => void;
  /**
   * Props to be passed to the underlying div
   */
  divProps?: React.ComponentPropsWithoutRef<"div">;
}

const Avatar = ({
  fill,
  label = "",
  formatter = (str: string) => str.slice(0, 2),
  onClick = () => {},
  divProps = {},
}: AvatarProps) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick?.(e, { fill, label, formatter, onClick, divProps });
  };

  const props = {
    ...divProps,
    style: {
      ...divProps?.style,
      backgroundColor: fill,
    },
  };

  return (
    <div className="eds-avatar" onClick={handleClick} {...props}>
      {formatter(label)}
    </div>
  );
};

export default Avatar;
