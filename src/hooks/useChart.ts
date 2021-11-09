import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/initSupabase";

export const useChart = () => {
  const [genre, setGenre] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchGenres() {
      if (user) {
        const { count: totalFemale } = await supabase
          .from("alunos")
          .select("id, genero", { count: "exact" })
          .filter("excluido", "eq", "false")
          .filter("genero", "eq", "1")
          .eq("user_id", user.id);

        const { count: male } = await supabase
          .from("alunos")
          .select("id, genero", { count: "exact" })
          .filter("excluido", "eq", "false")
          .filter("genero", "eq", "2")
          .eq("user_id", user.id);

        const { count: others } = await supabase
          .from("alunos")
          .select("id, genero", { count: "exact" })
          .filter("excluido", "eq", "false")
          .filter("genero", "eq", "3")
          .eq("user_id", user.id);

        setGenre([...genre, totalFemale, male, others]);
      }
    }
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataDoughnut = {
    labels: ["Feminino", "Masculino", "Outro"],
    datasets: [
      {
        data: genre,
        backgroundColor: ["#F3F00D", "#0f0f0e", "#CCCA00"],
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

  const dataBar = {
    labels: [
      "Inglês - 2x semana",
      "Inglês - 3x por semana",
      "Letras - 1x por semana",
      "TCC - 1x por mês",
      "Gramática - 2x por semana",
      "Português - 1x por semana",
      "Letras - 1x por semana",
    ],
    datasets: [
      {
        data: [40, 55, 15, 32, 12, 22, 40, 55, 15],
        backgroundColor: ["#F3F00D", "#0f0f0e"],
        barThickness: 45,
      },
    ],
  };

  const optionsBar = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return {
    dataLine,
    optionsLine,
    dataDoughnut,
    optionsDoughnut,
    dataBar,
    optionsBar,
  };
};
