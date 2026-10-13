
export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => {
    if (produto.price === null || produto.price === undefined || produto.price === "") {
      return total
    }

    const preco = Number(produto.price)

    return total + (Number.isFinite(preco) ? preco : 0)
  }, 0)
}

export function agruparItens(carrinho) {
  const itens = []

  carrinho.forEach((produto) => {
    const existente = itens.find((item) => item.produto.id === produto.id)

    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })

  return itens
}
