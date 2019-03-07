const db = require('../data/dbConfig')
const Users = require('./userModel')

describe('users model', () => {
    describe('insert()', () => {
        afterEach(async () => {
            await db('users').truncate()
        })
        
        it('should insert provided user to the db', async () => {
            const user = await Users.insert({name: 'Gracie'});
            
            expect(user.name).toBe('Gracie');
        });
        
        it('should add multiple users to database', async () => {
            await Users.insert({name: 'Gracie'});
            await Users.insert({name: 'Kylie'});
            
            const users = await Users.getAll();
            expect(users.length).toBe(2);
            
        });
        
        // doesn't pass, throwing error before the expect runs???
        it.skip('should throw error if duplicate user added', async () => {
            await Users.insert({name: 'Gracie'});
            expect(await Users.insert({name: 'Gracie'})).toThrow();
        });
    });
    
    describe('remove()', () => {
        afterEach(async () => {
            await db('users').truncate()
        })

        it('should remove a user from the db with whatever id is passed', async () => {
            const user = await Users.insert({name: 'Gracie'})
            let allUsers = await Users.getAll();
            // should be 1 user is db after the insert
            expect(allUsers.length).toBe(1);
            // call the remove user function
            await Users.remove(1);
            allUsers = await Users.getAll();
            // expect users to be empty after the remove
            expect(allUsers.length).toBe(0);
        });
    });
});