import { $ } from '@wdio/globals'

class CheckoutPage {
    get botaoFinalizar() { return $('~completeCheckout') }
    get telaSucesso() {
        return $('-ios predicate string:name == "transactionSuccessfulImage" OR name == "goBackHome" OR label CONTAINS "Go Back Home"')
    }

    // A única forma de pagamento do app é "Cash on Delivery", que já vem selecionada
    async finalizarCompra() {
        await this.botaoFinalizar.waitForDisplayed({ timeout: 30000 })
        await this.botaoFinalizar.click()
    }
}

export default new CheckoutPage()
