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

        // 2. Área de busca (Browse) e escolha do produto
        await homePage.abrirBusca()
        await browsePage.escolherPrimeiroProduto('Produto')

        // 3. Adiciona o produto no carrinho (o app abre o carrinho em seguida)
        await productPage.adicionarAoCarrinho()
        await cartPage.aguardarCarrinho()

        // 4. Adiciona um endereço, se ainda não existir
        if (!(await cartPage.possuiEndereco())) {
            await cartPage.botaoNovoEndereco.click()
            await addressPage.cadastrar({
                nome: 'Cliente EBAC',
                telefone: '11999999999',
                endereco: 'Rua dos Testes, 100',
                cidade: 'Sao Paulo',
                estado: 'SP',
                cep: '01001000'
            })
        }

        // 5. Pagamento e conclusão do checkout
        await cartPage.irParaPagamento()
        await checkoutPage.finalizarCompra()

        await expect(checkoutPage.telaSucesso).toBeDisplayed({ wait: 30000 })
    })
})
