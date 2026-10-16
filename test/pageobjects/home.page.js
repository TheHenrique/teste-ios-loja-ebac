import { $, driver } from '@wdio/globals'

class HomePage {
    get abaPerfil() { return $('~tab-Account') }
    get abaBrowse() { return $('~tab-Browse') }

    async abrirPerfil() {
        await this.abaPerfil.waitForDisplayed()
        // Guarda o centro da aba Browse agora, enquanto a Home ainda responde rápido (antes do login)
        const { x, y } = await this.abaBrowse.getLocation()
        const { width, height } = await this.abaBrowse.getSize()
        this.centroBrowse = { x: Math.round(x + width / 2), y: Math.round(y + height / 2) }
        await this.abaPerfil.click()
    }

    // Depois do login, a Home mostra mais de 2 mil categorias e cada busca de elemento nela
    // leva cerca de 45 s. Por isso a aba Browse é tocada direto na posição guardada antes.
    async abrirBrowse() {
        await driver.action('pointer', { parameters: { pointerType: 'touch' } })
            .move(this.centroBrowse)
            .down()
            .pause(100)
            .up()
            .perform()
        // Plano B: se a área de busca não abrir, toca na aba pelo elemento (mais lento, mas funciona)
        const abriu = await $('~searchInput').waitForDisplayed({ timeout: 30000 }).then(() => true, () => false)
        if (!abriu) {
            await this.abaBrowse.click()
        }
    }
}

export default new HomePage()
