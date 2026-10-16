import { $ } from '@wdio/globals'

class CheckoutPage {
    get valorTotal() { return $('~total') }
    get botaoFinalizar() { return $('~completeCheckout') }
    get imagemSucesso() { return $('~transactionSuccessfulImage') }

    // A única forma de pagamento do app é "Cash on Delivery", que já vem selecionada
    async finalizarCompra() {
        await this.botaoFinalizar.click()
    }
}

export default new CheckoutPage()
