// Variables
let inputStr = document.getElementById("Str");
let inputInt = document.getElementById("Int");
let inputWis = document.getElementById("Wis");
let inputDex = document.getElementById("Dex");
let inputCon = document.getElementById("Con");
let inputCha = document.getElementById("Cha");
var ancestry_options = document.getElementById("ancestry");
var class_options = document.getElementById("classes");
var details_Name = document.getElementById("Char_Name");
var char_level = document.getElementById("Level");
let armor_class_options = document.getElementById("Armor");
let shield_check = document.getElementById("shield");
let armor_class = 0;
let ability_scores = [inputStr.value, inputInt.value, inputWis.value, inputDex.value, inputCon.value, inputCha.value];
shield_checked = false;

// Tab functionality
function openTab(event, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
  } 

// Rolls one D6 - used when deciding stats
function roll_dsix() {
  min = Math.ceil(1);
  max = Math.floor(6);
  roll = Math.floor(Math.random() * (max - min) + min);
  return roll;
}
//Roll 3d6 for each char stat
function roll_stats(){
  inputStr.value = Number(roll_dsix()) + Number(roll_dsix()) + Number(roll_dsix());
  inputInt.value = Number(roll_dsix()) + Number(roll_dsix()) + Number(roll_dsix());
  inputWis.value = Number(roll_dsix()) + Number(roll_dsix()) + Number(roll_dsix());
  inputDex.value = Number(roll_dsix()) + Number(roll_dsix()) + Number(roll_dsix());
  inputCon.value = Number(roll_dsix()) + Number(roll_dsix()) + Number(roll_dsix());
  inputCha.value = Number(roll_dsix()) + Number(roll_dsix()) + Number(roll_dsix()); 
}
//This checks for characters ability scores
function ability_check(x) {
  if (x >= 3 && x <= 18)
  {
    return x
  }
  else{
    return "Invalid Ability Score"
  }
}
//this is a swtich function used to find each ability score
function ability_bonus(x){
  let bonus = "";
  switch (Number(x)) {
    case 3: 
      bonus = -3;
      break;
    case 4: 
    case 5:
      bonus = -2;
      break;
    case 6:
    case 7:
    case 8:
      bonus = -1;
      break;
    case 9: 
    case 10: 
    case 11: 
    case 12:
      bonus = 0;
      break;
    case 13: 
    case 14: 
    case 15:
      bonus = 1;
      break;
    case 16: 
    case 17:
      bonus = 2;
      break;
    case 18:
      bonus = 3;
      break;
  }
  return bonus;
}
//this displays the chars ability scores and hides ancestries that they are not valid for
function ability_limits(){
  CharAbilties_scores.innerHTML =
    "Str: " + ability_check(inputStr.value) + " [" + ability_bonus(inputStr.value) + "] " +
    "Int: " + ability_check(inputInt.value) + " [" + ability_bonus(inputInt.value) + "] " +
    "Wis: " + ability_check(inputWis.value) + " [" + ability_bonus(inputWis.value) + "] " +
    "Dex: " + ability_check(inputDex.value) + " [" + ability_bonus(inputDex.value) + "] " +
    "Con: " + ability_check(inputCon.value) + " [" + ability_bonus(inputCon.value) + "] " +
  "Cha: " + ability_check(inputCha.value) + " [" + ability_bonus(inputCha.value) + "] ";
  let ability_scores = [inputStr.value, inputInt.value, inputWis.value, inputDex.value, inputCon.value, inputCha.value];
    //Ancestry limits
    if (Number(ability_scores[4]) <= 8 || Number(ability_scores[5]) >= 17){
      ancestry_options.querySelector("option[value='Dwarf']").style.display = "none";
    }
    else{
        ancestry_options.querySelector("option[value='Dwarf']").style.display = "block";
    }
    if (Number(ability_scores[1]) <= 8 || Number(ability_scores[4]) >= 17){
      ancestry_options.querySelector("option[value='Elf']").style.display = "none";
    }
    else{
        ancestry_options.querySelector("option[value='Elf']").style.display = "block"; 
    }
    if (Number(ability_scores[3]) <= 8 || Number(ability_scores[0]) >= 17){
      ancestry_options.querySelector("option[value='Halfling']").style.display = "none";
    } 
    else{
        ancestry_options.querySelector("option[value='Halfling']").style.display = "block";
    }
}
//Hides classes unavailable based on attributes
function class_render(){
  let ability_scores = [inputStr.value, inputInt.value, inputWis.value, inputDex.value, inputCon.value, inputCha.value];

    if (ability_scores[2] < 8){
      class_options.querySelector("option[value='Cleric']").style.display = "none";
    } else {
      class_options.querySelector("option[value='Cleric']").style.display = "block";
    }
    if (ability_scores[0] < 8){
      class_options.querySelector("option[value='Fighter']").style.display = "none";
    } else {
      class_options.querySelector("option[value='Fighter']").style.display = "block";
    }
    if (ability_scores[1] < 8){
      class_options.querySelector("option[value='Magic-User']").style.display = "none";
    } else {
      class_options.querySelector("option[value='Magic-User']").style.display = "block";
    }
    if (ability_scores[3] < 8){
      class_options.querySelector("option[value='Thief']").style.display = "none";
    } else {
      class_options.querySelector("option[value='Thief']").style.display = "block";
    }
    if (ancestry_options.value === "Halfling" || ancestry_options.value === "Dwarf"){
      class_options.querySelector("option[value='Magic-User']").style.display = "none";
  } else {
      class_options.querySelector("option[value='Magic-User']").style.display = "block";
  }
}
//Prints the class and level of char
function print_class (){
  return class_options.value + " |" + " Level: " + char_level.value;
}
//finds the hitdice for the char based on ancestry and level
function fighter_hitdice (level){
  let result = ""
  if (ancestry_options.value === "Halfling" || ancestry_options.value === "Elf")
  {
    if (level < 10) {
      result = level+ "d6";
      return result;
  
    } 
    if (level < 21){
      result = "9d6 + " + ((level- 10 + 1) * 2);
      return result;
    } 
  }else{
    if (level < 10) {
      result = level+ "d8";
      return result;
  
    } 
    if (level < 21){
      result = "9d8 + " + ((level- 10 + 1) * 2);
      return result;
    } 
  }
  
}
//returns celeric hit dice
function cleric_hitdice (level){
  let result = ""
  if (level < 10) {
    result = level+ "d6";
    return result;
  } 
  if (level < 21){
    result = "9d8 + " + ((level- 10 + 1) * 1);
    return result;
  } 
}
//returns thief hit dice
function thief_hitdice (level){
  let result = ""
  if (level < 10) {
    result = level+ "d4";
    return result;
  } 
  if (level < 21){
    result = "9d4 + " + ((level- 10 + 1) * 2);
    return result;
  } 
}
//returns magic-user hit dice
function MagicUser_hitdice (level){
  let result = ""
  if (level < 10) {
    result = level+ "d4";
    return result;
  } 
  if (level < 21){
    result = "9d4 + " + ((level- 10 + 1) * 1);
    return result;
  } 
}
//prints the applicable hitdice for char based on level and selected class
function print_hitdice (){
  switch(class_options.value){
    case "Fighter":
      return fighter_hitdice(char_level.value);
      break;
    case "Cleric":
      return cleric_hitdice(char_level.value);
      break;
    case "Thief":
      return thief_hitdice(char_level.value);
      break;
    case "Magic-User":
      return MagicUser_hitdice(char_level.value);
      break;
  }
}
//prints hitdice
function print_hitdice_class (){
  Class_Hit_Dice.innerHTML = 
  "Hit Dice: " + print_hitdice();
}
//checks the status of the shield selection and returns true or false
function Shield(){
  var checkbox = document.getElementById('Shield');
  if (checkbox.checked != false) {
    shield_checked = true;
  }else{
    shield_checked = false;
  }
}
//finds the value of the chars armor class based on armor selection
function armor_class_val() {
  let shield_bonus = 0;
  armor_class = 0;
  if (shield_checked === true) {
    shield_bonus = 1;
  } else{
    shield_bonus = 0;
  }
  switch(armor_class_options.value){
    case "NoArmor": 
      armor_class = Number(11+ Number(ability_bonus(inputDex.value)) + Number(shield_bonus));
      break;
    case "LeatherArmor":
      armor_class = Number(13 + Number(ability_bonus(inputDex.value))+ Number(shield_bonus));
      break;
    case "ChainMail":
      armor_class = Number(15 + Number(ability_bonus(inputDex.value))+ Number(shield_bonus));
      break;
    case "PlateMail":
      armor_class = Number(17 + Number(ability_bonus(inputDex.value))+ Number(shield_bonus));
      break;
  }

}
//return ancestry abilities based on char selection
function Ancestry_Abilities () {
  switch(ancestry_options.value){
    case "Dwarf":
      return "Dark Vision: 60' | Detect Stone 2/6 | - Cannot Use 2 Handed / Large Weapons";
      break;
    case "Elf":
      return "Dark Vision: 60' | Detect Secret Door 2/6 | Immune to ghoul Paralysis | Reduced Surprise 1/6";
      break;
    case "Halfling":
      return "+1 To Attack With Ranged Weapons | +2 AC From Larger Creatures | +1 Initiative | 90% Hidden in Forrest | 30% Hide | - Cannot Use 2 Handed / Large Weapons";
      break;
    case "Human":
      return "10% Bonus to EXP";
      break;
  }
}
//return the bonus to rolls each ancestry has, blank for humans
function Ancestry_save_bonus () {
  switch(ancestry_options.value){
    case "Dwarf":
      return "\n  +4 Deathray or Poison | +4 Magic Wands | +4 Paralysis or Petrify | +4 Spells | + 3 Dragons Breath";
      break;
    case "Elf":
      return "\n  +2 Magic Wands | +1 Paralysis or Petrify | +2 Spells";
      break;
    case "Halfling":
      return "\n  +4 Deathray or Poison | +4 Magic Wands | +4 Paralysis or Petrify | +4 Spells | + 3 Dragons Breath";
      break;
    case "Human":
      return "";
      break;
  }
}
//prints hit points in class section
function print_hitpoints_class(){
  Class_Hit_Points.innerHTML =
  "Hit Points: " + Number(Number(Hit_Points_Amount.value)+ Number(ability_bonus(inputCon.value)));
}
//return cleric tables
function cleric_abilities(){
  switch (Number(char_level.value)){
    case 1: 
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| - | - | - | - | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-13 | Zombie-17 | Ghoul-19 | Wight-No | Wraith-No | Mummy-No | Spectre-No | Vampire-No | Ghost-No |";
      break;
    case 2:
      return "-Wear any armor | -Only blunt Weapons" +  "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 1 | - | - | - | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-11 | Zombie-15 | Ghoul-18 | Wight-20 | Wraith-No | Mummy-No | Spectre-No | Vampire-No | Ghost-No |";
      break;
    case 3:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 2 | - | - | - | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-9 | Zombie-13 | Ghoul-17 | Wight-19 | Wraith-No | Mummy-No | Spectre-No | Vampire-No | Ghost-No |";
      break;
    case 4:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 2 | 1 | - | - | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-7 | Zombie-11 | Ghoul-15 | Wight-18 | Wraith-20 | Mummy-No | Spectre-No | Vampire-No | Ghost-No |";
      break;
    case 5:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 2 | 2 | - | - | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-5 | Zombie-9 | Ghoul-13 | Wight-17 | Wraith-19 | Mummy-No | Spectre-No | Vampire-No | Ghost-No |";
      break;
    case 6:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 2 | 2 | 1 | - | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-3 | Zombie-7 | Ghoul-11 | Wight-15 | Wraith-18 | Mummy-20 | Spectre-No | Vampire-No | Ghost-No |";
      break;
    case 7:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 3 | 2 | 2 | - | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-2 | Zombie-5 | Ghoul-9 | Wight-13 | Wraith-17 | Mummy-19 | Spectre-No | Vampire-No | Ghost-No |";
      break;
    case 8:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 3 | 2 | 2 | 1 | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-T | Zombie-3 | Ghoul-7 | Wight-11 | Wraith-15 | Mummy-18 | Spectre-20 | Vampire-No | Ghost-No |";
      break;
    case 9:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 3 | 3 | 2 | 2 | - | - |"
      +"\n\n-Turn Undead-\n|Skeleton-T | Zombie-2 | Ghoul-5 | Wight-9 | Wraith-13 | Mummy-17 | Spectre-19 | Vampire-No | Ghost-No |";
      break;
    case 10:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 3 | 3 | 2 | 2 | 1 | - |"
      +"\n\n-Turn Undead-\n|Skeleton-T | Zombie-T | Ghoul-3 | Wight-7 | Wraith-11 | Mummy-15 | Spectre-18 | Vampire-20 | Ghost-No |";
      break;
    case 11:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 3 | 2 | 2 | 1 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-T | Ghoul-2 | Wight-5 | Wraith-9 | Mummy-13 | Spectre-17 | Vampire-19 | Ghost-No |";
      break;
    case 12:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 3 | 2 | 2 | 1 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-T | Ghoul-T | Wight-3 | Wraith-7 | Mummy-11 | Spectre-15 | Vampire-18 | Ghost-20 |";
      break;
    case 13:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 3 | 3 | 2 | 2 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-D | Ghoul-T | Wight-2 | Wraith-5 | Mummy-9 | Spectre-13 | Vampire-17 | Ghost-19 |";
      break;
    case 14:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 4 | 3 | 3 | 2 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-D | Ghoul-T | Wight-T | Wraith-3 | Mummy-7 | Spectre-11 | Vampire-15 | Ghost-18 |";
      break;
    case 15:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 4 | 3 | 3 | 2 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-D | Ghoul-D | Wight-T | Wraith-2 | Mummy-5 | Spectre-9 | Vampire-13 | Ghost-17 |";
      break;
    case 16:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 5 | 4 | 4 | 3 | 3 | 2 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-D | Ghoul-D | Wight-T | Wraith-T | Mummy-3 | Spectre-7 | Vampire-11 | Ghost-15 |";
      break;
    case 17:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 5 | 5 | 4 | 3 | 3 | 2 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-D | Ghoul-D | Wight-D | Wraith-T | Mummy-2 | Spectre-5 | Vampire-9 | Ghost-13 |";
      break;
    case 18:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 5 | 5 | 4 | 4 | 3 | 3 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-D | Ghoul-D | Wight-D | Wraith-T | Mummy-T | Spectre-3 | Vampire-7 | Ghost-11 |";
      break;
    case 19:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 6 | 5 | 4 | 4 | 3 | 3 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-D | Ghoul-D | Wight-D | Wraith-D | Mummy-T | Spectre-2 | Vampire-5 | Ghost-9 |";
      break;
    case 20:
      return "-Wear any armor | -Only blunt Weapons" + "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 6 | 5 | 5 | 4 | 3 | 3 |"
      +"\n\n-Turn Undead-\n|Skeleton-D | Zombie-D | Ghoul-D | Wight-D | Wraith-D | Mummy-T | Spectre-T | Vampire-3 | Ghost-7 |";
      break;
  }
}
//return fighter abilties
function fighter_abilities(){
  return "-Wear any armor | -Use any weapon"
}
//return magic-user tables
function magic_user_abilities(){
  switch (Number(char_level.value)){
    case 1:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 1 | - | - | - | - | - |"
      break;
    case 2: 
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 2 | - | - | - | - | - |"
      break;
    case 3:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 2 | 1 | - | - | - | - |"
      break; 
    case 4: 
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 2 | 2 | - | - | - | - |"
      break;
    case 5:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 2 | 2 | 1 | - | - | - |"
      break; 
    case 6: 
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 3 | 2 | 2 | - | - | - |"
      break;
    case 7:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 3 | 2 | 2 | 1 | - | - |"
      break; 
    case 8: 
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 3 | 3 | 2 | 2 | - | - |"
      break;
    case 9:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 3 | 3 | 2 | 2 | 1 | - |"
      break; 
    case 10:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 3 | 3 | 2 | 2 | - |"
      break; 
    case 11:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 3 | 2 | 2 | 1 |"
      break; 
    case 12:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 3 | 3 | 2 | 2 |"
      break; 
    case 13:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 4 | 3 | 2 | 2 |"
      break; 
    case 14:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 4 | 4 | 4 | 3 | 3 | 2 |"
      break; 
    case 15:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 5 | 4 | 4 | 3 | 3 | 2 |"
      break; 
    case 16:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 5 | 5 | 4 | 3 | 3 | 2 |"
      break; 
    case 17:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 5 | 5 | 4 | 4 | 3 | 3 |"
      break; 
    case 18:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 6 | 5 | 4 | 4 | 3 | 3 |"
      break; 
    case 19:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 6 | 5 | 5 | 4 | 3 | 3 |"
      break; 
    case 20:
      return "-May not wear Armor | -Only dagger and staff | -Knows read-magic" + 
      "\n\n-Spells- \n| 1 | 2 | 3 | 4 | 5 | 6 |\n| 6 | 5 | 5 | 4 | 4 | 3 |"
      break; 
  }
}
//returns thief tables
function thief_abilities(){
  switch (Number(char_level.value)){
    case 1: 
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-25 | Remove Traps-20 | Pick Pockets-30 | Move Silently-25 | Climb Walls-80 | Hide-10 | Listen-30 |";
      break;
    case 2:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-30 | Remove Traps-25 | Pick Pockets-35 | Move Silently-30 | Climb Walls-81 | Hide-15 | Listen-34 |";
      break;
    case 3:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-35 | Remove Traps-30 | Pick Pockets-40 | Move Silently-35 | Climb Walls-82 | Hide-20 | Listen-38 |";
      break;
    case 4:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-40 | Remove Traps-35 | Pick Pockets-45 | Move Silently-40 | Climb Walls-83 | Hide-25 | Listen-42 |";
      break;
    case 5:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-45 | Remove Traps-40 | Pick Pockets-50 | Move Silently-45 | Climb Walls-84 | Hide-30 | Listen-46 |";
      break;
    case 6:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-50 | Remove Traps-45 | Pick Pockets-55 | Move Silently-50 | Climb Walls-85 | Hide-35 | Listen-50 |";
      break;
    case 7:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-55 | Remove Traps-50 | Pick Pockets-60 | Move Silently-55 | Climb Walls-86 | Hide-40 | Listen-54 |";
      break;
    case 8:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-60 | Remove Traps-55 | Pick Pockets-65 | Move Silently-60 | Climb Walls-87 | Hide-45 | Listen-58 |";
      break;
    case 9:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-65 | Remove Traps-60 | Pick Pockets-70 | Move Silently-65 | Climb Walls-88 | Hide-50 | Listen-62 |";
      break;
    case 10:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-68 | Remove Traps-63 | Pick Pockets-74 | Move Silently-68 | Climb Walls-89 | Hide-53 | Listen-65 |";
      break;
    case 11:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-71 | Remove Traps-66 | Pick Pockets-78 | Move Silently-71 | Climb Walls-90 | Hide-56 | Listen-68 |";
      break;
    case 12:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-74 | Remove Traps-69 | Pick Pockets-82 | Move Silently-74 | Climb Walls-91 | Hide-59 | Listen-71 |";
      break;
    case 13:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-77 | Remove Traps-72 | Pick Pockets-86 | Move Silently-77 | Climb Walls-92 | Hide-62 | Listen-74 |";
      break;
    case 14:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-80 | Remove Traps-75 | Pick Pockets-90 | Move Silently-80 | Climb Walls-93 | Hide-65 | Listen-77 |";
      break;
    case 15:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-83 | Remove Traps-78 | Pick Pockets-94 | Move Silently-83 | Climb Walls-94 | Hide-68 | Listen-80 |";
      break;
    case 16:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-84 | Remove Traps-79 | Pick Pockets-95 | Move Silently-85 | Climb Walls-95 | Hide-69 | Listen-83 |";
      break;
    case 17:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-85 | Remove Traps-80 | Pick Pockets-96 | Move Silently-87 | Climb Walls-96 | Hide-70 | Listen-86 |";
      break;
    case 18:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-86 | Remove Traps-81 | Pick Pockets-97 | Move Silently-89 | Climb Walls-97 | Hide-71 | Listen-89 |";
      break;
    case 19:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-87 | Remove Traps-82 | Pick Pockets-98 | Move Silently-91 | Climb Walls-98 | Hide-72 | Listen-92 |";
      break;
    case 20:
      return "-May not wear metal armor or use shields | -May use any weapons | -Sneak attack: +4 to attack and damage if attacking while hidden" + 
      "\n\n-Abilities- \n| Open Locks-88 | Remove Traps-83 | Pick Pockets-99 | Move Silently-93 | Climb Walls-99 | Hide-73 | Listen-95 |";
      break;
  }
}
//matches the char class and gets thier relivent abilities
function Class_Special_Abilities () {
  switch(class_options.value){
    case "Fighter":
      return fighter_abilities();
      break;
    case "Cleric":
      return cleric_abilities();
      break;
    case "Thief":
      return thief_abilities();
      break;
    case "Magic-User":
      return magic_user_abilities();
      break;
  }
}
//gets saving throws based on class and level
function saving_throws() {
  if (class_options.value === "Fighter")
    {
      switch(Number(char_level.value)) {
        case 1:
          return "| Death Ray or Poison-12 | Magic Wands-13 | Paralysis or Petrify-14 | Dragon Breath-15 | Spells- 17 |";
          break;
        case 2:
        case 3:
          return "| Death Ray or Poison-11 | Magic Wands-12 | Paralysis or Petrify-14 | Dragon Breath-15 | Spells- 16 |";
          break;
        case 4:
        case 5:
          return "| Death Ray or Poison-11 | Magic Wands-11 | Paralysis or Petrify-13 | Dragon Breath-14 | Spells- 15 |";
          break;
        case 6:
        case 7:
          return "| Death Ray or Poison-10 | Magic Wands-11 | Paralysis or Petrify-12 | Dragon Breath-14 | Spells- 15 |";
          break;
        case 8:
        case 9:
          return "| Death Ray or Poison-9 | Magic Wands-10 | Paralysis or Petrify-12 | Dragon Breath-13 | Spells- 14 |";
          break;
        case 10:
        case 11:
          return "| Death Ray or Poison-9 | Magic Wands-9 | Paralysis or Petrify-11 | Dragon Breath-12 | Spells- 13 |";
          break;
        case 12:
        case 13:
          return "| Death Ray or Poison-8 | Magic Wands-9 | Paralysis or Petrify-10 | Dragon Breath-12 | Spells- 13 |";
          break;
        case 14:
        case 15:
          return "| Death Ray or Poison-7 | Magic Wands-8 | Paralysis or Petrify-10 | Dragon Breath-11 | Spells- 12 |";
          break;
        case 16:
        case 17:
          return "| Death Ray or Poison-7 | Magic Wands-7 | Paralysis or Petrify-9 | Dragon Breath-10 | Spells- 11 |";
          break;
        case 18:
        case 19:
          return "| Death Ray or Poison-6 | Magic Wands-7 | Paralysis or Petrify-8 | Dragon Breath-10 | Spells- 11 |";
          break;
        case 20:
          return "| Death Ray or Poison-5 | Magic Wands-6 | Paralysis or Petrify-8 | Dragon Breath-9 | Spells- 10 |";
          break;
      }
    }
    if (class_options.value === "Cleric")
    {
      switch(Number(char_level.value)) {
        case 1:
          return "| Death Ray or Poison-11 | Magic Wands-12 | Paralysis or Petrify-14 | Dragon Breath-16 | Spells- 15 |";
          break;
        case 2:
        case 3:
          return "| Death Ray or Poison-10 | Magic Wands-11 | Paralysis or Petrify-13 | Dragon Breath-15 | Spells- 14 |";
          break;
        case 4:
        case 5:
          return "| Death Ray or Poison-9 | Magic Wands-10 | Paralysis or Petrify-13 | Dragon Breath-15 | Spells- 14 |";
          break;
        case 6:
        case 7:
          return "| Death Ray or Poison-9 | Magic Wands-10 | Paralysis or Petrify-12 | Dragon Breath-14 | Spells- 13 |";
          break;
        case 8:
        case 9:
          return "| Death Ray or Poison-8 | Magic Wands-9 | Paralysis or Petrify-12 | Dragon Breath-14 | Spells- 13 |";
          break;
        case 10:
        case 11:
          return "| Death Ray or Poison-8 | Magic Wands-9 | Paralysis or Petrify-11 | Dragon Breath-13 | Spells- 12 |";
          break;
        case 12:
        case 13:
          return "| Death Ray or Poison-7 | Magic Wands-8 | Paralysis or Petrify-11 | Dragon Breath-13 | Spells- 12 |";
          break;
        case 14:
        case 15:
          return "| Death Ray or Poison-7 | Magic Wands-8 | Paralysis or Petrify-10 | Dragon Breath-12 | Spells- 11 |";
          break;
        case 16:
        case 17:
          return "| Death Ray or Poison-6 | Magic Wands-7 | Paralysis or Petrify-10 | Dragon Breath-12 | Spells- 11 |";
          break;
        case 18:
        case 19:
          return "| Death Ray or Poison-6 | Magic Wands-7 | Paralysis or Petrify-9 | Dragon Breath-11 | Spells- 10 |";
          break;
        case 20:
          return "| Death Ray or Poison-5 | Magic Wands-6 | Paralysis or Petrify-9 | Dragon Breath-11 | Spells- 10 |";
          break;
      }
    }
    if (class_options.value === "Magic-User")
    {
      switch(Number(char_level.value)) {
        case 1:
          return "| Death Ray or Poison-13 | Magic Wands-14 | Paralysis or Petrify-13 | Dragon Breath-16 | Spells- 15 |";
          break;
        case 2:
        case 3:
          return "| Death Ray or Poison-13 | Magic Wands-14 | Paralysis or Petrify-13 | Dragon Breath-15 | Spells- 14 |";
          break;
        case 4:
        case 5:
          return "| Death Ray or Poison-12 | Magic Wands-13 | Paralysis or Petrify-12 | Dragon Breath-15 | Spells- 13 |";
          break;
        case 6:
        case 7:
          return "| Death Ray or Poison-12 | Magic Wands-12 | Paralysis or Petrify-11 | Dragon Breath-14 | Spells- 13 |";
          break;
        case 8:
        case 9:
          return "| Death Ray or Poison-11 | Magic Wands-11 | Paralysis or Petrify-10 | Dragon Breath-14 | Spells- 12 |";
          break;
        case 10:
        case 11:
          return "| Death Ray or Poison-11 | Magic Wands-10 | Paralysis or Petrify-9 | Dragon Breath-13 | Spells- 11 |";
          break;
        case 12:
        case 13:
          return "| Death Ray or Poison-10 | Magic Wands-10 | Paralysis or Petrify-9 | Dragon Breath-13 | Spells- 11 |";
          break;
        case 14:
        case 15:
          return "| Death Ray or Poison-10 | Magic Wands-9 | Paralysis or Petrify-8 | Dragon Breath-12 | Spells- 10 |";
          break;
        case 16:
        case 17:
          return "| Death Ray or Poison-9 | Magic Wands-8 | Paralysis or Petrify-7 | Dragon Breath-12 | Spells- 9 |";
          break;
        case 18:
        case 19:
          return "| Death Ray or Poison-9 | Magic Wands-7 | Paralysis or Petrify-6 | Dragon Breath-11 | Spells- 9 |";
          break;
        case 20:
          return "| Death Ray or Poison-8 | Magic Wands-6 | Paralysis or Petrify-5 | Dragon Breath-11 | Spells- 8 |";
          break;
        }
      }
    if (class_options.value === "Thief")
    {
      switch(Number(char_level.value)) {
        case 1:
          return "| Death Ray or Poison-13 | Magic Wands-14 | Paralysis or Petrify-13 | Dragon Breath-16 | Spells- 15 |";
          break;
        case 2:
        case 3:
          return "| Death Ray or Poison-12 | Magic Wands-14 | Paralysis or Petrify-12 | Dragon Breath-15 | Spells- 14 |";
          break;
        case 4:
        case 5:
          return "| Death Ray or Poison-11 | Magic Wands-13 | Paralysis or Petrify-12 | Dragon Breath-14 | Spells- 13 |";
          break;
        case 6:
        case 7:
          return "| Death Ray or Poison-11 | Magic Wands-13 | Paralysis or Petrify-11 | Dragon Breath-13 | Spells- 13 |";
          break;
        case 8:
        case 9:
          return "| Death Ray or Poison-10 | Magic Wands-12 | Paralysis or Petrify-11 | Dragon Breath-12 | Spells- 12 |";
          break;
        case 10:
        case 11:
          return "| Death Ray or Poison-9 | Magic Wands-12 | Paralysis or Petrify-10 | Dragon Breath-11 | Spells- 11 |";
          break;
        case 12:
        case 13:
          return "| Death Ray or Poison-9 | Magic Wands-10 | Paralysis or Petrify-10 | Dragon Breath-10 | Spells- 11 |";
          break;
        case 14:
        case 15:
          return "| Death Ray or Poison-8 | Magic Wands-10 | Paralysis or Petrify-9 | Dragon Breath-9 | Spells- 10 |";
          break;
        case 16:
        case 17:
          return "| Death Ray or Poison-7 | Magic Wands-9 | Paralysis or Petrify-9 | Dragon Breath-8 | Spells- 9 |";
          break;
        case 18:
        case 19:
          return "| Death Ray or Poison-7 | Magic Wands-9 | Paralysis or Petrify-8 | Dragon Breath-7 | Spells- 9 |";
          break;
        case 20:
          return "| Death Ray or Poison-6 | Magic Wands-8 | Paralysis or Petrify-8 | Dragon Breath-6 | Spells- 8 |";
          break;
      }
    }
}
//returns attack bonus based on char class and level
function print_attack_Bonus() {
  if (class_options.value === "Fighter"){
    switch(Number(char_level.value)){
      case 1:
        return 1;
        break;
      case 2:
      case 3:
        return 2;
        break;
      case 4:
        return 3;
        break;
      case 5:
      case 6:
        return 4;
        break;
      case 7:
        return 5;
        break;
      case 8:
      case 9:
      case 10:
        return 6;
        break;
      case 11:
      case 12:
        return 7;
        break;
      case 13:
      case 14:
      case 15:
        return 8;
        break;
      case 16:
      case 17:
        return 9;
        break;
      case 18:
      case 19:
      case 20:
        return 10;
        break;
    }
  }
  if (class_options.value === "Thief" || (class_options.value === "Cleric")){
      switch(Number(char_level.value)){
        case 1:
        case 2:
          return 1;
          break;
        case 3:
        case 4:
          return 2;
          break;
        case 5:
        case 6:
          return 3;
          break;
        case 7:
        case 8:
          return 4;
          break;
        case 9:
        case 10:
        case 11:
          return 5;
          break;
        case 12:
        case 13:
        case 14:
          return 6;
          break;
        case 15:
        case 16:
        case 17:
          return 7;
          break;
        case 18:
        case 19:
        case 20:
          return 8;
          break
      }
  }
  if (class_options.value === "Magic-User"){
      switch(Number(char_level.value)){
        case 1:
        case 2:
        case 3:
          return 1;
          break;
        case 4:
        case 5:
          return 2;
          break;
        case 6:
        case 7:
        case 8:
          return 3;
          break;
        case 9:
        case 10:
        case 11:
        case 12:
          return 4;
          break;
        case 13:
        case 14:
        case 15:
          return 5;
          break;
        case 16:
        case 17:
        case 18:
          return 6;
          break;
        case 19:
        case 20:
          return 7;
          break;
      }
  }
}
//generates the character carry capacity for halfling and for all other ancestries
function char_carry_cap() {
  if (ancestry_options.value === "Halfling"){
    let light_carry_cap = 50;
    let heavy_carry_cap = 100;
    if (Math.sign(Number(ability_bonus(inputStr.value))) === -1)
    {
      light_carry_cap = Number(light_carry_cap) + Number(ability_bonus(inputStr.value)) * (light_carry_cap * 0.2)
      light_carry_cap = 5 * Math.round(light_carry_cap/5);
      heavy_carry_cap = Number(heavy_carry_cap) + Number(ability_bonus(inputStr.value)) * (heavy_carry_cap * 0.2)
      heavy_carry_cap = 5 * Math.round(heavy_carry_cap/5);
      return "Light Load: " + light_carry_cap + " | Heavy Load: " + heavy_carry_cap;
    }
    else{
      light_carry_cap = Number(light_carry_cap) + Number(ability_bonus(inputStr.value)) * (light_carry_cap * 0.1)
      light_carry_cap = 5 * Math.round(light_carry_cap/5);
      heavy_carry_cap = Number(heavy_carry_cap) + Number(ability_bonus(inputStr.value)) * (heavy_carry_cap * 0.1)
      heavy_carry_cap = 5 * Math.round(heavy_carry_cap/5);
      return "Light Load: " + light_carry_cap + " | Heavy Load: " + heavy_carry_cap;
    }
  }else{
    let light_carry_cap = 60;
    let heavy_carry_cap = 150;
    if (Math.sign(Number(ability_bonus(inputStr.value))) === -1)
    {
      light_carry_cap = Number(light_carry_cap) + Number(ability_bonus(inputStr.value)) * (light_carry_cap * 0.2)
      light_carry_cap = 5 * Math.round(light_carry_cap/5);
      heavy_carry_cap = Number(heavy_carry_cap) + Number(ability_bonus(inputStr.value)) * (heavy_carry_cap * 0.2)
      heavy_carry_cap = 5 * Math.round(heavy_carry_cap/5);
      return "Light Load: " + light_carry_cap + " | Heavy Load: " + heavy_carry_cap;
    }
    else{
      light_carry_cap = Number(light_carry_cap) + Number(ability_bonus(inputStr.value)) * (light_carry_cap * 0.1)
      light_carry_cap = 5 * Math.round(light_carry_cap/5);
      heavy_carry_cap = Number(heavy_carry_cap) + Number(ability_bonus(inputStr.value)) * (heavy_carry_cap * 0.1)
      heavy_carry_cap = 5 * Math.round(heavy_carry_cap/5);
      return "Light Load: " + light_carry_cap + " | Heavy Load: " + heavy_carry_cap;
    }
  }
}
//based on armor return the movement speed 
function char_movement()
{
  switch(armor_class_options.value){
    case "NoArmor":
      return "Light Load: 40' | Heavy Load: 30'";
      break;
    case "Leather":
      return "Light Load: 30' | Heavy Load: 20'";
      break;
    default:
      return "Light Load: 20' | Heavy Load: 10'";
      break;
  }
} 
//Shows the character on the summary page
function print_char() {
    CharName.innerHTML = "<h3> "+ details_Name.value +" <h3/>";
    CharAbilties.innerHTML =
      "Str: " + ability_check(inputStr.value) + " [" + ability_bonus(inputStr.value) + "] " +
      "Int: " + ability_check(inputInt.value) + " [" + ability_bonus(inputInt.value) + "] " +
      "Wis: " + ability_check(inputWis.value) + " [" + ability_bonus(inputWis.value) + "] " +
      "Dex: " + ability_check(inputDex.value) + " [" + ability_bonus(inputDex.value) + "] " +
      "Con: " + ability_check(inputCon.value) + " [" + ability_bonus(inputCon.value) + "] " +
      "Cha: " + ability_check(inputCha.value) + " [" + ability_bonus(inputCha.value) + "] ";
    CharInfo.innerHTML =
        "Ancestry: " + ancestry_options.value + " |" + " Class: " + print_class();
    Hit_Dice_Display.innerHTML = 
      "Hit Dice: " + print_hitdice() + " | " + "Hit Points: " + Number(Number(Hit_Points_Amount.value)+ Number(ability_bonus(inputCon.value))) +" | "+ "Armor Class: " + armor_class;
    Combat_stats.innerHTML =
      "Attack Bonus(AB): +" + Number(print_attack_Bonus()) + " | " + " Melee AB: +" + (Number(print_attack_Bonus()) + Number(ability_bonus(inputStr.value))) +
      " | "+"Ranged AB: +" + (Number(print_attack_Bonus()) + Number(ability_bonus(inputDex.value)));
    Ancestry_Special_Abilities_List.innerHTML =
      Ancestry_Abilities() + "\n-Bonus When Rolling Saves-" + Ancestry_save_bonus();      
    Class_Special_Abilities_List.innerHTML= Class_Special_Abilities();
    Saving_Throws.innerHTML = saving_throws();
    Movement_Encumberance.innerHTML= "Encumberance"+"\n"+char_carry_cap() + "\nMovement" + "\n" + char_movement();
  }
  