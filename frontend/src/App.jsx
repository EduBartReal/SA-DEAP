import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/equipamentos";

const formularioInicial = {
  numero_serie: "",
  modelo: "",
  status: "",
  categoria_id: "",
  setor_id: "",
};

function App() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEdicao, setIdEdicao] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function carregarEquipamentos() {
    try {
      setCarregando(true);

      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os equipamentos.");
      }

      const dados = await resposta.json();
      setEquipamentos(dados);
    } catch (erro) {
      exibirMensagem(erro.message, "erro");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
  let ativo = true;

  async function carregarInicial() {
    try {
      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os equipamentos.");
      }

      const dados = await resposta.json();

      if (ativo) {
        setEquipamentos(dados);
      }
    } catch (erro) {
      if (ativo) {
        setMensagem(erro.message);
        setTipoMensagem("erro");
      }
    } finally {
      if (ativo) {
        setCarregando(false);
      }
    }
  }

  carregarInicial();

  return () => {
    ativo = false;
  };
}, []);

  function exibirMensagem(texto, tipo) {
    setMensagem(texto);
    setTipoMensagem(tipo);

    setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 4000);
  }

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((formularioAnterior) => ({
      ...formularioAnterior,
      [name]: value,
    }));
  }

  function validarFormulario() {
    return Object.values(formulario).every(
      (valor) => String(valor).trim() !== ""
    );
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();

    if (!validarFormulario()) {
      exibirMensagem("Preencha todos os campos do formulário.", "erro");
      return;
    }

    const dados = {
      ...formulario,
      categoria_id: Number(formulario.categoria_id),
      setor_id: Number(formulario.setor_id),
    };

    const editando = idEdicao !== null;
    const url = editando ? `${API_URL}/${idEdicao}` : API_URL;
    const metodo = editando ? "PUT" : "POST";

    try {
      setSalvando(true);

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível salvar o equipamento."
        );
      }

      exibirMensagem(
        editando
          ? "Equipamento atualizado com sucesso."
          : "Equipamento cadastrado com sucesso.",
        "sucesso"
      );

      limparFormulario();
      await carregarEquipamentos();
    } catch (erro) {
      exibirMensagem(erro.message, "erro");
    } finally {
      setSalvando(false);
    }
  }

  function editarEquipamento(equipamento) {
    setIdEdicao(equipamento.id);

    setFormulario({
      numero_serie: equipamento.numero_serie,
      modelo: equipamento.modelo,
      status: equipamento.status,
      categoria_id: String(equipamento.categoria_id),
      setor_id: String(equipamento.setor_id),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function excluirEquipamento(id) {
    const confirmou = window.confirm(
      "Tem certeza de que deseja excluir este equipamento?"
    );

    if (!confirmou) {
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível excluir o equipamento."
        );
      }

      if (idEdicao === id) {
        limparFormulario();
      }

      exibirMensagem("Equipamento excluído com sucesso.", "sucesso");
      await carregarEquipamentos();
    } catch (erro) {
      exibirMensagem(erro.message, "erro");
    }
  }

  function limparFormulario() {
    setFormulario(formularioInicial);
    setIdEdicao(null);
  }

  return (
    <main className="container">
      <header className="cabecalho">
        <div>
          <p className="subtitulo">Gerenciamento de Inventário de TI</p>
          <h1>Controle de equipamentos</h1>
        </div>

        <span className="quantidade">
          {equipamentos.length} equipamento(s)
        </span>
      </header>

      {mensagem && (
        <div className={`mensagem ${tipoMensagem}`} role="alert">
          {mensagem}
        </div>
      )}

      <section className="painel formulario-painel">
        <div className="titulo-secao">
          <div>
            <h2>
              {idEdicao !== null
                ? "Editar equipamento"
                : "Cadastrar equipamento"}
            </h2>

            <p>
              Preencha os dados necessários para salvar o equipamento.
            </p>
          </div>
        </div>

        <form onSubmit={enviarFormulario} className="formulario">
          <div className="campo">
            <label htmlFor="numero_serie">Número de série</label>
            <input
              id="numero_serie"
              name="numero_serie"
              value={formulario.numero_serie}
              onChange={atualizarCampo}
              placeholder="Ex.: SN004"
            />
          </div>

          <div className="campo">
            <label htmlFor="modelo">Modelo</label>
            <input
              id="modelo"
              name="modelo"
              value={formulario.modelo}
              onChange={atualizarCampo}
              placeholder="Ex.: Dell Latitude 5420"
            />
          </div>

          <div className="campo">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formulario.status}
              onChange={atualizarCampo}
            >
              <option value="">Selecione</option>
              <option value="Disponível">Disponível</option>
              <option value="Em uso">Em uso</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Descartado">Descartado</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="categoria_id">Categoria</label>
            <select
              id="categoria_id"
              name="categoria_id"
              value={formulario.categoria_id}
              onChange={atualizarCampo}
            >
              <option value="">Selecione</option>
              <option value="1">Notebook</option>
              <option value="2">Monitor</option>
              <option value="3">Periférico</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="setor_id">Setor</label>
            <select
              id="setor_id"
              name="setor_id"
              value={formulario.setor_id}
              onChange={atualizarCampo}
            >
              <option value="">Selecione</option>
              <option value="1">TI</option>
              <option value="2">Financeiro</option>
              <option value="3">RH</option>
            </select>
          </div>

          <div className="acoes-formulario">
            <button
              className="botao primario"
              type="submit"
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : idEdicao !== null
                  ? "Salvar alterações"
                  : "Cadastrar"}
            </button>

            {idEdicao !== null && (
              <button
                className="botao secundario"
                type="button"
                onClick={limparFormulario}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="painel">
        <div className="titulo-secao">
          <div>
            <h2>Equipamentos cadastrados</h2>
            <p>Lista carregada diretamente do PostgreSQL pela API.</p>
          </div>

          <button
            type="button"
            className="botao secundario"
            onClick={carregarEquipamentos}
          >
            Atualizar lista
          </button>
        </div>

        {carregando ? (
          <p className="estado">Carregando equipamentos...</p>
        ) : equipamentos.length === 0 ? (
          <p className="estado">Nenhum equipamento cadastrado.</p>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Número de série</th>
                  <th>Modelo</th>
                  <th>Status</th>
                  <th>Categoria</th>
                  <th>Setor</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {equipamentos.map((equipamento) => (
                  <tr key={equipamento.id}>
                    <td>{equipamento.id}</td>
                    <td>{equipamento.numero_serie}</td>
                    <td>{equipamento.modelo}</td>
                    <td>
                      <span className="status">{equipamento.status}</span>
                    </td>
                    <td>{equipamento.categoria}</td>
                    <td>{equipamento.setor}</td>
                    <td>
                      <div className="acoes-tabela">
                        <button
                          type="button"
                          className="botao editar"
                          onClick={() => editarEquipamento(equipamento)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="botao excluir"
                          onClick={() =>
                            excluirEquipamento(equipamento.id)
                          }
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;