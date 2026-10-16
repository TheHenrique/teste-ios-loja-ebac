import { $ } from '@wdio/globals'

// Os campos de endereço não têm id no iOS: são achados pelo texto de exemplo (placeholder),
// só entre os campos de texto (os títulos "City", "State" e "ZipCode" têm o mesmo texto)
const campo = (texto) => $(`-ios predicate string:type == "XCUIElementTypeTextField" AND (placeholderValue == "${texto}" OR value == "${texto}")`)

class AddressPage {
    get campoNome() { return campo('Enter your name') }
    get campoTelefone() { return campo('Enter your mobile number') }
    get campoEndereco() { return campo('Enter your address') }
    get campoCidade() { return campo('City') }
    get campoEstado() { return campo('State') }
    get campoCep() { return campo('ZipCode') }
    get tituloNome() { return $('-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "Name"') }
    get botaoSalvar() { return $('~save') }

    // O Enter ("\n") de cada campo leva ao próximo; no CEP, o Enter salva o endereço
    async cadastrar(dados) {
        await this.campoNome.waitForDisplayed()
        await this.campoNome.addValue(dados.nome + '\n')
        await this.campoTelefone.addValue(dados.telefone + '\n')
        await this.campoEndereco.addValue(dados.endereco + '\n')
        await this.campoCidade.addValue(dados.cidade + '\n')
        await this.campoEstado.addValue(dados.estado + '\n')
        await this.campoCep.addValue(dados.cep + '\n')

        // Se a tela não fechar sozinha, fecha o teclado (toque fora do campo) e toca em Save
        const salvou = await this.botaoSalvar.waitForDisplayed({ reverse: true, timeout: 15000 }).then(() => true, () => false)
        if (!salvou) {
            await this.tituloNome.click()
            await this.botaoSalvar.click()
        }
    }
}

export default new AddressPage()
