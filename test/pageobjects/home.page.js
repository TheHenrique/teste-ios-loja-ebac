import { $ } from '@wdio/globals'

// Abas da barra inferior do app (ids que existem no iPhone real)
class HomePage {
    get abaPerfil() { return $('~tab-Account') }
    get abaBrowse() { return $('~tab-Browse') }

    async abrirPerfil() {
        await this.abaPerfil.waitForDisplayed()
        await this.abaPerfil.click()
    }

    // Área de busca/lista de produtos
    async abrirBrowse() {
        await this.abaBrowse.waitForDisplayed()
        await this.abaBrowse.click()
    }
}

export default new HomePage()
