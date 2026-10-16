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

const usarSauce = process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY

export const config = {
    runner: 'local',
    ...(usarSauce
        ? {
            user: process.env.SAUCE_USERNAME,
            key: process.env.SAUCE_ACCESS_KEY,
            hostname: 'ondemand.us-west-1.saucelabs.com',
            port: 443,
            protocol: 'https',
            path: '/wd/hub'
        }
        : { port: 4723 }),
    specs: ['./test/specs/**/*.js'],
    maxInstances: 1,
    capabilities: [usarSauce ? sauceLabs : simulador],
    logLevel: 'info',
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    }
}
