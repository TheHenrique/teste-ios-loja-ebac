import path from 'path'

// Capacidades para rodar no simulador de iPhone (macOS + Xcode)
const simulador = {
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 15',
    'appium:platformVersion': '17.2',
    'appium:automationName': 'XCUITest',
    'appium:app': path.resolve('app', 'LojaEBAC-sim.app')
}

// Capacidades para rodar em iPhone real na Sauce Labs (app LojaEBAC.ipa enviado para a Sauce)
const sauceLabs = {
    platformName: 'iOS',
    'appium:deviceName': 'iPhone.*',
    'appium:platformVersion': '17',
    'appium:automationName': 'XCUITest',
    'appium:app': 'storage:filename=LojaEBAC.ipa',
    'sauce:options': {
        build: 'loja-ebac-ios',
        name: 'Checkout iOS'
    }
}

// Capacidades para rodar em iPhone real na BrowserStack (BROWSERSTACK_APP_URL vem do upload do LojaEBAC.ipa)
const browserStack = {
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 15',
    'appium:platformVersion': '17',
    'appium:automationName': 'XCUITest',
    'appium:app': process.env.BROWSERSTACK_APP_URL,
    'bstack:options': {
        projectName: 'Loja EBAC iOS',
        buildName: 'Checkout iOS - GitHub Actions',
        sessionName: 'Fluxo de checkout'
    }
}

function conexao() {
    if (process.env.BROWSERSTACK_USERNAME) {
        return {
            user: process.env.BROWSERSTACK_USERNAME,
            key: process.env.BROWSERSTACK_ACCESS_KEY,
            hostname: 'hub.browserstack.com',
            port: 443,
            protocol: 'https',
            path: '/wd/hub',
            capabilities: [browserStack]
        }
    }
    if (process.env.SAUCE_USERNAME) {
        return {
            user: process.env.SAUCE_USERNAME,
            key: process.env.SAUCE_ACCESS_KEY,
            hostname: 'ondemand.us-west-1.saucelabs.com',
            port: 443,
            protocol: 'https',
            path: '/wd/hub',
            capabilities: [sauceLabs]
        }
    }
    return { port: 4723, capabilities: [simulador] }
}

export const config = {
    runner: 'local',
    ...conexao(),
    specs: ['./test/specs/**/*.js'],
    maxInstances: 1,
    logLevel: 'info',
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 300000
    },
    // Se o teste falhar, mostra no log a estrutura da tela atual (ajuda a achar o seletor certo)
    afterTest: async function (test, context, { passed }) {
        if (!passed) {
            console.log('===== TELA NO MOMENTO DA FALHA =====')
            console.log(await driver.getPageSource())
        }
    }
}
