import { $$ } from '@wdio/globals'

class BrowsePage {
    get produtos() { return $$('~productDetails') }

    async escolherProduto(posicao) {
        const produtos = await this.produtos
        await produtos[posicao].click()
    }
}

export default new BrowsePage()
