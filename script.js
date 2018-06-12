let count = 0;
let compArr = [];
let moves = 0;
let seconds = 0;
let minutes = 0;

//reloads page to start new game
$('.replay').on('click', function(){
	window.location.reload();
});


//closes current window
$('.exit').on('click', function(){
	window.close();
});


//raises greeting screen and starts timer by adding class notMatched to all cards
$('.start').on('click', function(){
	$('.card').addClass('notMatched');
	$('.intro').css('margin-bottom', '100%');
});

window.setInterval(function timer() {
	if ($('.card').hasClass('notMatched')){
		 if (seconds < 59) {
			seconds += 1;
		} else if (seconds === 59) {
			seconds = 0;
			minutes += 1;
		};
		if (seconds < 10) {
		  if (minutes < 10) {
				document.getElementById('timer').innerHTML = '0' + minutes + ':0' + seconds;
			} else {
			  document.getElementById('timer').innerHTML = minutes + ':0' + seconds;
		 	};
			
		} else {
			if (minutes < 10) {
				document.getElementById('timer').innerHTML = '0' + minutes + ':' + seconds;
			} else {
				document.getElementById('timer').innerHTML = minutes + ':' + seconds;
			};
		}
	} 
}, 1000);

//give score based on number of moves
function score() {
	if (moves <= 12) {
		//3 stars
		$('.star1').addClass('fa-star');
		$('.star2').addClass('fa-star');
		$('.star3').addClass('fa-star');
	} else if (moves > 12 && moves <= 14) {
		//2 and a half stars
		$('.star1').addClass('fa-star');
		$('.star2').addClass('fa-star');
		$('.star3').addClass('fa-star-half');
	} else if (moves > 14 && moves <= 16) {
		//2 stars
		$('.star1').addClass('fa-star');
		$('.star2').addClass('fa-star');
	} else if (moves > 16 && moves <= 18) {
		//1 and a half stars
		$('.star1').addClass('fa-star');
		$('.star2').addClass('fa-star-half');
	} else if (moves > 18 && moves <= 20) {
		//1 star
		$('.star1').addClass('fa-star');
	} else {
		//1 star
		$('.star1').addClass('fa-star-half');
	}
}


console.log('compArr begin ' + compArr);
$('.card').click(function(e){
		let selector = this.childNodes[1].childNodes[1].childNodes[1].className;
																
	
		if (typeof compArr[0] === undefined) {
			compArr = [];
		} else if (typeof compArr[1] === undefined) {
			compArr.pop();
		} else if (compArr.length === 2) {
			$('.card').removeClass('card1');
			$('.card').removeClass('card2');
			$('.card').removeAttr('id', 'card1');
			$('.card').removeAttr('id', 'card2');
			$('.test').removeClass('frontFlipped');
			$('.test').removeClass('backFlipped');
			$('.test').removeClass('flipped');
			$('.card').removeClass('test');
			compArr = [];
			compArr.push(selector);
		} else {
			compArr.push(selector);
		};
	
  //function for flipping the cards by adding or removing a class
	 if ($(this).hasClass('test')) {
		compArr = [];
		compArr.push(selector);
	  console.log(compArr);
//		$(this).removeAttr('id','card1');
	} else if ($(this).hasClass('match')) {
		compArr.pop();
	  console.log(compArr);
		$(this).removeAttr('id','card1');
	} else if (!$('.card').hasClass('card1')) {
		//check for the card1 class if not there add card1 class and ID
		$(this).addClass('frontFlipped');
		$(this).addClass('backFlipped');
		$(this).addClass('flipped');
		$(this).addClass('test');
		$(this).attr('id','card1');
		$(this).addClass('card1');
	} else if ($('#card1').hasClass('card1')) {
		//check for the card1 class if not there add card2 class and ID
		$(this).addClass('frontFlipped');
		$(this).addClass('backFlipped');
		$(this).addClass('flipped');
		$(this).addClass('test');
		$(this).attr('id','card2');
		$(this).addClass('card2');
		moves = moves + 1;
		console.log('moves ' + moves);
	};	
	
	
	setTimeout(function(){
		test();
	}, 500);
});


