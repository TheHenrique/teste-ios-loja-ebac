import { $ } from '@wdio/globals'

class LoginPage {
    get campoEmail() { return $('~email') }
    get campoSenha() { return $('-ios predicate string:name == "Password" OR name == "password"') }
    get botaoLogin() { return $('~btnLogin') }

    async login(email, senha) {
        await this.campoEmail.waitForDisplayed()
        await this.campoEmail.setValue(email)
        await this.campoSenha.setValue(senha)
        await this.botaoLogin.click()
        // Se o login der certo, o app sai da tela de login e volta para a Home
        await this.botaoLogin.waitForDisplayed({
            reverse: true,
            timeoutMsg: 'O login não foi concluído: o app continuou na tela de login'
        })
    }
}

export default new LoginPage()
