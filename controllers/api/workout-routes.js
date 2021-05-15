const router = require('express').Router();
const { Workout } = require('../../models');

// Create workout routine
router.post('/workouts', async (req, data) => {
    try {
        const workoutData = await Workout.create({});
        data.status(200).json(workoutData);
    } catch (err) {
        data.status(500).json(err);
    }
});

// update workout with specific id
router.put('workouts/:id', async (req, data) => {
    try {
        const workoutData = await Workout.findByIdAndUpdate(
            req.params.id, 
            { $push: { exercises: req.body }},
            { new: true }
        );
        data.status(200).json(workoutData);
    } catch (err) {
        data.status(500).json(err);
    }
});

router.get('/workouts', async (req, data) => {
    try {
        const workoutData = await Workout.aggregate([
            {
                $addFields: {
                    $totalDuration: {
                        $sum: '$exercise.duration',
                    },
                },
            },
        ])
        data.status(200).json(workoutData);
    } catch (err) {
        data.status(500).json(err);
    }
});

// get workout by range
router.get('/workouts/range', async (req, data) => {
    try {
        const workoutData = await Workout.aggregate([
            {
                $addFields: {
                    $totalDuration: {
                        $sum: 'exercises.duration',
                    },
                },
            },
        ])
        .sort({_id: -1}).limit(7);
        data.status(200).json(workoutData);
    } catch (err) {
        data.status(500).json(500);
    }
});

// delete workout by ID
router.delete('/workouts', async (req, data) => {
    try {
        const workoutData = await Workout.findByIdAndDelete(req.body);
        data.status(200).json(true);
    } catch (err) {
        data.status(500).json(err)
    }
});

module.exports = router;