import { $ } from '@wdio/globals'

class CartPage {
    get botaoNovoEndereco() { return $('~addNewAddress') }
    get enderecoSelecionado() { return $('~addressName') }
    get botaoContinuarPagamento() { return $('~selectAddressOrContinueToPayment') }

    async aguardarCarrinho() {
        await this.botaoContinuarPagamento.waitForDisplayed({ timeout: 30000 })
    }

    async possuiEndereco() {
        return await this.enderecoSelecionado.isExisting()
    }

    async irParaPagamento() {
        await this.enderecoSelecionado.waitForDisplayed({ timeout: 30000 })
        await this.botaoContinuarPagamento.click()
    }
}

export default new CartPage()
