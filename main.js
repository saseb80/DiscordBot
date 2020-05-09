//Inicializacion del bot
const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();


//once es para ejecutarse una vez
bot.once('ready', ()=>{
    console.log('Ready!');
})

//on siempre escucha
bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
     
    const args = message.content.slice(prefix.length).split(/ +/);   //El + es para evitar que cuente espacios extras en el comando
    const command = args.shift().toLowerCase();
    
    //se usan `` para cuando se quiera agregar una variable seguido de ${variable} 
    if(message.content === `${prefix}info`){
        message.channel.send(`Nombre Servidor: ${message.guild.name}\nDueño: ${message.guild.owner} :]`);  //guild se refiere al server
    }  
    else if(message.content === `${prefix}server`){
        message.channel.send(`${message.guild.name}`);
    }
    else if(message.content === `${prefix}user`){
        message.channel.send(`User: ${message.author.username}\nID: ${message.author.id}`);
    }
    else if(command === 'kick'){
        const taggedUser = message.mentions.users.first();
        if (!message.mentions.users.size) { //esto es para evitar que 
            return message.reply('you need to tag a user in order to kick them!');
        }
        message.channel.send(`kick ${taggedUser}`);

    }
});

bot.login(token);