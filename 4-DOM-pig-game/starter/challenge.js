/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,RoundScore,activePlayer,gamePlaying,temparray;
     
resetgame();




document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){

 //1>Random number
 var dice=Math.floor(Math.random()*6)+1; //+1 to avoid number 0
   
 //2 display the result
 var diceDom=document.querySelector('.dice');
 diceDom.style.display='block';
 diceDom.src='dice-'+dice+'.png';


  //3.update the round score if the rolled number was not a 1

  if( dice !==1){
      //add score
      RoundScore +=dice;
      temparray.push(dice);
    
      document.getElementById('current-'+ activePlayer).textContent=RoundScore;
      
  } else if(temparray.occurrence(6)==2){
    scores[activePlayer]=0;
    document.getElementById('current-'+ activePlayer).textContent=0;
    nextPlayer();
  }
  else{
   //next player
   nextPlayer();
  }
    }
});  

//btn hold

document.querySelector('.btn-hold').addEventListener('click',function(){
if(gamePlaying){
   // add current score to global score
   scores[activePlayer]+=RoundScore;
   //update the UI
   document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
   var winingNumber=document.getElementById('numbergame').value;
    // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
   if(winingNumber){
        var winscore=winingNumber;
   }else{
         winscore=100;
   }
   //check if the player win the game
   if(scores[activePlayer]>=winscore){
       document.getElementById('name-'+activePlayer).textContent='Winner!';
       document.querySelector('.dice').style.display='none';
       document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
       document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
       gamePlaying=false;
   }else{
       nextPlayer();
   }
}
 
});


function nextPlayer(){
    activePlayer===0 ? activePlayer=1:activePlayer=0;
    RoundScore=0;
    temparray=[0];
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    //toggle will add if not there, or remove if there.works as 2 lines below commented
    document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');

   document.querySelector('.dice').style.display="none"; 

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

}

document.querySelector('.btn-new').addEventListener('click',resetgame);


Array.prototype.occurrence = function(val) {
    return this.filter(e => e === val).length;
  }



function resetgame(){
scores=[0,0];
temparray=[];
RoundScore=0;
activePlayer=0;
gamePlaying=true;
document.querySelector('.dice').style.display='none'; //to hide the dice
document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';
document.getElementById('name-0').textContent='Player 1';
document.getElementById('name-1').textContent='Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
//we remove active class everywhere , then we add the active for one only
document.querySelector('.player-0-panel').classList.add('active');
}