// import { JOB_STATUS } from '@/constants/jobStatus'
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { Bar } from 'react-chartjs-2';

const BarGraphChart = () => {
  const labels = [
    'PUBLISHER1',
    'PUBLISHER2',
    'PUBLISHER3',
    'PUBLISHER4',
    'PUBLISHER5',
  ];

  const barGraphData = {
    labels,
    datasets: [
      {
        data: [2.2, 2, 234, 23, 3],
        label: ' ',
        backgroundColor: [
          alpha('#FFCD56', 0.5),
          alpha('#4BABEC', 0.5),
          alpha('#FF9F40', 0.5),
          alpha('#F0D7F6', 0.5),
          alpha('#4BC0C0', 0.5),
          alpha('#F6D7DD', 0.5),
        ],
      },
    ],
  };

  return (
    <Box sx={{ px: 3, pt: 3 }}>
      <Bar
        data={barGraphData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#C0C0C0',
                font: {
                  size: 12,
                },
              },
            },
            x: {
              ticks: {
                color: 'black',
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      ></Bar>
    </Box>
  );
};

export default BarGraphChart;
