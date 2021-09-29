function renameProp(object=null, oldName=null, newName=null){
    if(oldName&&newName&&object){
        if(object[oldName]){
            object[newName] = object[oldName]
            delete object[oldName]
            return true
        }
    } else {
        console.log('Missing rename props')
        return false
    }
}

module.exports = { renameProp };