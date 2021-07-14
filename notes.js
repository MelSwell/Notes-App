const fs = require('fs')
const chalk = require('chalk')

function getNotes(){
  return "Your notes..."
}

function addNote(title, body) {
  const notes = loadNotes()

  const duplicateNotes = notes.filter(note => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.black.bgGreen('Note added'))
  } else {
    console.log(chalk.black.bgRed('Note title already taken.'))
  }
  
}

function removeNote(title) {
  const notes = loadNotes()

  const notesToKeep = notes.filter(note => note.title !== title)

  if (notesToKeep.length === notes.length) {
    console.log(chalk.black.bgRed('Note not found.'))
  } else {
    saveNotes(notesToKeep)
    console.log(chalk.black.bgGreen("Note removed"))
  }
}

function listNotes() {
  const notes = loadNotes()

  const noteTitles = notes.map(note => note.title)

  console.log(noteTitles.join("\n"))
}

function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
}