import { expect } from '@wdio/globals'
import { USUARIO } from '../support/loja.api.js'
import homePage from '../pageobjects/home.page.js'
import loginPage from '../pageobjects/login.page.js'
import browsePage from '../pageobjects/browse.page.js'
import productPage from '../pageobjects/product.page.js'
import cartPage from '../pageobjects/cart.page.js'
import addressPage from '../pageobjects/address.page.js'
import checkoutPage from '../pageobjects/checkout.page.js'

describe('Checkout no app iOS da Loja EBAC', () => {
    let produto

    // Produto criado pela API no beforeSession (wdio.conf.js), antes de o app abrir
    before(() => {
        produto = process.env.PRODUTO_TESTE
        if (!produto) throw new Error('A massa de teste não foi criada pela API da loja (veja o erro no começo do log)')
    })

    it('Deve fazer login, escolher um produto e concluir a compra', async () => {
        // 1. Login
        await homePage.abrirPerfil()
        await loginPage.login(USUARIO.email, USUARIO.senha)

        // 2. Busca e escolha do produto (aba Browse)
        await homePage.abrirBrowse()
        await browsePage.escolherProduto(produto)

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
