
import { useState } from 'react'
import { Link } from 'react-router'
import { formatarPreco } from '../utils/formatarPreco'

export default function ProdutoCard({ produto, onAdicionar }) {
  const [adicionado, setAdicionado] = useState(false)

  const esgotado = produto.estoque <= 0
  const semPreco = produto.price === null ||
    produto.price === undefined ||
    produto.price === '' ||
    !Number.isFinite(Number(produto.price))

  function adicionar() {
    if (adicionado || esgotado || semPreco) return

    onAdicionar(produto)
    setAdicionado(true)
  }

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img
            src={produto.image}
            alt={produto.title}
            className="card-imagem"
          />
        </div>

        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate}
        <span> ({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">
            {formatarPreco(produto.precoOriginal)}
          </span>
        )}

        <span className="preco">
          {formatarPreco(produto.price)}
        </span>
      </div>

      <div className="card-selos">
        {esgotado && (
          <span className="selo selo-esgotado">Esgotado</span>
        )}
      </div>

      <button
        className="botao"
        onClick={adicionar}
        disabled={esgotado || semPreco || adicionado}
      >
        {esgotado
          ? 'Esgotado'
          : semPreco
            ? 'Preço indisponível'
            : adicionado
              ? 'Adicionado ao carrinho!'
              : 'Adicionar ao carrinho'}
      </button>
    </article>
  )
}
