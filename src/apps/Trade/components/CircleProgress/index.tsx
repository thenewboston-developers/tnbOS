import {SFC} from 'system/types';

export interface CircleProgressProps {
  diameter: number;
  percentage: number;
}

const CircleProgress: SFC<CircleProgressProps> = ({diameter, percentage}) => {
  const radius = diameter / 2;
  const strokeWidth = 3;
  const size = diameter + strokeWidth;

  const renderCircle = (color: string, pct: number) => {
    const circumference = 2 * Math.PI * radius;
    const strokePct = ((100 - pct) * circumference) / 100;

    return (
      <circle
        cx={radius - strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        fill="transparent"
        r={radius}
        stroke={strokePct !== circumference ? color : ''}
        strokeDasharray={circumference}
        strokeDashoffset={pct ? strokePct : 0}
        strokeWidth={`${strokeWidth}px`}
      />
    );
  };

  return (
    <svg height={size} width={size}>
      <g transform={`rotate(-90 ${radius} ${radius})`}>
        {renderCircle('#dcdde2', 100)}
        {renderCircle('#50a4f1', percentage)}
      </g>
    </svg>
  );
};

export default CircleProgress;
