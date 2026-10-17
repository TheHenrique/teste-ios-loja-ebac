import { $ } from '@wdio/globals'

class BrowsePage {
    // Primeiro produto visível da lista
    get primeiroProduto() { return $('-ios predicate string:name == "productDetails" AND visible == 1') }

    async escolherPrimeiroProduto() {
        await this.primeiroProduto.waitForDisplayed()
        await this.primeiroProduto.click()
    }
}

export default new BrowsePage()
