import { $ } from '@wdio/globals'

class HomePage {
    // Abas da barra inferior: tab-Home, tab-Browse, tab-Account
    async abrirAba(nome) {
        await $(`~tab-${nome}`).click()
    }

    get iconeCarrinho() { return $('~cart') }

    async abrirCarrinho() {
        await this.iconeCarrinho.click()
    }
}

export default new HomePage()