function test() {
	
		//grab classes from div to compare to see if they match
		//check to see is class from card 1 = class from card 2
		if ((compArr[0] === compArr[1]) == true){
			$('.test').removeClass('notMatched');
			$('.test').addClass('match');
			console.log('These cards Match!');
			console.log('Match! ' + compArr);
			compArr = [];
			$('.card').removeClass('test');
			$('.card').removeClass('card1');
			$('.card').removeClass('card2');
			$('.card').removeAttr('id', 'card1');
			$('.card').removeAttr('id', 'card2');

			if (!$('.card').hasClass('notMatched')) {
				//if all cards are matched show outro
				$('.hidden').css('margin-bottom', '0%');
				score();
			} else {
				//if all cards are not matched do not show outro
				$('.hidden').css('margin-bottom', '100%');
			}
		};
		
	
		counter();
			
}


//count the number of moves made and resets compArr and count after 2	
function counter() {
	if (count == 1 && $('.card').hasClass('card2') ){
		count = count + 1;
		console.log('count ' + count);
		console.log('compArr ' + compArr);
		console.log('adding second to count');
		reset();		
	} else if (count == 0) {
		count = count + 1;
		console.log('adding first to count');
		console.log('count ' + count);
		console.log('compArr ' + compArr);
	} else if (count == 1 && $('.card').hasClass('card2') ){
		count = count + 1;
		console.log('count ' + count);
		console.log('compArr ' + compArr);
		console.log('adding second to count');
		
	} else if (count == 0) {
		count = count + 1;
		console.log('adding first to count');
		console.log('count ' + count);
		console.log('compArr ' + compArr);
	} else if (count > 1 && ((compArr[0] === compArr[1]) == false)) {
			
			//if not a match remove flip classes reset count and compArr
			count = 0;
			console.log('no match')
			compArr = [];
		
			$('.card').removeClass('card1');
			$('.card').removeClass('card2');
			$('.card').removeAttr('id', 'card1');
			$('.card').removeAttr('id', 'card2');
			$('.test').removeClass('frontFlipped');
			$('.test').removeClass('backFlipped');
			$('.test').removeClass('flipped');
			$('.card').removeClass('test');
			
	}	
}


function reset(){
	if (count == 2 && ((compArr[0] === compArr[1]) == false)) {
			
	//if not a match remove flip classes reset count and compArr

	console.log('reset count ' + count);
	count = 0;
	console.log('no match')
	console.log('compArr reset by count ' + compArr);
	compArr = [];
	console.log('compArr ' + compArr);
		
	$('.card').removeClass('card1');
	$('.card').removeClass('card2');
	$('.card').removeAttr('id', 'card1');
	$('.card').removeAttr('id', 'card2');
	$('.test').removeClass('frontFlipped');
	$('.test').removeClass('backFlipped');
	$('.test').removeClass('flipped');
	$('.card').removeClass('test');
	}
}


$(document).ready(function(){
	
//function to shuffle the classes and add classes to back of cards

	function shuffle(classArr) {
		
		//array of font awesome classes to be used for icons
			var classArr = ['fas fa-leaf', 'fas fa-dove', 'fas fa-umbrella', 'fas fa-lightbulb', 'fas fa-umbrella', 'fas fa-sun', 'fas fa-tree', 'fas fa-leaf', 'fas fa-lightbulb', 'fas fa-hourglass', 'fas fa-chess-knight', 'fas fa-tree', 'fas fa-hourglass', 'fas fa-dove', 'fas fa-chess-knight', 'fas fa-sun'];
		
			//Fisher-Yates shuffle function
			var j, x, i;
			for (i = classArr.length - 1; i > 0; i--) {
					j = Math.floor(Math.random() * (i + 1));
					x = classArr[i];
					classArr[i] = classArr[j];
					classArr[j] = x;
		};
		
		$('.icon').each(function(index, element) {
			$(element).addClass(classArr[index % classArr.length]);
		});
	}

	shuffle();

});




