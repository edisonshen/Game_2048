var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
});

function newgame(){
    //inital the board
    alert("please start");
    init();
    //generate two random number from 2 to 8196
    generateNumber();
    generateNumber();
}

function init(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#cell_'+i+"_"+j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }

    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
        }
    }

    updateBoardView();
}

function updateBoardView(){

    $(".number_cell").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append( '<div class="number_cell" id="number_cell_'+i+'_'+j+'"></div>' );
            var theNumberCell = $('#number_cell_'+i+'_'+j);

            if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + 50 );
                theNumberCell.css('left',getPosLeft(i,j) + 50 );
            }
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }
        }
}

function generateNumber(){

    if( nonSpace( board ) )
        return false;

    //random position
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

    while( true ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );
    }

    //random number
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //display the random number in the random position 
    board[randx][randy] = randNumber;
    showNumberAnimation( randx , randy , randNumber );

    return true;
}



$(document).keydown(function  (event) {
	switch (event.keyCode)
	{
		case 37:// left
			if ( moveLeft() ){
				generateNumber();
				isGameOver();
			}
			break;

		case 38: // up
			if ( moveUp() ){
				generateNumber();
				isGameOver();
				}
			break;

		case 39: // right
			if ( moveRight() ){
				generateNumber();
				isGameOver();
			}
			break;

		case 40:
			if ( moveDown() ){
				generateNumber();
				isGameOver();
			}
			break;

		default:
			break;
	}
})


function moveLeft () {
	if (!canMoveLeft(board))
		return false;

	for(var i =0; i < 4 ; i++)
	{
		for (var j = 1; j<4; j++)
		{
			if(board[i][j] != 0)
				for (var k = 0; k < j ; k ++)
				{
					if (board[i][k] == 0 && noBlockH(i, k , j , board))
					{
						showMoveAnimation(i, j ,i, k);
						board[i][k] = board [i][j];
						board[i][j] =0;
						continue;
					}else if (board[i][k] == board[i][j] && noBlockH(i,k,j,board))
					{
						showMoveAnimation(i, j , i ,k);
						board[i][k] += board [i][j];
						board[i][j] =0 ;
						continue;
					}
				}
		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}


function moveRight () {
	if (!canMoveRight(board))
		return false;

	for(var i =0; i < 4 ; i++)
	{
		for (var j = 3; j >= 0; j --)
		{
			if(board[i][j] != 0)
				for (var k = 2; k > j ; k --)
				{
					if (board[i][k] == 0 && noBlockH(i, j , k , board))
					{
						showMoveAnimation(i, j ,i, k);
						board[i][k] = board [i][j];
						board[i][j] =0;
						continue;
					}else if (board[i][k] == board[i][j] && noBlockH(i, j, k,board))
					{
						showMoveAnimation(i, j , i ,k);
						board[i][k] += board [i][j];
						board[i][j] =0 ;
						continue;
					}
				}
		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}

function moveDown () {
	if (!canMoveDown(board))
		return false;

	for(var j = 0; j < 4 ; j++)
	{
		for (var  i= 2; i >=0; i--)
		{
			if(board[i][j] != 0)
			{
				// k is the target Y
				for (var k = 3 ; k > i; k--)
				{
					if ( board[k][j] == 0 && noBlockV(j, i , k , board) )
					{
						showMoveAnimation(i, j ,k, j);
						board[k][j] = board [i][j];
						board[i][j] = 0 ;
						continue;
					}
					else if (board[k][j] == board[i][j] && noBlockV(j, i , k, board))
					{
						showMoveAnimation(i, j , k ,j);
						board[k][j] += board [i][j];
						board[i][j] = 0 ;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}

function moveUp () {
	if (!canMoveUp(board))
		return false;

	for(var j = 0; j < 4 ; j++)
	{
		for (var  i= 1; i < 4; i++)
		{
			if(board[i][j] != 0)
			{
				// k is the target Y
				for (var k = 0 ; k < i; k++)
				{
					if ( board[k][j] == 0 && noBlockV(j, i , k , board) )
					{
						showMoveAnimation(i, j ,k, j);
						board[k][j] = board [i][j];
						board[i][j] = 0 ;
						continue;
					}
					else if (board[k][j] == board[i][j] && noBlockV(j, i , k, board))
					{
						showMoveAnimation(i, j , k ,j);
						board[k][j] += board [i][j];
						board[i][j] = 0 ;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}


function isGameOver(){
	if ( nonSpace() && noMove())
		gameover();
}

function gameover() {
	alert("你反正是二伯五扣");
}















































