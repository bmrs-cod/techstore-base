
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { formatarPreco } from '../utils/formatarPreco'

export default function PaginaProduto({ produtos, onAdicionar }) {
  const { id } = useParams()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')

  const produto = produtos.find((item) => item.id === id)

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = produto.estoque <= 0
  const semPreco = produto.price === null || !Number.isFinite(Number(produto.price))

  const relacionados = produtos
    .filter((item) =>
      item.category === produto.category &&
      item.id !== produto.id &&
      item.estoque > 0
    )
    .slice(0, 4)

  function solicitarAviso(evento) {
    evento.preventDefault()

    const interessados = JSON.parse(localStorage.getItem('interessados') || '[]')

    const jaCadastrado = interessados.some(
      (item) => item.produtoId === produto.id &&
        item.email.toLowerCase() === email.trim().toLowerCase()
    )

    if (jaCadastrado) {
      setMensagem('Este e-mail já está cadastrado para este produto.')
      return
    }

    interessados.push({
      produtoId: produto.id,
      nome: nome.trim(),
      email: email.trim()
    })

    localStorage.setItem('interessados', JSON.stringify(interessados))

    setMensagem('Cadastro realizado! Você está na lista de espera.')
    setNome('')
    setEmail('')
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img
            src={produto.image}
            alt={produto.title}
            className="detalhe-imagem"
          />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>

          <p className="card-avaliacao">
            ★ {produto.rating.rate}
            <span> ({produto.rating.count} avaliações)</span>
          </p>

          <p className="detalhe-preco">
            {formatarPreco(produto.price)}
          </p>

          <p className="detalhe-descricao">
            {produto.description}
          </p>

          <p className="detalhe-estoque">
            {esgotado ? 'Produto esgotado' : `${produto.estoque} unidades disponíveis`}
          </p>

          {esgotado ? (
            <form onSubmit={solicitarAviso} className="cupom">
              <h2>Avise-me quando chegar</h2>
              <p>Deixe seus dados para entrar na lista de espera.</p>

              <label htmlFor="nome" className="rotulo">Nome</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                required
              />

              <label htmlFor="email" className="rotulo">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                required
              />

              <button className="botao botao-grande" type="submit">
                Quero ser avisado
              </button>

              {mensagem && <p className="aviso">{mensagem}</p>}
            </form>
          ) : (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={semPreco}
            >
              {semPreco ? 'Preço indisponível' : 'Adicionar ao carrinho'}
            </button>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>

      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard
            key={item.id}
            produto={item}
            onAdicionar={onAdicionar}
          />
        ))}
      </div>
    </section>
  )
}
