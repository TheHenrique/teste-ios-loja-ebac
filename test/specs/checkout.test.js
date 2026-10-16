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
        await homePage.abrirAba('Account')
        await loginPage.login('cliente@ebac.art.br', 'GD*peToHNJ1#c$sgk08EaYJQ')

        // 2. Área de busca (Browse) e escolha do produto
        await homePage.abrirAba('Browse')
        await browsePage.escolherProduto(0)

        // 3. Adiciona o produto no carrinho
        await productPage.adicionarAoCarrinho()
        await homePage.abrirCarrinho()
        await expect(cartPage.nomeProduto).toBeDisplayed()

        // 4. Adiciona um endereço, se ainda não existir
        if (!(await cartPage.possuiEndereco())) {
            await cartPage.botaoNovoEndereco.click()
            await addressPage.cadastrar({
                nome: 'Cliente EBAC',
                telefone: '11999999999',
                endereco: 'Rua dos Testes, 100',
                cidade: 'São Paulo',
                estado: 'SP',
                cep: '01001000'
            })
        }
        await expect(cartPage.enderecoSelecionado).toBeDisplayed()

        // 5. Pagamento e conclusão do checkout
        await cartPage.irParaPagamento()
        await expect(checkoutPage.valorTotal).toBeDisplayed()
        await checkoutPage.finalizarCompra()

        await expect(checkoutPage.imagemSucesso).toBeDisplayed()
    })
})
