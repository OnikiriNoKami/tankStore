const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models')
const Tokenizer = require('./jwtTokenController')
class UserController {
    async registration(req, res){
        const {email, password} = req.body
        if(!email || !password){
            return res.json({message:"Something wrong with data!"})
        } 

        const user_exist = await User.findOne({
            where: {
                email: email
            }
        })

        if(user_exist){
            return res.json({message: "Woah user already exist!"})
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({email, password:hashPassword})

        const basket = await Basket.create({userId: user.id})
        const token = Tokenizer.genToken(user.id, user.email)

        return res.json({token})

    }

    async login(req, res){
        const {email, password} = req.body
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(user === null){
            return res.json({message:"Woah! No user with this email!"})
        } 
        let passwordGood = bcrypt.compareSync(password, user.password)
        if(!passwordGood){
            return res.json({message:"Woah password problems!"})
        }

        const token = Tokenizer.genToken(user.id, user.email)
        return res.json({token})
    }

    async verifyToken(req, res){
        const token = Tokenizer.genToken(req.user.id, req.user.email)
        return res.json({token})
    }

}

module.exports = new UserController()