const knex = require("../database/knex");
const fs = require('fs');

function reviewRepository(){
    return knex('reviews')
}

function readReview(payload){
    return {
        recipe_id: payload.recipe_id,
        user_id: payload.user_id,
        rate: payload.rate,
        comment: payload.comment,
        review_create_at: payload.review_create_at || new Date(),
    }
}

async function addReview(payload){
    const review = readReview(payload);
    const [ review_id ] = await reviewRepository().insert(review);
    return { review_id, ...review };
}

async function getReviewsByFilter(recipe_id){
    const reviews = await reviewRepository().
        join('users', 'reviews.user_id', '=', 'users.user_id')
            .where('recipe_id', recipe_id)
            .select('*');

    return reviews;
}

async function getReviewByID(id) {
    return reviewRepository().join('users', 'review.user_id', '=', 'users.user_id')
    .where('review_id', id).select('*').first()
    
}

async function updateReview(id, payload) {
    const updatedReview = await reviewRepository().where('review_id', id)
                            .select('*').first();
    if (!updatedReview) {
        return null;
    }
    const update = readReview(payload);
    await reviewRepository().where('review_id', id).update(update)
    return { ...updatedReview, ...update}
}

async function deleteReview(id){
    const deleted = await reviewRepository()
                        .where('review_id', id)
                        .first();
    if (!deleted){
        return null;
    }
    await reviewRepository().where('review_id', id).del();
    return deleted;
}

module.exports = {
    addReview,
    getReviewsByFilter,
    getReviewByID,
    updateReview,
    deleteReview,
}