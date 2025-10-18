
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface ScoreChartProps {
  score: number;
}

const ScoreChart: React.FC<ScoreChartProps> = ({ score }) => {
  const data = [{ name: 'score', value: score }];
  
  let fillColor = '#ef4444'; // red-500
  if (score >= 85) {
    fillColor = '#16a34a'; // green-600
  } else if (score >= 60) {
    fillColor = '#f59e0b'; // amber-500
  }

  return (
    <div className="w-[200px] h-[200px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
          barSize={12}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            fill={fillColor}
            className="transition-all duration-500"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold" style={{ color: fillColor }}>
          {score}
        </span>
        <span className="text-sm font-medium text-black">Overall Score</span>
      </div>
    </div>
  );
};

export default ScoreChart;
