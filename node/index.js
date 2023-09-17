const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req,res) => {
    const sql = `INSERT INTO people(name) values('Marcelo')`;
    connection.query(sql);
    const query = "SELECT * FROM people";
    connection.query(query,function(error,data){
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            return res.status(500).send('Erro ao buscar dados no banco de dados.');
        }
        let html = '<h1>Full Cycle</h1>';
        html += '<ul>';
        for (const row of data) {
            html += `<li>ID: ${row.id}, Nome: ${row.name}</li>`;
        }
        html += '</ul>';
        //connection.end();
        res.send(html);
    });
    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})