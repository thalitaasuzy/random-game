class contactsDAO{
    //Operações CRUD
    //Read
    static async getUsers(client) {
        const cursor = await client
        .db("mydb")
        .collection("contacts")
        .find()
        .project()
        .sort()
        .limit(10)

        try {
            const results = cursor.toArray();
            return results
        } catch(err){
            console.log(err)
        }

    }

    //Create
    static async insertUser(client, doc) {
        const ok = await client 
            .insertOne(doc);
        try {
            return ok;
        } catch(err){
            console.log(err)
        }
    }

    //Delete
    static async deleteUserByNome(client, nome) {
        const ok = await client
            .deleteOne(nome);
        try{
            return ok;
        }catch(err){
            console.log(err)
        }
    }

    //Update
    static async updateTelefoneByEmail(client, olde, doc) {
        const docs = await client
            .updateOne(olde, tel);
        try{
            return docs;
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = contactsDAO;
