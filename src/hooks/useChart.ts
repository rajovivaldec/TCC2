import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/initSupabase";

export const useChart = () => {
  const { user } = useAuth();
  const [genre, setGenre] = useState([]);
  const [namePlans, setNamePlans] = useState([]);
  const [studentsPlansData, setStudentsPlansData] = useState([]);

  useEffect(() => {
    async function fetchData() {
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

        const { data: studentsPlans } = await supabase
          .from("total_alunos_planos")
          .select("*")
          .eq("user_id", user.id);

        const { data: plans } = await supabase
          .from("planos")
          .select(`id, nome`)
          .filter("excluido", "eq", "false")
          .order("id", { ascending: true })
          .eq("user_id", user.id);

        const namePlans = plans.map((plan) => plan.nome);
        setGenre([...genre, totalFemale, male, others]);
        setNamePlans(namePlans);
        const studentsPlansArray = studentsPlans.map((item) => item.count);
        setStudentsPlansData(studentsPlansArray);
      }
    }
    fetchData();
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
    labels: namePlans,
    datasets: [
      {
        data: studentsPlansData,
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
