// Referências do DOM
const form = document.getElementById("form-palpites");
const listaResultados = document.getElementById("lista-resultados");

// Função para registrar o palpite
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  // Obtendo os valores dos inputs de gols
  const palpites = [
    {
      time1: document.getElementById("time1-gols").value,
      time2: document.getElementById("time2-gols").value,
    },
    {
      time1: document.getElementById("time3-gols").value,
      time2: document.getElementById("time4-gols").value,
    },
  ];

  // Enviar dados para o backend
  try {
    const response = await fetch("http://localhost:5000/palpites/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome = , // Aqui você pode pegar o nome do input também
        telefone: "11912345678", // E o telefone do input
        palpites: palpites,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Palpite registrado com sucesso!");
      form.reset();
      getResultados(); // Atualiza a lista de resultados
    } else {
      alert("Erro ao registrar palpite. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro na comunicação com o servidor.");
  }
});

// Função para buscar os resultados
async function getResultados() {
  try {
    const response = await fetch("http://localhost:5000/palpites/listar");
    const data = await response.json();

    // Limpar a lista atual de resultados
    listaResultados.innerHTML = "";

    // Exibir os resultados
    data.forEach((palpite) => {
      const li = document.createElement("li");
      li.textContent = `${palpite.nome}: ${palpite.palpites.map(
        (item) => `${item.time1} x ${item.time2}`
      ).join(", ")}`;
      listaResultados.appendChild(li);
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Carregar os resultados ao iniciar a página
getResultados();

