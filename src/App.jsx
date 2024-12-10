import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [livros, setLivros] = useState([]);
  const { handleSubmit, register, reset} = useForm();

  async function loadData() {
    const resposta = await fetch("http://localhost:3000/livros");
    const dados = await resposta.json();
    setLivros(dados);
  }

  async function excluirLivro(id) {
    await fetch(`http://localhost:3000/livros/${id}`, {
      method: "DELETE",
    });
    loadData();
  }

  async function editarLivro(id) {
    const titulo = window.prompt("Digite um novo titulo:");
    await fetch(`http://localhost:3000/livros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    loadData();
  }

  async function salvarLivro(dados) {
    await fetch("http://localhost:3000/livros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    loadData();
    reset();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>Livros</h1>

      <form onSubmit={handleSubmit(salvarLivro)}>
        <div>
          <label htmlFor="titulo">Titulo</label> <br />
          <input type="text" id="titulo" {...register("titulo")} />
        </div>
        <div>
          <label htmlFor="autor">Autor</label> <br />
          <input type="text" id="autor" {...register("autor")} />
        </div>
        <div>
          <label htmlFor="paginas">Paginas</label> <br />
          <input type="text" id="paginas" {...register("paginas")} />
        </div>
        <div>
          <label htmlFor="categoria">Categoria</label> <br />
          <select id="categoria" {...register("categoria")}>
            <option value="Ação">Ação</option>
            <option value="Terror">Terror</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div>
          <label htmlFor="dataPublicacao">Data de Publicacao</label> <br />
          <input type="text" id="dataPublicacao" {...register("dataPublicacao")} />
        </div>
        <div>
          <label htmlFor="isbn">ISBN</label> <br />
          <input type="text" id="isbn" {...register("isbn")} />
        </div>
        <button>
          Adicionar
        </button>
      </form> <br />

      <table>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.paginas}</td>
              <td>{livro.categoria}</td>
              <td>
                <button onClick={() => editarLivro(livro.id)}>Editar</button>
              </td>
              <td>
                <button onClick={() => excluirLivro(livro.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
