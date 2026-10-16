import { $, $$ } from '@wdio/globals'

class BrowsePage {
    get campoBusca() { return $('~searchInput') }
    get primeiroProduto() { return $('~productDetails') }
    get produtos() { return $$('~productDetails') }

    async buscar(termo) {
        await this.campoBusca.waitForDisplayed({ timeout: 30000 })
        await this.campoBusca.setValue(termo)
    }

    // Se a lista não aparecer sozinha, faz uma busca para carregar os produtos
    async escolherPrimeiroProduto(termo) {
        const apareceu = await this.primeiroProduto
            .waitForDisplayed({ timeout: 15000 })
            .catch(() => false)
        if (!apareceu) {
            await this.buscar(termo)
            await this.primeiroProduto.waitForDisplayed({ timeout: 30000 })
        }
        await this.primeiroProduto.click()
    }
}

export default new BrowsePage()
