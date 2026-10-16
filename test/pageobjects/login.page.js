import { $, driver } from '@wdio/globals'

class LoginPage {
    get campoEmail() { return $('~email') }
    get campoSenha() { return $('-ios predicate string:name == "Password"') }
    get botaoLogin() { return $('~btnLogin') }

    async login(email, senha) {
        await this.campoEmail.setValue(email)
        await this.campoSenha.setValue(senha)
        await this.esconderTeclado()
        await this.botaoLogin.click()
    }

    // Com o teclado aberto, o app esconde a barra de abas (tab-Home, tab-Browse...)
    async esconderTeclado() {
        try {
            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard()
            }
        } catch (erro) {
            // Se o teclado não puder ser fechado por comando, segue o fluxo
        }
    }
}

export default new LoginPage()
