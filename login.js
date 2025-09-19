export default function handler(req, res) {
    if(req.method === 'POST') {
        const { username, password } = req.body;
        if(!username) return res.status(400).json({ error: 'Nome obrigatório' });

        let isMod = false;
        if(password === '8689') isMod = true;

        // adiciona usuário se não existir
        if(!users.find(u => u.username === username)) users.push({ username, isMod });

        // se for moderador, adiciona em todos grupos como admin
        if(isMod){
            groups.forEach(g => {
                if(!g.admins.includes(username)) g.admins.push(username);
            });
        }

        res.status(200).json({ username, isMod, groups: groups.map(g => ({ id: g.id, name: g.name, link: g.link })) });
    } else if(req.method === 'GET') {
        res.status(200).json({ users });
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
