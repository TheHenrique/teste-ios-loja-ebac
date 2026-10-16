import { $ } from '@wdio/globals'

class CheckoutPage {
    get botaoFinalizar() { return $('~completeCheckout') }
    get telaSucesso() { return $('~goBackHome') }

    // A única forma de pagamento do app é "Cash on Delivery", que já vem selecionada
    async finalizarCompra() {
        await this.botaoFinalizar.waitForDisplayed()
        await this.botaoFinalizar.click()
    }
}

export default new CheckoutPage()
