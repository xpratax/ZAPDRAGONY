let users = [];
let groups = [
    { id: 1, name: "DRAGONY", link: "https://chat.whatsapp.com/ExA8fGBX9Dd49erUeYLXDv" },
    { id: 2, name: "Tech", link: "https://chat.whatsapp.com/example2" },
    { id: 3, name: "Gaming", link: "https://chat.whatsapp.com/example3" }
];

export default function handler(req, res){
    if(req.method === 'POST'){
        const { username, password } = req.body;
        if(!username) return res.status(400).json({ error: 'Nome obrigatório' });

        let isMod = false;
        if(password === '8689') isMod = true;

        if(!users.find(u => u.username === username)) users.push({ username, isMod });

        res.status(200).json({ username, isMod, groups });
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
