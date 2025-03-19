const fs = require('fs')

const fichier = 'fichier_texte.txt'

fs.readFile(fichier, 'utf8', (err, data) => {
    if(err) {
        console.error('Erreur de lecture du fichier :', err)
        return;
    }
    console.log('Contenu du fichier :\n', data)
})