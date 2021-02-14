function User(name, age)
{
    this.name = name;
    this.age = age;

    this.displayInfo = function(){  
        console.log(`Имя: ${this.name}  Возраст: ${this.age}`); 
    }
}

User.prototype.sayHi = function() { console.log(`Привет, меня зовут ${this.name} и мой возраст ${this.age}`); };
module.exports = User;