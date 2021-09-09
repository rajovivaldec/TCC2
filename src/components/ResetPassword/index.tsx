import { useState } from "react";
import { Input } from "../Input";
import { useForm } from "../../hooks/useForm";
import { supabase } from "../../lib/initSupabase";

export function ResetPassword() {
  const password = useForm("password");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (password.validate()) {
      const { error } = await supabase.auth.update({
        password: password.value,
      });
      if (error) setError(error.message);
      else setMessage("Sua senha foi redefinada com sucesso!");
    } else {
      alert("Necessário preencher o campo Corretamente");
    }

    setLoading(false);
  };

  return (
    <div style={{ width: "300px" }}>
      {loading && <p>Carregando...</p>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && (
        <div style={{ color: "green", marginBottom: "1rem" }}>{message}</div>
      )}
      <h2 style={{ marginBottom: "2rem" }}>Entre com uma nova senha</h2>
      <form onSubmit={handlePasswordReset}>
        <Input
          label="Senha"
          type="password"
          id="password"
          placeholder="Insira sua senha"
          required
          {...password}
        />
        <button
          style={{
            marginTop: "2rem",
            backgroundColor: "var(--yellow-main)",
            border: "none",
            padding: "1rem",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
        >
          Mudar Senha
        </button>
      </form>
    </div>
  );
}
