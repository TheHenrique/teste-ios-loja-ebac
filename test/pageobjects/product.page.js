import { $ } from '@wdio/globals'

class ProductPage {
    get botaoAdicionarCarrinho() { return $('~addToCart') }

    // Ao adicionar, o app abre o carrinho sozinho
    async adicionarAoCarrinho() {
        await this.botaoAdicionarCarrinho.waitForDisplayed({ timeout: 30000 })
        await this.botaoAdicionarCarrinho.click()
    }
}

export default new ProductPage()
