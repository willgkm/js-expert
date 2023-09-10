import database from './../database.json'
import Draftlog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readLine from 'readline'

import Person from './person.js'

const DEFAULT_LANGUEGE = 'pt-BR'
Draftlog(console).addLineListener(process.stdin)

const options = {
  leftPad: 2, 
  columns: [
    { field: "id", name: chalk.red("ID") },
    { field: "vehicles", name: chalk.cyan("VEHICLES") },
    { field: "kmTraveled", name: chalk.cyan("KMTRAVELED") },
    { field: "from", name: chalk.cyan("FROM") },
    { field: "to", name: chalk.cyan("TO") }
  ]
}

const table = chalkTable(options, database.map(item => new Person(item).formatterd(DEFAULT_LANGUEGE)))
const print = console.draft(table)

const terminal = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})


terminal.question('Mensagem: ', msg => {
  console.log('msg -> ', msg);
})