function getBowlingScore(bowlingCode){
	var extraIndex = bowlingCode.indexOf("||");//返回||在字符串中首次出现的位置
	var	extra1 = parseInt(judgeNum(bowlingCode.substring(extraIndex+2,extraIndex+3)));//额外第一球机会的击倒球数
	var extra2 = parseInt(judgeNum(bowlingCode.substring(extraIndex+3)));//额外第二球的击倒球数
	var bowling = bowlingCode.substring(0,extraIndex);//前10次的情况
	var bowlingArr = bowling.split('|');//将前10次的情况保存在数组中
	var i = [];
	var temp = [];
	for(var i=0;i<bowlingArr.length;i++){
		temp[i] = [];
		for(var j=0;j<2;j++){
			temp[i][j] = parseInt(judgeNum(bowlingArr[i][j]));//将前10次情况转换为数值成绩
		}
	}
	bowlingArr = temp; 
	var scores = [0,0,0,0,0,0,0,0,0,0];//每局的得分
	var totalScore = 0;//总成绩
	var firstHit = true;//是否第一次击球
	for(var i=0;i<bowlingArr.length;i++){
		if(bowlingArr[i][1] == -1){
			bowlingArr[i][1] = 10 - bowlingArr[i][0]; //如果第二次补中，将/转换为对应成绩
		}
		firstHit = bowlingArr[i][0]; //每局第一次击中成绩
		if(firstHit < 10){ //如果第一局全中，该局结束
			secondHit = bowlingArr[i][1];//每局第二次击中成绩
		}
		if(i == bowlingArr.length-1){
			if(firstHit == 10 || firstHit+secondHit == 10){
				// print("额外加第一球: ");
				// print(extra1);
			}
			if(firstHit == 10){
				// print("额外加第二球：");
				// print(extra2);
			}
		}
	}
	calcScore();//计算成绩
	function calcScore(){
		for(var i=0;i<bowlingArr.length-1;i++){//第1格到第9格
			if(bowlingArr[i][0] == 10){//strike 第一次就全中
				scores[i] += 10;
				if(bowlingArr[i+1][0] == 10){
					scores[i] += 10;
					if(i < 8){
						scores[i] += bowlingArr[i+2][0];
					}else{
						scores[i] += extra1; 
					}
				}else{
					scores[i] += bowlingArr[i+1][0] + bowlingArr[i+1][1];
				}
			}
			else if(bowlingArr[i][0] + bowlingArr[i][1] == 10){//spare 第二次全中 补中
				scores[i] += 10;
				scores[i] += bowlingArr[i+1][0];
			}else{
				scores[i] += bowlingArr[i][0] + bowlingArr[i][1];
			}
		}

		//最后一次成绩
		if(bowlingArr[9][0] == 10){
			scores[9] += 10;
			scores[9] += extra1 + extra2;
		}
		else if(bowlingArr[9][0] + bowlingArr[9][1] == 10){
			scores[9] += 10;
			scores[9] += extra1;
		}
		else{
			scores[9] += bowlingArr[9][0] + bowlingArr[9][1];
		}

	}

	function getTotalScore(){ //总成绩
		for(var i=0;i<scores.length;i++){
			// print(i + '=' + scores[i]);//输出每局成绩
			totalScore += scores[i];
		}
		return totalScore;
	}
	return getTotalScore();
}

function judgeNum(num){ //判断各种情况
	switch(num){
		case "X":
			return 10;
		case '/':
			return -1;
		case '-':
			return 0;
		default:
			return num;
	}
}

// print(getBowlingScore("X|7/|9-|X|-8|8/|-6|X|X|X||81"));
