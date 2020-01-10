import {
    Application
} from 'pixi.js-legacy'


import Grid from './Grid'

const app = new Application({
    backgroundColor: 0xffffff,
    resizeTo: window
})

const grid = new Grid

app.stage.addChild(grid)

console.log(grid)

document.body.append(app.view)