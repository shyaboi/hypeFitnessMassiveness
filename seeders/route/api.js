const router = require("express").Router();
const path = require("path");
const db = require("../models");
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).sort({ date: -1 })
        .then((data) => {
            // data.forEach(records => records.setTotalDuration())
            // console.log("b", data)
            //res.json(data.toJSON({ virtuals: true }))
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})
router.post("/api/workouts", ({ body }, res) => {
    console.log("INSIDE API ROUTE")
    db.Workout.create(body).then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})
router.put("/api/workouts/:id", (req, res) => {
    console.log("INSIDE put ROUTE", req.params.id, req.body)
        // db.Workout.create({}).then((data) => {
        //         res.json(data)
        //     })
        //     .catch(err => {
        //         res.json(err)
        //     })
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true, runValidators: true }).then((data) => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
router.get("/api/workouts/range", (req, res) => {

    db.Workout.find().sort({ day: -1 }).limit(7)
        .then((data) => {
            data.reverse();
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})
module.exports = router;