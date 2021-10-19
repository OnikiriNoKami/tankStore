const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    token: {type: DataTypes.STRING(1000)}
})

const Role = sequelize.define('role',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING(1000)}
})

const UserRole = sequelize.define('user_role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
})

const BasketTank = sequelize.define('basket_tank', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Tank = sequelize.define('tank', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING(1000), allowNull: false},
    price_silver: {type: DataTypes.INTEGER, allowNull: false},
    price_exp: {type: DataTypes.INTEGER, allowNull: false},

})

const Nation = sequelize.define('nation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const TankType = sequelize.define('tank_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    title_short: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false}
})

const MainImage = sequelize.define('mainImage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title : {type: DataTypes.STRING, allowNull: false},
})

const Storage = sequelize.define('storage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER, allowNull: false}
})

const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true,allowNull: false}
})

const Module = sequelize.define('module', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(1000), allowNull: false},
    price_silver: {type: DataTypes.INTEGER, allowNull: false},
    price_exp: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    order_index: {type: DataTypes.INTEGER, allowNull: false}
})

const ModuleType =sequelize.define('module_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const NationTankType = sequelize.define('nation_tank_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketTank)
BasketTank.belongsTo(Basket)

Tank.hasMany(BasketTank)
BasketTank.belongsTo(Tank)

Nation.hasMany(Tank)
Tank.belongsTo(Nation)

TankType.hasMany(Tank)
Tank.belongsTo(TankType)

Nation.belongsToMany(TankType, {through: NationTankType})
TankType.belongsToMany(Nation, {through: NationTankType})

Status.hasMany(Tank)
Tank.belongsTo(Status)

Tank.hasMany(Image)
Image.belongsTo(Tank)

Tank.hasOne(MainImage)
MainImage.belongsTo(Tank)

Tank.hasOne(Storage)
Storage.belongsTo(Tank)

Tank.hasMany(Module)
Module.belongsTo(Tank)

ModuleType.hasMany(Module)
Module.belongsTo(ModuleType)

module.exports = {
    User, 
    Role,
    Basket,
    Tank, 
    Nation,
    TankType,
    Status,
    Image,
    Module,
    ModuleType,
    NationTankType,
    UserRole,
    BasketTank,
    Storage,
    MainImage,
}





