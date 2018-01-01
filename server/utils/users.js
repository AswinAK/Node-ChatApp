class Users{
    
    constructor(){
        console.log('constr called...');
        this.users =[{id:1, name:'Mike', room:'t1'},
        {id:2, name:'Doyle', room:'t1'},
        {id:3, name:'John', room:'t2'}]
    }

    addUser(id, name, room){
        var user = {id, name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=>user.id !== id);
        }
        return user;
    }

    getUser(id){
        if(!this.users)return undefined;
        return this.users.filter((user)=>user.id===id)[0]
    }

    getUserList(room){
        var users = this.users.filter((user)=>user.room===room);
        var userNames = users.map((user)=>user.name);
        return userNames;
    }
}


module.exports={Users}