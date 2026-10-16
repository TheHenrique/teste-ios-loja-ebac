import { $, $$ } from '@wdio/globals'

// No iOS, as "caixas" que agrupam a tela também carregam o texto de tudo que está dentro delas.
// Por isso, entre os elementos encontrados, clicamos no MENOR (o botão de verdade).
async function clicarNoMenor(seletor) {
    await $(seletor).waitForDisplayed({ timeout: 30000 })
    const elementos = await $$(seletor)
    let menor = null
    let menorArea = Infinity
    for (const elemento of elementos) {
        if (!(await elemento.isDisplayed())) continue
        const { width, height } = await elemento.getSize()
        if (width * height < menorArea) {
            menorArea = width * height
            menor = elemento
        }
    }
    await menor.click()
}

class HomePage {
    // Aba de perfil na barra inferior (id que já funcionou no iPhone real)
    get abaPerfil() { return $('~tab-Account') }

    async abrirPerfil() {
        await this.abaPerfil.waitForDisplayed({ timeout: 30000 })
        await this.abaPerfil.click()
    }

    // Barra "Search Products" da Home, que leva para a área de busca (Browse)
    async abrirBusca() {
        await clicarNoMenor('-ios predicate string:name == "search-products" OR label ENDSWITH "Search Products"')
    }
}

export default new HomePage()
