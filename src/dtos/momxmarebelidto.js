model.exports = class UserDto{
    email;
    id;
    asActivated;

    constructor (model){
        this.email = model.email;
        this.id = model._id;
        this.asActivated = model.asActivated;
    }

}