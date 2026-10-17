import { expect } from '@wdio/globals'
import homePage from '../pageobjects/home.page.js'
import loginPage from '../pageobjects/login.page.js'
import browsePage from '../pageobjects/browse.page.js'
import productPage from '../pageobjects/product.page.js'
import cartPage from '../pageobjects/cart.page.js'
import addressPage from '../pageobjects/address.page.js'
import checkoutPage from '../pageobjects/checkout.page.js'

describe('Checkout no app iOS da Loja EBAC', () => {

    it('Deve fazer login, escolher um produto e concluir a compra', async () => {
        // 1. Login
        await homePage.abrirPerfil()
        await loginPage.login('admin@admin.com', 'admin123')

        // 2. Escolha do produto na lista (aba Browse)
        await homePage.abrirBrowse()
        await browsePage.escolherPrimeiroProduto()

        // 3. Adiciona o produto no carrinho (o app abre o carrinho em seguida)
        await productPage.adicionarAoCarrinho()

        // 4. Cadastra um endereço, se o usuário ainda não tiver
        if (!(await cartPage.possuiEndereco())) {
            await cartPage.adicionarEndereco()
            await addressPage.cadastrar({
                nome: 'Cliente EBAC',
                telefone: '11999999999',
                endereco: 'Rua dos Testes, 100',
                cidade: 'Sao Paulo',
                estado: 'SP',
                cep: '01001000'
            })
        }

        // 5. Pagamento e conclusão da compra
        await cartPage.irParaPagamento()
        await checkoutPage.finalizarCompra()

        await expect(checkoutPage.telaSucesso).toBeDisplayed({ wait: 60000 })
    })
})
