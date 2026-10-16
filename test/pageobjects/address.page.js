import { $ } from '@wdio/globals'

class AddressPage {
    get campoNome() { return $('~name') }
    get campoTelefone() { return $('~phone') }
    get campoEndereco() { return $('~address') }
    get campoCidade() { return $('~city') }
    get campoEstado() { return $('~state') }
    get campoCep() { return $('~zipCode') }
    get botaoSalvar() { return $('~save') }

    async cadastrar(endereco) {
        await this.campoNome.setValue(endereco.nome)
        await this.campoTelefone.setValue(endereco.telefone)
        await this.campoEndereco.setValue(endereco.endereco)
        await this.campoCidade.setValue(endereco.cidade)
        await this.campoEstado.setValue(endereco.estado)
        await this.campoCep.setValue(endereco.cep)
        await this.botaoSalvar.click()
    }
}

export default new AddressPage()
