const handleRegister = (req, res, db, bcrypt)=>{
    const { email, name, password } = req.body;
    if(!email||!name||!password){
        return (res.status(400).json('incorrect format'));
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(resp => {
            return trx('users')
                .returning('*')
                .insert({
                    email: resp[0].email,
                    name: name,
                    joined: new Date()
                }).then(user => {
                    res.json(user[0]);
                })
            // res.json(resp);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Registration not possible at the moment. Try again later.'));
}

export default handleRegister;