// routes/banner.routes.js
const express = require('express');
let route= express.Router();
const ratingAndReview = require('../controller/ratingAndReview');

route.post('/ratingAndReview',ratingAndReview.createRatingAndReview);
route.get('/ratingAndReview',ratingAndReview.getRatingAndReviews);
route.delete('/ratingAndReview/:_id',ratingAndReview.deleteRatingAndReview);
route.put('/ratingAndReview/:_id',ratingAndReview.updateRatingAndReview);
route.get('/ratingAndReview/:_id',ratingAndReview.getRatingAndReviewById);

module.exports = route;
