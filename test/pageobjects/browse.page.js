import { $ } from '@wdio/globals'

class BrowsePage {
    get campoBusca() { return $('~searchInput') }

    produto(nome) {
        return $(`-ios predicate string:name == "productDetails" AND visible == 1 AND label BEGINSWITH "${nome}"`)
    }

    // Busca o produto pelo nome. Se a lista não atualizar (a busca roda a cada letra digitada), digita de novo.
    async escolherProduto(nome) {
        await this.campoBusca.waitForDisplayed()
        const produto = this.produto(nome)
        for (let tentativa = 1; tentativa <= 3; tentativa++) {
            await this.campoBusca.setValue(nome)
            const apareceu = await produto.waitForDisplayed({ timeout: 20000 }).then(() => true, () => false)
            if (apareceu) {
                await produto.click()
                return
            }
        }
        throw new Error(`O produto "${nome}" não apareceu na busca do app`)
    }
}

export default new BrowsePage()
