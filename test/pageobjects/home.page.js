import { $ } from '@wdio/globals'

class HomePage {
    // Aba de perfil (Account/Profile) da barra inferior
    get abaPerfil() {
        return $('-ios predicate string:name == "tab-Account" OR label CONTAINS "Profile"')
    }

    // Barra "Search Products" da Home, que leva para a área de busca (Browse)
    get barraDeBusca() {
        return $('-ios predicate string:name == "search-products" OR label CONTAINS "Search Products"')
    }

    async abrirPerfil() {
        await this.abaPerfil.waitForDisplayed({ timeout: 30000 })
        await this.abaPerfil.click()
    }

    async abrirBusca() {
        await this.barraDeBusca.waitForDisplayed({ timeout: 30000 })
        await this.barraDeBusca.click()
    }
}

export default new HomePage()
