const rlS = require('readline-sync')
const chalk = require("chalk")
const log = console.log
const l = console.log
const chbl = chalk.blue
const chblbr = chalk.blueBright
const chcy = chalk.cyan
const chcybr = chalk.cyanBright
const chre = chalk.red
const chrebr = chalk.redBright
const chgr = chalk.green
const chgrbr = chalk.greenBright
const chmabr = chalk.magentaBright
let hasRan = 0
let walked = 0
let enemiesKilled = 0

git
console.log(
	chblbr(
		"Welcome to 10th Century England, King 'Your Name will appear here'. You are on a quest to find members to join the Knights of the Round Table. You are accompanied by your trusty squire, Patsy."
	)
)


const heroName = rlS.question(chcybr("What is your name? "), {
	limit: /^[A-Z a-z]+$/,
	limitMessage: chmabr("Please use only the characters A-Z")
})
const skillsArray = ["Anarcho-syndicalism", "Power Word: NI!", "Counting to Three"]
const	skill = rlS.keyInSelect(skillsArray, chblbr('You already have the basic skill of "Banging two coconuts together", please choose one additional skill '), { cancel: false })
rlS.question(chcybr('You and Patsy clop down the road..starting your journey (press enter)'))

function Player() {
	this.name = heroName;
	//  this.hp = Math.floor(Math.random() * (1000)) + 2000;
	//  this.attackP = Math.floor(Math.random() * (300)) + 900;
	//  this.defense = Math.floor(Math.random() * (300)) + 900;
	this.hp = 4000
	this.attackP = 1500
	this.defense = 1000
	this.inventory = ['coconuts'];
	this.skills = skillsArray[skill];
	this.isAlive = true;
	this.attack = function () {
		return (Math.floor(Math.random() * 1) + 1)
	}
}
const firstPlayer = new Player();

function PartyMember(name, hp, attackP, defense, soul, skills) {
	this.name = name;
	this.hp = Math.floor(hp * (Math.floor(Math.random() * (800)) + 900))
	this.attackP = Math.floor(attackP * (Math.floor(Math.random() * (1000)) + 400));
	this.defense = Math.floor(defense * (Math.floor(Math.random() * (1000 - 700)) + 700));
	this.soul = Math.floor(soul * (Math.floor(Math.random() * 5) + 5))
	this.skills = skills;
	this.isAlive = true;
}
const patsy = new PartyMember("Patsy", 0.3, 0.3, 0.3, 0.4, "none")
const lancelot = new PartyMember("Sir Lancelot the Brave", 0.8, 1.3, 0.7, 1, "none")
const galahad = new PartyMember("Sir Galahad the Pure", 1, 0.6, 0.6, 2, "none")
const party = {
	firstPlayer,
	patsy
}

// function chooseSkills(){

// }

function Enemy(name, hp, attackP, defense, soul, description) {
	this.name = name
	// this.hp = Math.floor(hp * (Math.floor(Math.random() * (2000 - 800)) + 2000))
	// this.attackP = Math.floor(attackP + (Math.floor(Math.random() * (1000 - 700)) + 100))
	// this.defense = Math.floor(defense * (Math.floor(Math.random() * (1000 - 700)) + 600))
	// this.soul = Math.floor(soul * (Math.floor(Math.random() * 5) + 4))
	this.hp = hp
	this.attackP = attackP
	this.defense = defense
	this.soul = soul
	this.description = description
	this.isAlive = true;
	this.attack = function () {
		return (Math.floor(Math.random() * 3) + 1)
	}
}

const rabbit = new Enemy("Killer Rabbit of Caerbannog", 3000, 9000, 1000, 100, "nasty, big, pointy teeth!...His attack power is over 9000!!!")
const blackKnight = new Enemy("the Black Knight", 20, .05, .05, 100, "A well armoured knight of the realm, appears experienced");
const randomRobber = new Enemy("Highwayman", 700, 1050, 1100, 8, "A highwayman")
const hedgeKnight2 = new Enemy("Robber", 800, 1100, 1050, 7, "A robber!")
const hedgeKnight3 = new Enemy("Hedge Knight", 3000, 9001, 1150, 6, "A random hedge knight")
const randomEnemies = [randomRobber, hedgeKnight2, hedgeKnight3]


while (!firstPlayer.hasWon && firstPlayer.isAlive) {
	let action = rlS.keyIn(chalk.cyan('If you would like to continue on your quest press [w]\n') + chalk.blue('[i] To view character status and inventory\n') + chalk.red('[q] to Quit\n'), {
		limit: 'wiqWIQ'
	})
	if (action == 'w') {
		walk()
	} else if (action == 'i') {
		inventory()
	} else {
		firstPlayer.isAlive = false
	}
}


