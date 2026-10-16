import { $ } from '@wdio/globals'

class ProductPage {
    get botaoAdicionarCarrinho() { return $('~addToCart') }

    async adicionarAoCarrinho() {
        await this.botaoAdicionarCarrinho.click()
    }
}

export default new ProductPage()
