const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validatorProfileInput = require('../../routes/validation/profile');
const validatorExperienceInput = require('../../routes/validation/experience');
const validatorEducationInput = require('../../routes/validation/education');
//load model
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { session } = require('passport');

router.get('/test', (req, res) => res.json({ msg: 'Profiles Works'}));


// @route GET api/profile
router.get('/', passport.authenticate('jwt', {session:false}), (req, res)=>{
    const errors = {};
    Profile.findOne({user: req.user.id}).populate('user',['name','avatar']).then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});

// @route GET api/profile
// for posta and update
router.post('/', passport.authenticate('jwt', {session:false}), (req, res)=>{
    
    const {errors, isValid} = validatorProfileInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    //collect fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile){
            //update
            Profile.findOneAndUpdate({user: req.user.id},{$set:profileFields},{new:true}).then(profile => res.json(profile));
        }else{
            //create
            Profile.findOne({handle: profileFields.handle}).then(profile=>{
                if(profile){
                    errors.handle = 'That handle already exists';
                    res.status(400).json(errors);
                }
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    })
});

router.get('/handle/:handle',(req,res)=>{
    const errors = {};
    Profile.findOne({handle:req.params.handle}).populate('user',['name','avatar']).then(profile=>{
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});

router.get('/user/:user_id',(req,res)=>{
    const errors = {};
    Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']).then(profile=>{
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});

router.get('/all',(req,res)=>{
    const errors = {};
    Profile.find().populate('user',['name','avatar']).then(profiles=>{
        if(!profiles){
            errors.noprofile = 'There is no profiles';
            res.status(404).json(errors);
        }
        res.json(profiles);
    }).catch(err => res.status(404).json({profile: 'There is no profile'}));
});

router.post('/experience', passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validatorExperienceInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Profile.findOne({user:req.user.id}).then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description:req.body.description
        }
        //add to experience array
        profile.expriance.unshift(newExp);
        profile.save().then(profile => res.json(profile));
    })
});

router.post('/education', passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validatorEducationInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Profile.findOne({user:req.user.id}).then(profile => {
        const newExp = {
            school: req.body.school,
            degree: req.body.degree,
            filedofstudy: req.body.filedofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description:req.body.description
        }
        //add to education array
        profile.education.unshift(newExp);
        profile.save().then(profile => res.json(profile));
    })
});

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        //Get remove index
        const removeIndex = profile.expriance.map(item=>item.id).indexOf(req.params.exp_id);
        // splice out of array
        profile.expriance.splice(removeIndex,1);
        profile.save().then(profile=>res.json(profile));
    }).catch(err=>res.status(404).json(err));
});

router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        //Get remove index
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        // splice out of array
        profile.education.splice(removeIndex,1);
        profile.save().then(profile=>res.json(profile));
    }).catch(err=>res.status(404).json(err));
});

//
router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndRemove({user:req.user.id}).then(()=>{
        User.findOneAndRemove({_id:req.user.id}).then(()=>{
            res.json({success:true});
        })
    })
});

module.exports = router;