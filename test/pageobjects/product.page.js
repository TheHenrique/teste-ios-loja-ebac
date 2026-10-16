import { $ } from '@wdio/globals'

class ProductPage {
    get botaoAdicionarCarrinho() { return $('~addToCart') }

    // Ao adicionar, o app abre o carrinho sozinho
    async adicionarAoCarrinho() {
        await this.botaoAdicionarCarrinho.waitForDisplayed()
        await this.botaoAdicionarCarrinho.click()
    }
}

export default new ProductPage()
