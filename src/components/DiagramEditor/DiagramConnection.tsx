interface DiagramConnectionProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export const DiagramConnection = ({
  fromX,
  fromY,
  toX,
  toY,
}: DiagramConnectionProps) => {
  // Calculate control points for a smooth curve
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  
  const dx = toX - fromX;
  const dy = toY - fromY;
  
  // Create a curved path
  const controlPoint1X = fromX + dx * 0.25;
  const controlPoint1Y = fromY;
  const controlPoint2X = toX - dx * 0.25;
  const controlPoint2Y = toY;

  const path = `M ${fromX} ${fromY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${toX} ${toY}`;

  // Calculate arrow head
  const angle = Math.atan2(toY - controlPoint2Y, toX - controlPoint2X);
  const arrowLength = 10;
  const arrowAngle = Math.PI / 6;

  const arrow1X = toX - arrowLength * Math.cos(angle - arrowAngle);
  const arrow1Y = toY - arrowLength * Math.sin(angle - arrowAngle);
  const arrow2X = toX - arrowLength * Math.cos(angle + arrowAngle);
  const arrow2Y = toY - arrowLength * Math.sin(angle + arrowAngle);

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        className="drop-shadow-sm"
      />
      <polygon
        points={`${toX},${toY} ${arrow1X},${arrow1Y} ${arrow2X},${arrow2Y}`}
        fill="hsl(var(--primary))"
        className="drop-shadow-sm"
      />
    </g>
  );
};
