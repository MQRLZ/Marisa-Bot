var Discord = require("discord.js"); 
var Twitter = require('twitter');
var mysql = require("mysql");
var search = require('youtube-search');
const TOKEN = process.env.TOKEN;
const PREFIX = "?";

var tryarg = 2;
var tryargdo = true;
var usuario1 = [
	"Mega",
	"Super",
	"The",
	"Argentino",
	"Lolicon",
	"Rule34",
	"Leeroy",
	"null",
	"Nisman",
	"Donald",
	"Blood",
	"Dramatic"
]
var usuario2 = [
	"Manolo",
	"Marisa",
	"Gamer",
	"Groso",
	"Viewer",
	"Jenkins",
	"Donor",
	"Creator",
	"Builder",
	"Youtuber",
	"Killer"
]
var usuario3 = [
	"123",
	"777",
	"666",
	"AB",
	"34",
	"3,14",
	"091",
	"OneTwoThree",
	"444"
]

function doRandomHex() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

function generateXp() {
    let min = 20;
    let max = 30;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateuser() {
	return usuario1[Math.floor(Math.random() * usuario1.length)] + usuario2[Math.floor(Math.random() * usuario2.length)] + usuario3[Math.floor(Math.random() * usuario3.length)]
}

const opts = {
	maxResults: 1,
	key: bottokens.key
};

var tclient = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

var con = mysql.createConnection({
host: process.env.host,
user: process.env.user,
password: process.env.password,
database: process.env.database
});

var timenumbers = [
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
];

var actividades = [
	"?help | Un bot ordinario.",
	"?help | Un bot ordinario que sabe usar el sistema decimal.",
	"?help | Un bot ordinario que programa bots ordinarios.",
	"?help | Un bot ordinario que descansa las 24 horas.",
	"?help | Un bot ordinario que roba las ganancias del Templo Hakurei.",
	"?help | Un bot ordinario que escucha canciones de Love Live.",
	"?help | Un bot ordinario que hace las cosas bien.",
];

var hola = [
	"Bonito día.",
	"¡Recuerda que las mandarinas son saludables!",
	"¡Gracias por estar aquí conmigo!",
	"Somebody once told me the world is gonna roll me!",
	"¡Recuerda cuidarte mucho!",
	"¡Felíz navidad! ...¿no es navidad todavía? Vale, felíz Halloween.",
	"¡El futuro es hoy!",
	"Si tienes alguna duda, llama al 140.15. Está en la parte de atrás de la caja del juego.",
	"Recuerda conectar el segundo control para vencer a Psycho Mantis.",
	"¡Allévoy!",
	"¡Su fiesta le espera arriba, señor Cloud!",
	"¿Puedes recordarme cuál era el efecto de Jarra De La Avaricia?",
];

var horoscopo = [
    "Altas probabilidades de usar un continue.",
    "Veo algo... Veo... Creo que son... Efectivamente, son curvirayos.",
    "Un jefe con una barra de vida gigante.",
    "Bajas probabilidades de ganar sin perder una vida.",
    "Rayos láser que aparecen detrás tuyo.",
    "Veo muchas probabilidades de perder en el modo fácil.",
    "Literalmente no puedo ver nada. No sé si estás muerto o que, pero tu signo no me dice nada.",
    "No podrás ganar una sola run de algún Touhou sin usarme a mí.",
    "Altísimas probabilidades de perder contra tu mejor amigo en Hisoutensoku.",
    "Bajas probabilidades de que funcione algún Touhou en Windows 10.",
    "Altas probabilidades de [COMPRA EL DLC IMAGINACIÓN PARA PODER VER TU FUTURO]",
    "Al morir no tendrás más elección que irte al infierno.",
    "Es una buena época para conseguir parej- ¿Qué estoy diciendo? El amor no es real y lo sabes, así que deja de justificar tu falta de una novia conmigo.",
    "Tardarás 1 año en completar un Touhou en Lunatic.",
    "Bajas probabilidades de ganarle a alguien en Phantasmagoria of Flower View",
    "Hay una posibilidad de que olvides que el botón Shift existe, y por lo tanto no sabrás como ir más lento.",
    "En este mes algo impresionante pasará, y no es que Mima vuelve a Touhou, por si te lo preguntabas.",
    "Veo bajas probabilidades de que MQRLZ consiga terminar este bot ;)",
    "En esta semana harás por lo menos 5 chistes de pad-**knifed**. Acabo de hacer el primero por ti <3",
    "Recibirás pocas donaciones hoy... Espera, eso era para Reimu.",
    "THE WORLD.",
    "Muchas probabilidades de gritar como un enfermo: ZA WARUDO!",
	];
	
var quotes = [
	'**Reimu:** "¿Entrenar? Eso está bien, pero es hora de tomarse una larga siesta.',
	'**Reimu:** "Uhhh... ¿Tenemos que pelear? Porque preferiría no hacerlo."',
	'**Reimu:** "¡Lo hice! ...¿uh? Uh-oh... dejó de moverse. Oh bueno, tendré que enterrarla entonces.',
	'**Mima:** "Vas a morir."',
	'**Marisa:** "Oh, ¿yo? Vamos a ver, soy Reimu Hakurei. Sacerdotisa."',
	'**Marisa:** "(¿Quizás debería haber dicho enfermera?)"',
	'**Cirno:** "Cuando te pierdes, puedes echarle la culpa a las hadas."',
	'**Sakuya:** "Tengo que hacerte gastar por lo menos una bomba antes de que mi señora se enoje conmigo."',
	'**Flandre:** "He estado en este sótano por alrededor de 495 años." / **Marisa:** "Eso está bien, yo solo tengo los fines de semana para descansar."',
	'**Marisa:** "Está bien, está bien, me rindo. Tienes razón. La noche sin fin, robarse la luna llena, esconderse en la aldea, y poner sombreros en estatuas de piedra, es todo culpa de Alice. Ahora, perra, ¡sal de mi camino!',
	'**Marisa:** "¡Muevete y disparo! Me equivoqué, quise decir, dispara y me moveré. En un parpadeo."',
	'**Aya:** "Extra~ Extra~ No pasó nada importante, ¡pero sigue siendo un extra!"',
	'**Sanae:** "Oh, ¡así que esto es cazar youkais! ... ... Esto es divertido."',
	'**Reimu:** "¡No voy a dejar que te escapes! ¡Te perseguiré hasta llegar al infierno!" / **Yuka:** "¡No vengo del infierno!" / **Reimu:** "D-de todos modos, ¡no voy a dejar que te escapes!"',
	'**Meiling:** "Soy solo una persona normal que vigila."',
	'**Marisa:** "Desafortunadamente para ti, soy muy buena esquivando."',
	'**Rumia (Con los brazos extendidos):** "Esto, ¿no te parece que dice algo como "El santo fue crucificado en la cruz"?" / **Marisa:** "Pues a mi me suena a "La humanidad empezó a usar el sistema decimal."',
	'**Marisa:** "¿Una moneda? No puedes comprar una vida con eso." / **Flandre:** "¡Me refiero a que no puedes usar un continue!"',
	'**Yuyuko:** "Estar en este lugar es igual a estar muerto."',
	'**Cirno:** "Cuando congelo a una rana se duerme y no despierta. Es divertido."',
	'**Cirno:** "Sí, soy la mejor."',
	'**Sanae:** "Esto es el templo Moriya, un templo olvidado del pasado. Fue trasladado a Gensokyo junto con el lago que ves aquí." / **Reimu:** "¿*Movieron* el templo y el lago entero? Eso es bizarro."',
	'**Hina:** "Solo estaba intentando ser amable y perseguirte." / **Reimu:** "Perseguirme no es tan amable..."',
	'**Alice:** "Ha pasado mucho tiempo..." / **Reimu:** "¿Te conozco de algún lado?" / **Alice:** "¡He venido hasta aquí solo para poder pelear contra ti!" / **Reimu:** "Aprecio el esfuerzo."',
	'**Rumia:** "¿Eres el tipo de persona que puedo comer?"',
	'**Sakuya:** "Por favor, vuelva dos horas antes."',
	'**Sakuya:** "Tu tiempo es mío..."',
	'**Patchouli:** "Los libros de aquí valen todas las donaciones que tu templo ha recibido durante 5 años." / **Reimu:** "Mi templo raramente tiene alguna visita durante el año." / **Patchouli:** "Oh. Entonces no valen mucho."',
	'**Marisa (después de vencer a las hermanas Prismriver):** "¿Me van a decir cómo se abre este portón?" / **Prismrivers:** "No lo abrimos, solo volamos por encima." / **Marisa:** "Oh."',
	'**Youmu:** "Oof, el olor a muerte es fuerte en ti."',
];

var fortunes = [
    "Estoy segura de que sí.",
    "Segurísimo que no.",
    "Hmmm... a lo mejor, ze.",
    "Eh... Creo que no.",
    "Eso está más allá de mis capacidades, ze.",
];

const trivia1 = new Discord.RichEmbed()
	trivia1.setTitle("¿Cual es el jefe del Stage 3 de Perfect Cherry Blossom?");
	trivia1.setColor(doRandomHex());
	trivia1.setFooter("Marisa-Bot");
	trivia1.addField("Opción 1:","Youmu");
	trivia1.addField("Opción 2:","Las Hermanas Prismriver");
	trivia1.addField("Opción 3:","Alice");
	trivia1.addField("Opción 4:","Cirno");
	const trivia1ans = "3"

const trivia2 = new Discord.RichEmbed();
	trivia2.setTitle("¿Cuál es la waifu de Finicaltub?");
	trivia2.setColor(doRandomHex());
	trivia2.setFooter("Marisa-Bot");
	trivia2.addField("Opción 1:","Yuyuko");
	trivia2.addField("Opción 2:","Marisa");
	trivia2.addField("Opción 3:","Utsuho");
	trivia2.addField("Opción 4:","Cirno");
	const trivia2ans = "1"
	
const trivia3 = new Discord.RichEmbed()
	trivia3.setTitle("Completa el nombre: M--i--l -ea-n");
	trivia3.setColor(doRandomHex());
	trivia3.setFooter("Marisa-Bot");
	trivia3.addField("Opción 1:","-se-fi- s--x-");
	trivia3.addField("Opción 2:","-ar-be- H--r-");
	trivia3.addField("Opción 3:","-eb-re- L--r-");
	trivia3.addField("Opción 4:","-or-ya- P--l-");
	const trivia3ans= "2"

	const trivia4 = new Discord.RichEmbed()
	trivia4.setTitle("¿Qué SpellCard de Cirno es fácil de evitar si juegas Touhou 6 en el modo fácil?");
	trivia4.setColor(doRandomHex());
	trivia4.setFooter("Marisa-Bot");
	trivia4.addField("Opción 1:","Icicle Fall");
	trivia4.addField("Opción 2:","Perfect Freeze");
	trivia4.addField("Opción 3:","The World");
	trivia4.addField("Opción 4:","Hailstorm");
	const trivia4ans= "1"

	const trivia5 = new Discord.RichEmbed()
	trivia5.setTitle("¿Cuál de estos personajes NO es jugable en Touhou 9?");
	trivia5.setColor(doRandomHex());
	trivia5.setFooter("Marisa-Bot");
	trivia5.addField("Opción 1:","Sakuya Izayoi");
	trivia5.addField("Opción 2:","Alice Margatroid");
	trivia5.addField("Opción 3:","Shikieiki Yamaxanadu");
	trivia5.addField("Opción 4:","Reisen Udongein Inaba");
	const trivia5ans= "2"

	const trivia6 = new Discord.RichEmbed()
	trivia6.setTitle("Marisa Kirisame aparece en todos los juegos de Touhou Project.");
	trivia6.setColor(doRandomHex());
	trivia6.setFooter("Marisa-Bot");
	trivia6.addField("Opción 1:","Falso");
	trivia6.addField("Opción 2:","Verdadero");
	const trivia6ans= "1"

	const trivia7 = new Discord.RichEmbed()
	trivia7.setTitle("¿Cuál de los siguientes NO es una entrega oficial de Touhou Project?");
	trivia7.setColor(doRandomHex());
	trivia7.setFooter("Marisa-Bot");
	trivia7.addField("Opción 1:","Touhou 12.5");
	trivia7.addField("Opción 2:","Touhou 13.5");
	trivia7.addField("Opción 3:","Touhou 12");
	trivia7.addField("Opción 4:","Touhou 10.3");
	const trivia7ans= "4"

	const trivia8 = new Discord.RichEmbed()
	trivia8.setTitle("Rumia aparece solo en Touhou 6.");
	trivia8.setColor(doRandomHex());
	trivia8.setFooter("Marisa-Bot");
	trivia8.addField("Opción 1:","Verdadero");
	trivia8.addField("Opción 2:","Falso");
	const trivia8ans= "2"

	const trivia9 = new Discord.RichEmbed()
	trivia9.setTitle("¿Cuál de estos personajes se considera (hasta la fecha) que es el más fuerte de todo Gensokyo?");
	trivia9.setColor(doRandomHex());
	trivia9.setFooter("Marisa-Bot");
	trivia9.addField("Opción 1:","Hecatia Lapislazuli");
	trivia9.addField("Opción 2:","Reimu Hakurei");
	trivia9.addField("Opción 3:","Byakuren Hijiri");
	trivia9.addField("Opción 4:","Cirno");
	const trivia9ans= "1"

	const trivia10 = new Discord.RichEmbed()
	trivia10.setTitle("Completa el nombre: L--t- -hi-e-o--");
	trivia10.setColor(doRandomHex());
	trivia10.setFooter("Marisa-Bot");
	trivia10.addField("Opción 1:","-ci-nn a--n-a-zi");
	trivia10.addField("Opción 2:","-M-ri b--e-l-He");
	trivia10.addField("Opción 3:","-et-y W--t-r-ck");
	trivia10.addField("Opción 4:","-se-fi- s--x-");
	const trivia10ans= "3"

	const trivia11 = new Discord.RichEmbed()
	trivia11.setTitle("En Touhou 2: Story Of Eastern Wonderland, Reimu aprende los verdaderos poderes del Ying Yang Orb. ¿Cuál de los siguientes es uno de esos poderes?");
	trivia11.setColor(doRandomHex());
	trivia11.setFooter("Marisa-Bot");
	trivia11.addField("Opción 1:","Convertirse en un gato.");
	trivia11.addField("Opción 2:","Tener el harem entero de Touhou a tu disposición.");
	trivia11.addField("Opción 3:","Cambiar tu complexión cuando quieras.");
	trivia11.addField("Opción 4:","Convertirse en el ser más poderoso de Gensokyo.");
	const trivia11ans= "1"

	const trivia12 = new Discord.RichEmbed()
	trivia12.setTitle("¿Cuando sucedió la caída de las torres gemelas?");
	trivia12.setColor(doRandomHex());
	trivia12.setFooter("Marisa-Bot");
	trivia12.addField("Opción 1:","Mañana");
	trivia12.addField("Opción 2:","11/9/2001");
	trivia12.addField("Opción 3:","Ayer");
	trivia12.addField("Opción 4:","11/9/87");
	const trivia12ans= "2"

	const trivia13 = new Discord.RichEmbed()
	trivia13.setTitle("La humanidad empezó a usar...");
	trivia13.setColor(doRandomHex());
	trivia13.setFooter("Marisa-Bot");
	trivia13.addField("Opción 1:","El sistema decimal.");
	trivia13.addField("Opción 2:","Páginas rule34.");
	trivia13.addField("Opción 3:","La tecla Shift para ir más lento.");
	trivia13.addField("Opción 4:","Referencias a jojos.");
	const trivia13ans= "1"

var trivias = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13"
]

