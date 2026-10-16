import { $ } from '@wdio/globals'

class LoginPage {
    get campoEmail() { return $('~email') }
    get campoSenha() { return $('-ios predicate string:name == "Password" OR name == "password"') }
    get botaoLogin() { return $('~btnLogin') }

    // O próprio app fecha o teclado ao clicar em Login e, se der certo, volta para a Home
    async login(email, senha) {
        await this.campoEmail.waitForDisplayed({ timeout: 30000 })
        await this.campoEmail.setValue(email)
        await this.campoSenha.setValue(senha)
        await this.botaoLogin.click()
    }
}

export default new LoginPage()
