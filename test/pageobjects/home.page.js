import { $ } from '@wdio/globals'

// Texto que aparece embaixo de cada aba no app
const textoDaAba = { Home: 'Home', Browse: 'Browse', Account: 'Profile' }

class HomePage {
    // Procura a aba pelo id (tab-Browse) ou, se não achar, pelo texto que aparece na tela
    async abrirAba(nome) {
        const texto = textoDaAba[nome] || nome
        const aba = $(`-ios predicate string:name == "tab-${nome}" OR (type == "XCUIElementTypeButton" AND label BEGINSWITH "${texto}")`)
        await aba.waitForDisplayed({ timeout: 30000 })
        await aba.click()
    }

    get iconeCarrinho() { return $('~cart') }

    async abrirCarrinho() {
        await this.iconeCarrinho.click()
    }
}

export default new HomePage()
