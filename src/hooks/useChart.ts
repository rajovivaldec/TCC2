export const useChart = () => {
  const dataLine = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Receita",
        data: [
          5100, 6500, 5900, 8000, 8100, 5600, 5500, 4000, 5500, 5000, 7300,
          6800,
        ],
        backgroundColor: "#F3F00D",
        borderColor: "#e4e006",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const optionsLine = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        // display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataDoughnut = {
    labels: ["Masculino", "Feminino"],
    datasets: [
      {
        data: [170, 100],
        backgroundColor: ["#F3F00D", "#0f0f0e"],
      },
    ],
  };

  const optionsDoughnut = {
    plugins: {
      legend: {
        position: "right" as "right",
        align: "center" as "center",
        labels: {
          boxWidth: 30,
        },
      },
    },
  };

  return {
    dataLine,
    optionsLine,
    dataDoughnut,
    optionsDoughnut,
  };
};
