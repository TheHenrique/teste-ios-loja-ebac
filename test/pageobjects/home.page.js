import { $ } from '@wdio/globals'

class HomePage {
    // Abas da barra inferior: tab-Home, tab-Browse, tab-Account
    async abrirAba(nome) {
        const aba = $(`~tab-${nome}`)
        // Espera a barra de abas voltar (ex.: enquanto o login ainda está carregando)
        await aba.waitForDisplayed({ timeout: 30000 })
        await aba.click()
    }

    get iconeCarrinho() { return $('~cart') }

    async abrirCarrinho() {
        await this.iconeCarrinho.click()
    }
}

export default new HomePage()
