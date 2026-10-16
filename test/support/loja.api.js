// Preparação da massa de teste pela API da própria Loja EBAC (a mesma API que o app usa)
const API = process.env.LOJA_API_URL || 'http://lojaebac.ebaconline.art.br'

// Usuário usado no teste (login no app e na API)
export const USUARIO = { email: 'admin@admin.com', senha: 'admin123' }

async function chamar(caminho, { metodo = 'GET', token = '', corpo } = {}) {
    const resposta = await fetch(`${API}${caminho}`, {
        method: metodo,
        headers: { 'Content-Type': 'application/json', authorization: token, Cookie: 'ebacStoreVersion=v2' },
        body: corpo ? JSON.stringify(corpo) : undefined
    })
    if (!resposta.ok) {
        throw new Error(`API da loja: ${metodo} ${caminho} respondeu ${resposta.status} - ${await resposta.text()}`)
    }
    return resposta.json()
}

const ADD_PRODUCT = `
    mutation AddProduct($name: String, $categories: [CategoryInput], $description: String,
        $price: Float, $specialPrice: Float, $photos: [String], $popular: Boolean,
        $quantity: Float, $visible: Boolean, $location: String, $additionalDetails: [String]) {
        addProduct(name: $name, categories: $categories, description: $description,
            price: $price, specialPrice: $specialPrice, photos: $photos, popular: $popular,
            quantity: $quantity, visible: $visible, location: $location, additionalDetails: $additionalDetails) {
            name
        }
    }`

// 1. Esvazia o carrinho do usuário: o admin é usado por todos os alunos e pode ter itens de outras pessoas
// 2. Cria um produto novo com estoque: os produtos mais vendidos da loja ficam com estoque zerado
// Devolve o nome do produto criado, para o teste buscar no app
export async function prepararCompra() {
    const { data: usuario } = await chamar('/public/authUser', {
        metodo: 'POST',
        corpo: { email: USUARIO.email, password: USUARIO.senha }
    })

    const { cart } = await chamar(`/public/getCart?userId=${usuario._id}`, { token: usuario.token })
    for (const item of cart?.products ?? []) {
        if (!item.productId?._id) continue
        await chamar(`/public/updateCart/${usuario._id}`, {
            metodo: 'PUT',
            token: usuario.token,
            corpo: { productId: item.productId._id, quantity: 0 }
        }).catch(() => {})
    }

    const nome = `Produto iOS EBAC ${Date.now()}`
    const resposta = await chamar('/graphql', {
        metodo: 'POST',
        token: usuario.token,
        corpo: {
            query: ADD_PRODUCT,
            variables: {
                name: nome,
                categories: [],
                description: 'Produto criado pelo teste automatizado iOS',
                price: 100,
                specialPrice: 90,
                photos: ['https://via.placeholder.com/150'],
                popular: false,
                quantity: 100,
                visible: true,
                location: 'Brasil',
                additionalDetails: ['Teste iOS']
            }
        }
    })
    if (resposta.errors) {
        throw new Error(`API da loja: erro ao criar o produto - ${JSON.stringify(resposta.errors)}`)
    }
    return nome
}
