import { $ } from '@wdio/globals'

class LoginPage {
    get campoEmail() { return $('~email') }
    get campoSenha() { return $('-ios predicate string:name == "Password"') }
    get botaoLogin() { return $('~btnLogin') }

    async login(email, senha) {
        await this.campoEmail.setValue(email)
        await this.campoSenha.setValue(senha)
        await this.botaoLogin.click()
    }
}

export default new LoginPage()
