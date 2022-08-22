
const fs = require('fs')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV || "dev";
let configBuffer = null


switch (NODE_ENV) {

    case 'prod':
        configBuffer = fs.readFileSync(
            path.resolve(__dirname, 'production.json'),
            'utf-8'
        )
        break

    case 'dev':
        configBuffer = fs.readFileSync(
            path.resolve(__dirname, 'development.json'),
            'utf-8'
        )


}

let config = JSON.parse(configBuffer)
module.exports = config
