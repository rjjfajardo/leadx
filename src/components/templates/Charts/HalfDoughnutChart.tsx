import { useTheme } from '@mui/material/styles';
import type Decimal from 'decimal.js';
import type { ComponentProps } from 'react';
import { Doughnut } from 'react-chartjs-2';

type DoughnutProps = ComponentProps<typeof Doughnut>;


type HalfDoughnutChartProps = {
  values: Decimal[];
};

export function HalfDoughnutChart({ values }: HalfDoughnutChartProps) {
  const theme = useTheme();
  const data: DoughnutProps['data'] = {
    labels: [],
    datasets: [
      {
        data: values.map((v) => v.toNumber()),
        backgroundColor: [
          theme.palette.secondary.main,
          'rgba(10, 10, 10, 0.2)',
        ],
        borderColor: [theme.palette.secondary.main, 'rgba(10, 10, 10, 0.2)'],
        borderWidth: 1,
      },
    ],
  };

  const options: DoughnutProps['options'] = {
    rotation: -90,
    circumference: 180,
  };

  const drawTickPlugin: DoughnutProps['plugins'] = [
    {
      id: 'drawTickPlugin',
      afterDraw: (chart) => {
        // see http://www.java2s.com/example/javascript/chart.js/add-text-in-center-of-the-doughnut-chart-using-chartjs.html, https://codesandbox.io/s/so-answer-60873116-forked-izyhr?file=/src/components/Chart.jsx:424-442
        const needleValue = chart.config.data.datasets[0].data[0] as number;
        const dataTotal = chart.config.data.datasets[0].data.reduce(
          (a, b) =>
            (typeof a === 'number' ? a : 0) + (typeof b === 'number' ? b : 0),
          0,
        ) as number;
        const angle =
          Math.PI + (1 / dataTotal) * needleValue * Math.PI ?? Math.PI;
        const ctx = chart.ctx;
        const cw = chart.canvas.offsetWidth;
        const ch = chart.canvas.offsetHeight;
        const cx = cw / 2;
        // NOTE: Value 1.3 is adjusted visually so that dot is centered.
        const cy = ch / 1.3;

        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-20, -5);
        ctx.lineTo(cx, 0);
        ctx.lineTo(-20, 5);
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fill();
        ctx.rotate(-angle);

        // want to bring the speedometer to the center of the needle
        const dx = Math.cos(angle) * 2;
        const dy = Math.sin(angle) * 2;
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.arc(cx + dx, cy + dy, 10, 0, Math.PI * 2);
        ctx.fill();
      },
    },
  ];

  return <Doughnut data={data} options={options} plugins={drawTickPlugin} />;
}
