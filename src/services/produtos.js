
import { get } from './api'

export function buscarProdutos() {
  return get('/products.json').then((produtos) => {
    return produtos.map((produto) => {
      const valor = produto.price

      let preco = null

      if (valor !== null && valor !== undefined && valor !== '') {
        if (typeof valor === 'string') {
          const texto = valor.replace('R$', '').trim()
          const numero = texto.includes(',')
            ? texto.replace(/\./g, '').replace(',', '.')
            : texto

          preco = Number(numero)
        } else {
          preco = Number(valor)
        }
      }

      if (!Number.isFinite(preco) || preco < 0) {
        preco = null
      }

      return { ...produto, price: preco }
    })
  })
}