function walk() {
	let random = Math.floor(Math.random() * 5) + 1
	// let random = 5 //for testing
	if (random <= 4 && enemiesKilled < 3 && Object.keys(party).length < 5) {
		let random2 = Math.floor(Math.random() * 4) + 1
		random2 == 1 ?
			recruitParty() :
			random2 == 2 ?
			l(chgrbr("You camp for the night and continue in the morning.\n")) :
			random2 == 3 ?
			l(
				chrebr(
					"You come upon a field of dead swallows and the remains of coconuts.\nDespite this horrowing sight you persevere on your quest.\n"
				)
			) :
			l(chgrbr("You travel through a dark, dense, wood but have made little progress on your quest\n"))
		rlS.question(chgrbr("(Press enter to continue...)"))
	}
	// else if (random <= 4) {} 
	else {
		enemyEncounter()
	}
}

function recruitParty() {
	if (Object.keys(party).length < 3) {
		l(chbl("You have encountered Sir Galahad the Brave, who has agreed to join the round table"))
		party.galahad = galahad
		l(chblbr(`Sir Galahad has ${party.galahad.hp} Hitpoints, ${party.galahad.attackP} AttackPower, a ${party.galahad.defense} DefenseRating, and a ${party.galahad.soul} Soul rating.\n`))
	} else if (Object.keys(party).length < 4) {
		l(chbl("You have encountered Sir Lancelot, who has agreed to join in your quest."))
		party.lancelot = lancelot
		l(chblbr(`Sir Lancelot has ${party.lancelot.hp} Hitpoints, ${party.lancelot.attackP} AttackPower, a ${party.lancelot.defense} DefenseRating, and a ${party.lancelot.soul} Soul rating.\n`))
	} else {
		l('test')
		l(chre('You pass by a cart full of apparently dead plague victims, one of whom appears to be moving.\n' + chgr('You see something on the horizon.\n')))
	}
}

function inventory() {
	l(chblbr(`Your current hp is ${firstPlayer.hp} and your inventory has: ${firstPlayer.inventory}\n`));
}

function enemyEncounter() {
	let enemy = randomEnemies[Math.floor(Math.random() * randomEnemies.length)]
	let fighting = true
	let battle = ''
	while (fighting) {
		while(battle == ''){
			battle = rlS.keyIn(chre(`You see a ${enemy.name} in the distance, who bellows an ominous threat and starts running towards you with his sword drawn, would you like to run [r] or fight [f].\n`), {limit: 'rf'})
			
		}
		if (battle == 'r') {
				run(battle, fighting, enemy)
				return
		} else if (battle = 'f') {
			while (enemy.hp > 0 && firstPlayer.hp > 0) {
				fight(enemy, fighting)
			}
		}
	}
	return
}

function run(fighting, enemy) {
	let randomRun = Math.floor(Math.random() * 100 + 1)
	if (randomRun < 50) {
		l(chgrbr("Run away! Run away!....You have successfully avoided this encounter.\n"))
		return fighting = false
	} else {
		l(chrebr("You were unsuccessful in escaping, now you must fight!"))
		rlS.question(chrebr("Prepare for battle (press enter)"))
			while (enemy.hp > 0 && firstPlayer.hp > 0) {
				fight(enemy, fighting)}
	}
	return
}

function fight(enemy, fighting) {
	let random = Math.floor(Math.random()*5)+1
	if (random === 1) {
		l(chblbr('Whiff...you are nowhere near the enemy...you missed.'))
		rlS.question(chbl('You spot your enemy and recenter (press enter)'))
	} else {
		playerAttack = (firstPlayer.attackP - enemy.defense) * firstPlayer.attack()
		enemyAttack = (enemy.attackP - firstPlayer.defense) * enemy.attack()
		enemy.hp -= +playerAttack
		firstPlayer.hp -= +enemyAttack
		l(chre(`The ${enemy.name} gets past your defenses and damages you for ${enemyAttack}, you hit him back for ${playerAttack} damage.\nYour health is now ${firstPlayer.hp}`))
		checkHealth(enemy, fighting)
		rlS.question(chgrbr('(Press enter to continue...)'))
		return
	}
	return
}

function checkHealth(enemy, fighting) {
	if (enemy.hp < 0) {
		l(chcy('You have mortally wounded your enemy, who ,despite fighting bravely, was slain by your superior skill\nYou feel rejuvinated from the battle and regain 200 HP\n'))
		firstPlayer.hp += 200
		fighting = false
		enemiesKilled++
		if (enemiesKilled === 1) {
			l(chmabr('The enemy has dropped something...upon closer inspection it looks like some sort of highly decorated orb.'))
			firstPlayer.inventory.push("Holy Hand Grenade of Antioch")
			return
		} else if (enemiesKilled === 2) {
			l(
				chmabr(
					"The enemy has dropped something...it looks like a duck"
				)
				
			)
			firstPlayer.inventory.push("duck")
			return
		}
		return
	}
	if (firstPlayer.hp < 0) {
		l(chre('You have failed in your quest.\nSad.'))
		firstPlayer.isAlive = false
		return
	}
	return
}
