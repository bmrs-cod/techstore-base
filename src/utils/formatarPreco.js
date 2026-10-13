
export function formatarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return 'Preço indisponível'
  }

  const preco = Number(valor)

  if (!Number.isFinite(preco)) {
    return 'Preço indisponível'
  }

  return preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
