interface SvgIconProps {
  iconId: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  iconId,
  size = 24,
  className,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <use href={`/icons-sprite.svg#${iconId}`} />
    </svg>
  );
};

export default SvgIcon;
