import { $ } from '@wdio/globals'

// Os campos de endereço não têm id próprio no iOS; são encontrados pelo texto de exemplo (placeholder)
const campo = (texto) => $(`-ios predicate string:placeholderValue == "${texto}" OR name == "${texto}" OR value == "${texto}"`)

class AddressPage {
    get campoNome() { return campo('Enter your name') }
    get campoTelefone() { return campo('Enter your mobile number') }
    get campoEndereco() { return campo('Enter your address') }
    get campoCidade() { return campo('City') }
    get campoEstado() { return campo('State') }
    get campoCep() { return campo('ZipCode') }
    get botaoSalvar() { return $('~save') }

    async cadastrar(endereco) {
        await this.campoNome.waitForDisplayed({ timeout: 30000 })
        await this.campoNome.setValue(endereco.nome)
        await this.campoTelefone.setValue(endereco.telefone)
        await this.campoEndereco.setValue(endereco.endereco)
        await this.campoCidade.setValue(endereco.cidade)
        await this.campoEstado.setValue(endereco.estado)
        // O "\n" (Enter) no CEP aciona o salvamento, mesmo com o teclado cobrindo o botão Save
        await this.campoCep.setValue(endereco.cep + '\n')
        if (await this.botaoSalvar.isDisplayed()) {
            await this.botaoSalvar.click()
        }
    }
}

export default new AddressPage()
