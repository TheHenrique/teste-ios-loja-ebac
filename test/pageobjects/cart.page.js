import { $ } from '@wdio/globals'

class CartPage {
    get nomeProduto() { return $('~productName') }
    get botaoNovoEndereco() { return $('~addNewAddress') }
    get enderecoSelecionado() { return $('~addressName') }
    get botaoContinuarPagamento() { return $('~selectAddressOrContinueToPayment') }

    async possuiEndereco() {
        return await this.enderecoSelecionado.isExisting()
    }

    async irParaPagamento() {
        await this.botaoContinuarPagamento.click()
    }
}

export default new CartPage()
