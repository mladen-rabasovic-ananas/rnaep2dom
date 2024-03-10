// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import { Line } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

// Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

// const App = () => {
//   const [data, setData] = useState([]);
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const socket = io('http://localhost:8000');

//     socket.on('message', (message) => {
//       const newData = JSON.parse(message);
//       setData((prevData) => [...prevData, newData]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     // Formatiranje podataka za grafikon samo ako postoje podaci
//     if (data.length > 0) {
//       const chartLabels = data.map((entry) => {
//         console.log(entry);
//         const date = new Date(entry.dt * 1000);
//         console.log(date);
//         return date.toLocaleDateString('en-GB'); // Formatiraj datum u "dd/MM/yy"
//       });

//       const chartTemperatureData = data.map((entry) => entry.main ? entry.main.temp+ Math.random()*2 : 0);

//       setChartData({
//         labels: chartLabels,
//         datasets: [
//           {
//             label: 'Temperatura',
//             data: chartTemperatureData,
//             fill: false,
//             borderColor: 'rgba(75,192,192,1)',
//             tension: 0.1,
//             elements: {
//               point: {
//                 radius: 0,
//               },
//               line: {
//                 tension: 0.1,
//               },
//             },
//           },
//         ],
//       });
//     }
//   }, [data]);

//   return (
//     <div>
//       {/* Prikazivanje grafikona samo ako postoje podaci */}
//       {chartData && <Line data={chartData} />}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const App = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:8000');

    socket.on('message', (message) => {
      const newData = parseFloat(message); // Assuming the data received is a string representing temperature
      setData((prevData) => [...prevData, newData]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Format data for chart only if there is data available
    if (data.length > 0) {
      // Labels for x-axis (we assume time intervals here, adjust as needed)
      const chartLabels = data.map((entry, index) => index + 1);

      // Temperature data for y-axis
      const chartTemperatureData = data.map((entry) => entry);

      // Prepare chart data
      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Processed Temperature',
            data: chartTemperatureData,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
            elements: {
              point: {
                radius: 0,
              },
              line: {
                tension: 0.1,
              },
            },
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      {/* Display chart only if there is data available */}
      {chartData && <Line data={chartData} />}
    </div>
  );
};

export default App;
