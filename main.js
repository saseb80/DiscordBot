//Inicializacion del bot
const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();


//once es para ejecutarse una vez
bot.once('ready', ()=>{
    console.log('Ready!');
})


bot.on('message', message=>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong.');
	} else if (command === 'beep') {
		message.channel.send('Boop.');
	}
});

//#region AQUI SE HICIERON PRUEBAS DE COMANDOS SIGUIENDO LA GUIA DE DISCORD
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

    else if (command === 'avatar') {
        
        if (!message.mentions.users.size) {
            return message.reply('You need to tag an user to get their avatar.png');
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user}'s avatar: \n <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });

        message.channel.send(avatarList);
    }
    else if (command === 'prune') {
        const amount = parseInt(args[0]);
    
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        }
        else if(amount < 1 || amount > 50){
            return message.reply('NO!');
        }
        
        message.channel.bulkDelete(amount,true);
        //message.reply(`deleted ${amount} messages`);
    }
    

});
//#endregion

bot.login(token);