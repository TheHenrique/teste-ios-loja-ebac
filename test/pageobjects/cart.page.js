import { $ } from '@wdio/globals'

class CartPage {
    get botaoContinuar() { return $('~selectAddressOrContinueToPayment') }
    get enderecoSelecionado() { return $('~addressName') }
    get botaoNovoEndereco() { return $('~addNewAddress') }

    // Espera o carrinho abrir e dá um tempo para os endereços do usuário carregarem
    async possuiEndereco() {
        await this.botaoContinuar.waitForDisplayed()
        return this.enderecoSelecionado.waitForDisplayed({ timeout: 15000 }).then(() => true, () => false)
    }

    async adicionarEndereco() {
        await this.botaoNovoEndereco.waitForDisplayed()
        await this.botaoNovoEndereco.click()
    }

    async irParaPagamento() {
        await this.enderecoSelecionado.waitForDisplayed()
        await this.botaoContinuar.click()
    }
}

export default new CartPage()
