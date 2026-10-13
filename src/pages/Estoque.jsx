
import { useState } from 'react'

export default function Estoque({ produtos }) {
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  const [interessados] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('interessados') || '[]')
    } catch {
      return []
    }
  })

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>

      <p className="aviso">
        Produtos com menos de 5 unidades precisam de reposição.
      </p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>

          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && (
                    <span className="selo selo-esgotado">Esgotado</span>
                  )}

                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}

                  {produto.estoque >= 5 && (
                    <span className="selo selo-ok">OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lista de espera</h2>

      <p className="aviso">
        Clientes interessados em produtos esgotados: {interessados.length}
      </p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>

          <tbody>
            {interessados.map((cliente, indice) => {
              const produto = produtos.find(
                (item) => item.id === cliente.produtoId
              )

              return (
                <tr key={indice}>
                  <td>{produto ? produto.title : 'Produto não encontrado'}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {interessados.length === 0 && (
          <p className="aviso">
            Nenhum cliente cadastrado na lista de espera.
          </p>
        )}
      </div>
    </section>
  )
}