var correct = false
var already = false

var bot = new Discord.Client();
  
  bot.on("error", (e) => console.error(e));
  bot.on("warn", (e) => console.warn(e));
  bot.on("debug", (e) => console.info(e));

bot.on("ready", function() {
	console.log("----------MarisaBot iniciada correctamente, ze!----------");
  bot.user.setActivity(actividades[Math.floor(Math.random() * actividades.length)])
  console.log(`[Bot activity changed] ${bot.user.presence.game.name}`);  
});

var interval = setInterval (function () {
    bot.user.setActivity(actividades[Math.floor(Math.random() * actividades.length)])
    console.log(`[Bot activity changed] ${bot.user.presence.game.name}`)
}, 900000); 

con.connect(err => {
	if(err) throw err;
	console.log("[Database Bot] ¡Conectada a la database, ze!")
});

bot.on("message", function(message) {

  	if (message.author.equals(bot.user)) return;

	con.query(`SELECT * FROM levels WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;

		if (message.author.bot == true) 
		return;

		let sql;
		let lvl = 0
		let necessary = 400
		if(rows.length < 1) {
			sql = `INSERT INTO levels (id, xp, lvl, necessary) VALUES ('${message.author.id}', ${generateXp()}, ${lvl}, ${necessary})`} 
		else {
			let lvl = rows[0].lvl
			let lvl1 = lvl + 1
			let xp = rows[0].xp
			let necessary = rows[0].necessary
            sql = `UPDATE levels SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
			if(xp > necessary) {
				let xp = rows[0].xp
				let lvl = rows[0].lvl
				let lvl1 = lvl + 1
				let necessary = rows[0].necessary
				sql= `UPDATE levels SET lvl = ${lvl + 1}, necessary = ${necessary*2} WHERE id = '${message.author.id}'`;
				var levelup = new Discord.RichEmbed()
				levelup.setTitle("¡Subiste de nivel, ze!");
				levelup.setColor(doRandomHex());
				levelup.setThumbnail(message.author.avatarURL);
				levelup.setDescription("¡" + message.author + " llegó al nivel " + lvl1 + "!");
				levelup.addField("EXP actual:", xp + " EXP", true);
				levelup.addField(`EXP requerida para el nivel ${lvl1 + 1}:`, `${necessary*2} EXP`, true);
				message.channel.send(levelup);
			}
		}

		con.query(sql);
	});
	
	if (message == "?") {
		return
	}

	if (message == "?help") {
		const help = new Discord.RichEmbed()
		help.setTitle("Comandos Disponibles Para Marisa-Bot");
		help.setColor(doRandomHex());
		help.setDescription("¡Bienvenido/a a la página de ayuda! Aquí se encuentran todos los comandos que puedes usar con Marisa-Bot.");
		help.setFooter("Marisa-Bot | CDPMB");
		help.addField("| Utilidades |", "?ping | Prueba si Marisa-Bot está funcionando. \n?help | Abre este menú. \n?invite | ¡Envia la invitación del bot para que la agregues a tu servidor! \n?youtube | Busca cualquier video en Youtube, ¡desde la comodidad de tu servidor! \n?avatar | Consigues la foto de perfil de cualquier usuario que especifiques. ¿Genial, no?");
		help.addField("| Para los admins |", "?votestart [Título] [Duración] [Pregunta] | Crea una encuesta para que la gente vote. (Solo preguntas de sí y no). \n?vote, ?votemod, ?voteadmin | Vota para una encuesta previamente creada. \n?role [ ] | Especifica un rol y consigues información sobre el mismo.");
		help.addField("| Solo por diversión |", "?tweet [ ] | ¡Twittea algo a la cuenta oficial de Marisa-Bot! \n?hola | Saludo + mensaje del día = happiness \n?generateuser | Genera un usuario personalizado solo para ti. \n?say [ ] | Al usar este comando, el bot repetirá lo que sea que hayas escrito. \n?rinosuke | Comprueba si Rinosuke está online o no. \n?quote | Te da una de 30 quotes/conversaciones relacionadas con Touhou. En español.");
		help.addField("| ¡Números! |", "?exp |Comprueba tu experiencia actual, tu nivel, y la experiencia necesaria para el siguiente nivel. \n?givecookie [ ] | ¡Dale una galleta a alguien! \n?cookies [ ] | Comprueba las galletas de un usuario. \n?eatcookie | ¡Nom!");
		help.addField("| Juegos |", "?horoscopo [ ] | Este comando predice tu horóscopo para el mes. \n?8ball [ ] | Predice tu futuro con preguntas de sí y no. \n?trivia | Te da una pregunta relevante a la serie de videojuegos Touhou Project para que la respondas");
	  message.author.send(help);
	  message.channel.send(message.author + ", ¡te envié una página de ayuda!");
	  return;
}

    if (!message.content.startsWith(PREFIX)) return;

	if (!message.guild) {
		return;
	}

	var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
        	message.channel.send("Ze! " + bot.ping + "ms de respuesta.");
			  break; 
			  
        case "8ball":
            if (args[1])  message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.send("Escribe algo!");
        break;    
	
        case "horoscopo":
        	if (args[1])  message.channel.send(horoscopo[Math.floor(Math.random() * horoscopo.length)]);
            else message.channel.send("Escribe algo!");
            break;

		case "avatar":
			let avatarget = message.mentions.users.first() || message.author;
			console.log("avatarget = " + avatarget);
			var avatar = new Discord.RichEmbed
			avatar.setTitle("¡Imagen encontrada!");
			avatar.setDescription("Oh, " + avatarget + ", qué avatar más bonito:");
			avatar.setColor(doRandomHex());
			avatar.setImage(avatarget.avatarURL);
			message.channel.send(avatar);
		break;

		case "invite":
		var invite = new Discord.RichEmbed 
		invite.setDescription("¡Hey! Puedes usar este [link](https://discordapp.com/oauth2/authorize?client_id=382383319762862081&scope=bot&permissions=10) para invitarme a algún servidor!");
		invite.setThumbnail("https://cdn.discordapp.com/attachments/439935470848311317/446098485687615508/bot_img.jpg");
		invite.setColor(doRandomHex());
		message.channel.send(invite);
		break;

		case "quote":
			message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]);		
		break;

		case "hola":
			message.channel.send(message.author + ", ¡hola! " + hola[Math.floor(Math.random() * hola.length)])
			break;		

		case "generateuser":
		message.channel.send("¡Este es tu nuevo nombre de usuario! " + generateuser());
	
		case "say":
			if (!args[1]) {
				message.channel.send("¡No puedo enviar un mensaje en blanco! :c");
				return
			}
			else
			message.delete();
			message.channel.send(args.slice(1).join(" "));
			break;

		case "rinosuke":
		
			let rino = message.guild.member("211328401556897792")
			if (!rino) {
				message.channel.send("Rinosuke no se encuentra en este servidor :c");
				return;
			}

			else

			if (rino.presence.status == 'online'){
			message.channel.send("Rinosuke está online. ¿Quién lo hubiese predicho?");
			}

			else
			message.channel.send("Rinosuke está offline. ¡Podría recitar todos los dígitos de pi antes de que ese usuario se conecte, ze!");
		break;

  			    
		case "youtube":
			
		let videos = args[1];
    	tryarg = 2;
        tryargdo = true;
        while(tryargdo==true) {
            if(args[tryarg]) {
                videos = videos + " " + args[tryarg];
                tryarg = tryarg + 1;

            } else {
                tryargdo = false;

            }
        }
	
			search(videos, opts, function(err, results){
			if(err) return console.log(err);
			results.map(function (r) {message.channel.send(r.link)});
			}); 

			if (!args[1]) message.channel.send("No has escrito nada, así que te dejo el video más popular, ze-");
		return;
		
		break;

		case "role":
		if (!args[1]) {
			message.channel.send("Especifica un rol que quieres que encuentre, ze.");
			break;
		}
		let roleto = args[1];
        tryarg = 2;
        tryargdo = true;
        while(tryargdo==true) {
            if(args[tryarg]) {
                roleto = roleto + " " + args[tryarg];
                tryarg = tryarg + 1;

            } else {
                tryargdo = false;

            }
        }

		if (message.guild.roles.find("name", roleto)) {
		message.channel.send("¡Rol encontrado!");
		
		let role = message.guild.roles.find("name", roleto)
		const role2 = new Discord.RichEmbed ()
		role2.setTitle("Descripción del rol");
		role2.setDescription("Esto es todo lo que pude encontrar sobre ese rol, ze.");
		role2.setColor(role.color);
		role2.addField("Nombre del rol:", role.name, true);
		role2.addField("Color del rol:", role.color, true);
		role2.addField("Posición del rol:", role.position, true);
		role2.addField("Permisos del rol:", role.permissions, true);
		role2.addField("¿Es mencionable?", role.mentionable, true);
		role2.addField("ID del rol:", role.id, true);
		message.channel.send(role2);
		}
		else message.channel.send("Lo siento, pero no puedo encontrar ese rol. (¿Quizás no existe?)");
		
		break;
		
		case "tweet":

		if (message.author.bot == true) {
			message.channel.send(":robot: ¡Los bots no pueden enviar tweets!");
		return
		}

		if (!args[1]) {
			message.channel.send("¡No puedo twittear un mensaje en blanco!");
		return
		}

		tryargdo = true;
        while(tryargdo==true) {
            if(args[tryarg]) {
                megasupertweet = megasupertweet + " " + args[tryarg];
                tryarg = tryarg + 1;

            } else {
                tryargdo = false;
            }
		}
			message.channel.send("Intentando enviar el tweet...");
			tclient.post('statuses/update', {status: megasupertweet},  function(error, tweet, response) {
			if(error) {
				console.log(error)
				message.channel.send(":x: Se ha producido un error, quizás el tweet que quieres enviar está repetido o es muy largo.")
				return
			}
			else {
				message.channel.send("¡Yoink! ¡Mensaje twitteado correctamente! Puedes verlo en mi cuenta de Twitter: https://twitter.com/MarisaK_Bot")
			}
		  });
	
		break;
        
    	case "givecookie":
		  let giver = message.author
		  let cookietarget = message.mentions.users.first()
			    
		  if (!cookietarget) {
			message.channel.send("¡Menciona a alguien!");
			   return; }
			
		if (cookietarget.bot == true) {
		message.channel.send(":robot: ¡No puedes darle una galleta a un bot!");
		return; }
	
		if (cookietarget == message.author) {
		message.channel.send("¡No puedes darte una galleta a ti mismo!");
			return; }
		    else;
		  
		    con.query(`SELECT * FROM cookiecount WHERE id = '${cookietarget.id}'`, (err, rows) => {
			if(err) throw err;
	
			
		let cookies = 1
		if(rows.length < 1) {
			con.query(`INSERT INTO cookiecount (id, cookies) VALUES ('${cookietarget.id}', ${cookies})`) 
			message.channel.send(cookietarget + ", ¡" + giver + " te ha dado una galleta! :cookie:");
		}
		else {
			let cookies = rows[0].cookies
			con.query(`UPDATE cookiecount SET cookies = ${cookies + 1} WHERE id = '${cookietarget.id}'`);
			    
		message.channel.send(cookietarget + ", ¡" + giver + " te ha dado una galleta! :cookie:");
			     
			}});
		    
			break;

			case "cookies":
			let targetcookie = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
			
			con.query(`SELECT * FROM cookiecount WHERE id = '${targetcookie.id}'`, (err, rows) => {
				if(err) throw err;
				

			if (targetcookie.bot == true) {
			message.channel.send(":robot: ¡Ese usuario es un bot! Lo siento, pero los bots no pueden ganar niveles.");
			return;
		}

		if(!rows[0]) {message.channel.send("Este usuario no tiene galletas, ¡alguien que le de una! :D");
		return}

			else;
			
			let cookies = rows[0].cookies;

			if (cookies == 0) { 
			message.channel.send("Este usuario no tiene galletas, ¡alguien que le de una! :D");
			}

			else
			message.channel.send(targetcookie + ", ¡tienes " + cookies + " galleta/s! :cookie:");
			
			});
			
			break;
			
			case "eatcookie":
			
			con.query(`SELECT * FROM cookiecount WHERE id = '${message.author.id}'`, (err, rows) => {
			if(err) throw err;

			if (!rows[0]){ message.channel.send("¡No tienes galletas para comer!");
			return }

			else;
			
			let cookies = rows[0].cookies;

			if (cookies == 0) { message.channel.send("¡No tienes galletas para comer!");
			return;}

			else
				
			con.query(`UPDATE cookiecount SET cookies = ${cookies - 1} WHERE id = '${message.author.id}'`);
			message.channel.send("¡Comiste una galleta! :cookie:");
			
			
			});
			break;    
        
    case "exp":
			let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

			if (target.bot==true) {
			message.channel.send(":robot: ¡Ese usuario es un bot! Lo siento, pero los bots no pueden ganar niveles.");
			return;
		}
			else;

			con.query(`SELECT * FROM levels WHERE id = '${target.id}'`, (err, rows) => {
			if(err) throw err;
			
			if(!rows[0]) return message.channel.send("Este usuario no tiene experiencia.")
			
			let xp = rows[0].xp;
			let lvl = rows[0].lvl
			let lvl1 = lvl + 1
            let necessary = rows[0].necessary
			let reaming = necessary - xp
			 
			const experiencia = new Discord.RichEmbed()
			experiencia.setTitle("Tabla de experiencia");
			experiencia.setDescription("¡Esta es la experiencia de " + target + ", ze!");
			experiencia.setThumbnail(target.avatarURL);
			experiencia.setColor(doRandomHex());
			experiencia.addField("EXP actual:", xp + " EXP", true);
			experiencia.addField("Nivel:", lvl, true);
			experiencia.addField("Siguiente nivel:", `${xp}/${necessary} [${reaming}] EXP`, true);
			message.channel.send(experiencia);
			});
			break;

		case "resetexp":
			var mqrlz = 294913372586115074
		
			if(message.author.id == mqrlz) {
			con.query(`DELETE FROM levels`);
			message.channel.send("Todos los niveles fueron reiniciados.");
			return;
			} else {
			message.channel.send("Solo el creador del bot puede reiniciar los niveles, lo siento.");
			}		
		break;

		case "clearexp":
			var mqrlz = 294913372586115074 
		
			if(message.author.id == mqrlz) {
			let target2 = message.mentions.users.first() || message.author;
			con.query(`DELETE FROM levels WHERE id = '${target2.id}'`);
			message.channel.send("Se han eliminado los niveles del usuario indicado.");
			return;
		
			} else {
			message.channel.send("Solo el creador del bot puede reiniciar los niveles, lo siento.");
			}
		break;    

		case "trivia":
		var adoratri = trivias[Math.floor(Math.random() * trivias.length)]

		if(adoratri == "1") {
			var dodatri = trivia1
			var dodatrians = trivia1ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 1")
		};
		if(adoratri == "2") {
			var dodatri = trivia2
			var dodatrians = trivia2ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 2")
		};
		if(adoratri == "3") {
			var dodatri = trivia3
			var dodatrians = trivia3ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 3")
		};
		if(adoratri == "4") {
			var dodatri = trivia4
			var dodatrians = trivia4ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 4")
		};
		if(adoratri == "5") {
			var dodatri = trivia5
			var dodatrians = trivia5ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 5")
		};
		if(adoratri == "6") {
			var dodatri = trivia6
			var dodatrians = trivia6ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 6")
		};
		if(adoratri == "7") {
			var dodatri = trivia7
			var dodatrians = trivia7ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 7")
		};
		if(adoratri == "8") {
			var dodatri = trivia8
			var dodatrians = trivia8ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 8")
		};
		if(adoratri == "9") {
			var dodatri = trivia9
			var dodatrians = trivia9ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 9")
		};
		if(adoratri == "10") {
			var dodatri = trivia10
			var dodatrians = trivia10ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 10")
		};
		if(adoratri == "11") {
			var dodatri = trivia11
			var dodatrians = trivia11ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 11")
		};
		if(adoratri == "12") {
			var dodatri = trivia12
			var dodatrians = trivia12ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 12")
		};
		if(adoratri == "13") {
			var dodatri = trivia13
			var dodatrians = trivia13ans
			console.log("[Trivia Bot] DETECTED AS TRIVIA 13")
		};

		var timeexec = timenumbers[Math.floor(Math.random() * timenumbers.length)]
		if(timeexec == "10") {
		var totaltime = 10000
		var seetime = "10"
		};
		if(timeexec == "11") {
		var totaltime = 11000
		var seetime = "11"
		};
		if(timeexec == "12") {
		var totaltime = 12000
		var seetime = "12"
		};
		if(timeexec == "13") {
		var totaltime = 13000
		var seetime = "13"
		};
		if(timeexec == "14") {
		var totaltime = 14000
		var seetime = "14"
		};
		if(timeexec == "15") {
		var totaltime = 15000
		var seetime = "15"
		};
		if(timeexec == "16") {
		var totaltime = 16000
		var seetime = "16"
		};
		if(timeexec == "17") {
		var totaltime = 17000
		var seetime = "17"
		};
		if(timeexec == "18") {
		var totaltime = 18000
		var seetime = "18"
		};
		if(timeexec == "19") {
		var totaltime = 19000
		var seetime = "19"
		};
		if(timeexec == "20") {
		var totaltime = 20000
		var seetime = "20"
		};

		console.log("[Trivia Bot] ANSWER= " + dodatrians)
		message.channel.send(dodatri);
		var timed = false
		message.channel.send("¡Tienes " + seetime + " segundos para responder!");
		const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {time: totaltime} );
		collector.on('collect', message => {
            if (message.content == dodatrians) {
				timed = true
				console.log("[Trivia Bot] WELL DONE");
				message.channel.send("¡Bien hecho! Respuesta correcta.");
				collector.stop()
				return
            } else {
				timed = true
				console.log("[Trivia Bot] YOU FUCKED IT UP.");
				message.channel.send("**BEEP**, lo siento, la respuesta correcta era " + dodatrians + ".");
				collector.stop()
				return
            }
		})
		collector.on('end', (collected) => {
			if (timed == false) {
			console.log("[Trivia Bot] YOU FUCKED IT UP.");
			message.channel.send("**BEEP**, ¡El tiempo se acabó! La respuesta correcta era " + dodatrians + ".")}
			else {
			return}
		})
	
		return;

		break;
		
		case "votestart":  
 
		if(!args[1]) {
			message.channel.send("Error, el uso del comando es el siguiente: ?votestart [**Título**] [**Duración**] [**Pregunta**].");
			return;
		}
		if(!args[2]) {
			message.channel.send("Error, el uso del comando es el siguiente: ?votestart [**Título**] [**Duración**] [**Pregunta**].");
			return;
		}
		if(!args[3]) {
			message.channel.send("Error, el uso del comando es el siguiente: ?votestart [**Título**] [**Duración**] [**Pregunta**].");
			return;
		}
		already = true
		var poll = args[1]
		var duration = args[2] + "000"
		var durationpublic = args[2]
		novotes = 0
		yesvotes = 0
		modyesvotes = 0
		modnovotes = 0
		admyesvotes = 0
		admnovotes = 0
		var startedby = message.author
		let question = args[3]
        tryarg = 4;
        tryargdo = true;
        while(tryargdo==true) {
            if(args[tryarg]) {
                question = question + " " + args[tryarg];
                tryarg = tryarg + 1;

            } else {
                tryargdo = false;

            }
        }
		message.delete();
		pollid = Math.random();
		mr3 = Math.random()
		var pollemb = new Discord.RichEmbed ()
			pollemb.setTitle(question)
			pollemb.setDescription(poll)
			pollemb.setThumbnail(message.author.avatarURL);
			pollemb.addField("Duración:", durationpublic + " segundos.", true);
			pollemb.addField("Votación hecha por:", startedby, true);
			pollemb.setColor(doRandomHex());
			pollemb.setFooter("Marisa-Bot | ¡La votación empezó! Usa ?vote, ?voteadmin o ?votemod para votar.");
		message.channel.send(pollemb);
		message.channel.send("¿Sí o no? Empiecen a votar.");

		setTimeout(function(){
			var res = new Discord.RichEmbed ()
				res.setTitle("La votación ha terminado.")
				res.setThumbnail(message.author.avatarURL);
				res.setDescription(question)
				res.addField("Votos positivos:", yesvotes, true);
				res.addField("Votos negativos:", novotes, true);
				res.addField("Votos positivos (Admin)", admyesvotes, true);
				res.addField("Votos negativos (Admin)", admnovotes, true);
				res.addField("Votos positivos (Mod)", modyesvotes, true);
				res.addField("Votos negativos (Mod)", modnovotes, true);
				res.addField("Votación hecha por:", startedby, true);
				res.setColor(doRandomHex());
				res.addField("Duración:", durationpublic + " segundos.", true);
				res.setFooter("Marisa-Bot | La votación terminó.")
			message.channel.send(res);
			already = false;

		if (admnovotes == 2) {
			message.channel.send("Respuesta final: NO.");
		return}

		if (modnovotes == 5){
			message.channel.send("Respuesta final: NO.");
		return;}

		if (modyesvotes >= 3){
			message.channel.send("Respuesta final: SÍ.")
		}
		if (admyesvotes >= 1){
			message.channel.send("Respuesta final: SÍ.")
		return }

		}, duration);

		
		break;

		case "vote":
	
		if(!already) {
			message.channel.send("No hay una votación en progreso.")
			return;
			}
			if(already===false) {
			message.channel.send("No hay una votación en progreso.")
			return;
			}
			
			var autho = message.author

		if (autho.pollid) {
		
			if (autho.pollid === mr3) {
				message.channel.send("Ya votaste.")
				return;
			}
		}
		if(!args[1]) {
			message.channel.send("Por favor, vota si o no.");
			return;
		}
		if(args[1]==="no") {
			message.channel.send('Votaste: "NO".');
			autho.pollid = mr3; 
			novotes = novotes + 1
			return;
		}
		if(args[1]==="No") {
			message.channel.send('Votaste: "NO".');
			autho.pollid = mr3; 
			novotes = novotes + 1
			return;
		}
		if(args[1]==="NO") {
			message.channel.send('Votaste: "NO".');
			autho.pollid = mr3; 
			novotes = novotes + 1
			return;
		}
		if(args[1]==="nO") {
			message.channel.send('Votaste: "NO".');
			autho.pollid = mr3; 
			novotes = novotes + 1
			return;
		}
		if (args[1]==="si") {
			message.channel.send('Votaste: "SÍ".');
			yesvotes = yesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="Si") {
			message.channel.send('Votaste: "SÍ".');
			yesvotes = yesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="Sí") {
			message.channel.send('Votaste: "SÍ".');
			yesvotes = yesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sí") {
			message.channel.send('Votaste: "SÍ".');
			yesvotes = yesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="SI") {
			message.channel.send('Votaste: "SÍ".');
			yesvotes = yesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="SÍ") {
			message.channel.send('Votaste: "SÍ".');
			yesvotes = yesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sI") {
			message.channel.send('Votaste: "SÍ".');
			yesvotes = yesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sÍ") {
			message.channel.send('Votaste: "SÍ".');
			yesvotes = yesvotes + 1
			autho.pollid = mr3
			return;
		}
			else {
			message.channel.send("Por favor, vota si o no.")
			return;
		}
		
		break;

		case "voteadmin":
		if (!message.member.roles.find("name", "Administrador")) {
			message.channel.send('Lo siento, pero necesitas el rol "Administrador" para hacer esto.')
			return;
			}

		if(!already) {
				message.channel.send("No hay una votación en progreso.")
				return;
				}
				if(already===false) {
				message.channel.send("No hay una votación en progreso.")
				return;
				}

		var autho = message.author

		if (autho.pollid) {
		
			if (autho.pollid === mr3) {
				message.channel.send("Ya votaste.")
				return;
			}
		}
		if(!args[1]) {
			message.channel.send("Por favor, vota si o no.");
			return;
		}
		if(args[1]==="no") {
			message.channel.send('Votaste como admin: "NO".');
			autho.pollid = mr3; 
			admnovotes = admnovotes + 1
			return;
		}
		if(args[1]==="No") {
			message.channel.send('Votaste como admin: "NO".');
			autho.pollid = mr3; 
			admnovotes = admnovotes + 1
			return;
		}
		if(args[1]==="NO") {
			message.channel.send('Votaste como admin: "NO".');
			autho.pollid = mr3; 
			admnovotes = admnovotes + 1
			return;
		}
		if(args[1]==="nO") {
			message.channel.send('Votaste como admin: "NO".');
			autho.pollid = mr3; 
			admnovotes = admnovotes + 1
			return;
		}
		if (args[1]==="si") {
			message.channel.send('Votaste como admin: "SÍ".');
			admyesvotes = admyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="Si") {
			message.channel.send('Votaste como admin: "SÍ".');
			admyesvotes = admyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="Sí") {
			message.channel.send('Votaste como admin: "SÍ".');
			admyesvotes = admyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sí") {
			message.channel.send('Votaste como admin: "SÍ".');
			admyesvotes = admyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="SÍ") {
			message.channel.send('Votaste como admin: "SÍ".');
			admyesvotes = admyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="SI") {
			message.channel.send('Votaste como admin: "SÍ".');
			admyesvotes = admyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sÍ") {
			message.channel.send('Votaste como admin: "SÍ".');
			admyesvotes = admyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sI") {
			message.channel.send('Votaste como admin: "SÍ".');
			admyesvotes = admyesvotes + 1
			autho.pollid = mr3
			return;
		}
			else {
			message.channel.send("Por favor, vota si o no.")
			return;
		}


		break;

		case "votemod":
	
		if (!message.member.roles.find("name", "Moderador")) {
			message.channel.send('Lo siento, pero necesitas el rol "Moderador" para hacer esto.')
			return;
			}

		if(!already) {
				message.channel.send("No hay una votación en progreso.")
				return;
				}
				if(already===false) {
				message.channel.send("No hay una votación en progreso.")
				return;
				}

		var autho = message.author

		if (autho.pollid) {
		
			if (autho.pollid === mr3) {
				message.channel.send("Ya votaste.")
				return;
			}
		}
		if(!args[1]) {
			message.channel.send("Por favor, vota si o no.");
			return;
		}
		if(args[1]==="no") {
			message.channel.send('Votaste como mod: "NO".');
			autho.pollid = mr3; 
			modnovotes = modnovotes + 1
			return;
		}
		if(args[1]==="No") {
			message.channel.send('Votaste como mod: "NO".');
			autho.pollid = mr3; 
			modnovotes = modnovotes + 1
			return;
		}
		if(args[1]==="NO") {
			message.channel.send('Votaste como mod: "NO".');
			autho.pollid = mr3; 
			modnovotes = modnovotes + 1
			return;
		}
		if(args[1]==="nO") {
			message.channel.send('Votaste como mod: "NO".');
			autho.pollid = mr3; 
			modnovotes = modnovotes + 1
			return;
		}
		if (args[1]==="si") {
			message.channel.send('Votaste como mod: "SÍ".');
			modyesvotes = modyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sí") {
			message.channel.send('Votaste como mod: "SÍ".');
			modyesvotes = modyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="Sí") {
			message.channel.send('Votaste como mod: "SÍ".');
			modyesvotes = modyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="Si") {
			message.channel.send('Votaste como mod: "SÍ".');
			modyesvotes = modyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="SI") {
			message.channel.send('Votaste como mod: "SÍ".');
			modyesvotes = modyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="SÍ") {
			message.channel.send('Votaste como mod: "SÍ".');
			modyesvotes = modyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sI") {
			message.channel.send('Votaste como mod: "SÍ".');
			modyesvotes = modyesvotes + 1
			autho.pollid = mr3
			return;
		}
		if (args[1]==="sÍ") {
			message.channel.send('Votaste como mod: "SÍ".');
			modyesvotes = modyesvotes + 1
			autho.pollid = mr3
			return;
		}
			else {
			message.channel.send("Por favor, vota si o no.")
			return;
		}

        break;		

		default: 
				message.channel.send("Ese comando no existe, ze.");
    
}});

bot.login(TOKEN)