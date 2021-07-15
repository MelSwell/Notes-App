const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNote = notes.find(note => note.title === title)

  debugger

  if (!duplicateNote) {
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

const removeNote = (title) => {
  const notes = loadNotes()

  const notesToKeep = notes.filter(note => note.title !== title)

  if (notesToKeep.length === notes.length) {
    console.log(chalk.black.bgRed('Note not found.'))
  } else {
    saveNotes(notesToKeep)
    console.log(chalk.black.bgGreen("Note removed"))
  }
}

const listNotes = () => {
  console.log(chalk.bgMagenta.black("Your notes:"))

  const notes = loadNotes()

  notes.forEach(note => {
    console.log(note.title)
  });
}

const readNote = (title) => {
  notes = loadNotes()

  const targetNote = notes.find(note => note.title === title)
  
  if (targetNote){
    console.log(chalk.bgMagenta.black(targetNote.title + ":"))
    console.log(targetNote.body)
  } else {
    console.log(chalk.bgRed.black("Note not found"))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}