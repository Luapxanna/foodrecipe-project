const { profile } = require("console");
const knex = require("../database/knex");
const fs = require('fs');
const { get } = require("http");

function accountRepository(){
    return knex('users')
}

function favoriteRepository(){
    return knex('favorite')
}

function readAccount(payload){
    return{
        user_name: payload.user_name,
        user_email: payload.user_email,
        password_hash: payload.password_hash,
        profile_pic: payload.profile_pic,
        user_birthdate: payload.user_birthdate
    }
}

async function CreateUser(payload){
    const user = readAccount(payload)
    const [id] = await accountRepository().insert(user);
    return { id, ...user }
}


async function getUserbyId(id){
    return await accountRepository().where('user_id', id).select('*').first();
}


async function updateAccount(user_id, payload){
    const account = await accountRepository().where('user_id', user_id).select('*').first();
    if (!account){
        return null;
    }
    const update = readAccount(payload)
    if (!update.profile_pic){
        delete update.profile_pic;
    }
    const updatedAccount = await accountRepository().where('user_id', user_id).update(update);
    if (update.profile_pic && updatedAccount.profile_pic &&
        update.profile_pic !== updatedAccount.profile_pic &&
        updatedAccount.profile_pic.startsWith('public/uploads')
    ){
        fs.unlink(`.${updatedAccount.profile_pic}`, (err) => {})
    }
    return { ...updatedAccount, ...update, user_id }

}

async function getFavorite(user_id) {
    const results = await favoriteRepository().join('recipes', 'favorite.recipe_id', 'recipes.recipe_id')
                                .where('favorite.user_id', user_id)
                                .select('*');
    return {
        recipes : results,
    }
}
async function getUserbyEmail(email){
    return await accountRepository().where('user_email', email).select('*').first();
}

module.exports = {
    CreateUser,
    getUserbyId,
    updateAccount,
    getUserbyEmail,
    getFavorite
}