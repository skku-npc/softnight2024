function changepg(str1, str2) {
    document.getElementById(str1).style.display = "none";
    document.getElementById(str2).style.display = "block";
}
function showpg(str) {
    document.getElementById(str).style.display = "block";
}

function goToReadyFactor() {changepg("main", "ready_factor");}
function goToReadyBinDec() {changepg("main", "ready_bindec");}
function goToReadyOperation() {changepg("main", "ready_operation");}
let st = 0;
let answer = "";

function goToFactor() {
    changepg("ready_factor", "factor");
    showpg("scoreboard");
}
function goToBinDec() {
    changepg("ready_bindec", "bindec");
    showpg("scoreboard");
}
function goToOperation() {
    changepg("ready_operation", "operation");
    showpg("scoreboard");
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateScore(playerId, delta) {
    const scoreElement = document.getElementById(playerId);
    let score = parseInt(scoreElement.textContent);
    scoreElement.textContent = score + delta;
}

// Methods for Prime Factor game
function updateRandomFactorNum() {
    if (st == 0) {
        const randomNum = getRandomNumber(80, 255);
        document.getElementById("factorNum").textContent = randomNum;

        const factors = primeFactors(randomNum);
        console.log(`Answer: ${factors.join(' x ')}`);
        answer = factors.join('x');
        st++;
    }
    else {
        document.getElementById("factorNum").textContent = "A: " + answer;
        st--;
    }
}
function primeFactors(n) {
    const factors = [];
    while (n % 2 === 0) {
        factors.push(2);
        n /= 2;
    }
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n /= i;
        }
    }
    if (n > 2) {
        factors.push(n);
    }
    return factors;
}


// Methods for Binary-Decimal game
function decToBin(num) {
    const binaryString = num.toString(2).padStart(7, '0');
    return "(" + binaryString + ")2";
}

function updateRandomBinDecNum() {
    let binIsProb = getRandomNumber(0, 1);
    if (st == 0) {
        let num = getRandomNumber(16, 127);
        let binStr = decToBin(num);
        if (binIsProb == 1) {
            document.getElementById("bindecNum").textContent = "Q: " + binStr;
            answer = num;
            console.log(`Answer: ${answer}`);
        }
        else {
            document.getElementById("bindecNum").textContent = "Q: " + num;
            answer = binStr;
            console.log(`Answer: ${answer}`);
        }
        st++;
    }
    else {
        document.getElementById("bindecNum").textContent = "A: " + answer;
        st--;
    }
}

// Methods for Operation game
function generateQuestionStr(nums, answer, isBit) {
    let str = "";
    let optionStr = (isBit ? " (AND, OR, XOR)" : " (+, -, x)");
    for (let i = 0; i < nums.length; i++) {
        str = str + nums[i].toString();
        if (i != nums.length-1) str = str + " _ ";
    }
    str = str + " = " + answer.toString() + optionStr;
    return str;
}

function getAnswer(nums, ops) {
    let ans = nums[0];
    if (ops[1] == 'x') {
        if (ops[0] == 'x') {
            return nums[0]*nums[1]*nums[2];
        }
        else if (ops[0] == '+') {
            return nums[1]*nums[2]+nums[0];
        }
        else {
            return nums[0]-(nums[1]*nums[2]);
        }
    }
    for (let i = 0; i < 2; i++) {
        if (ops[i]=='&') ans=ans&nums[i+1];
        if (ops[i]=='|') ans=ans|nums[i+1];
        if (ops[i]=='^') ans=ans^nums[i+1];
        if (ops[i]=='+') ans=ans+nums[i+1];
        if (ops[i]=='-') ans=ans-nums[i+1];
        if (ops[i]=='x') ans=ans*nums[i+1];
    }
    return ans;
}

function updateOperationNum() {
    if (st == 0) {
        let isBit = getRandomNumber(0, 1);
        let nums = [];
        let ops = [];
        for (let i = 0; i < 3; i++) {
            if (isBit) nums.push(getRandomNumber(0,15));
            else nums.push(getRandomNumber(0,49));
        }
        
        for (let i = 0; i < 2; i++) {
            let op = getRandomNumber(0, 2);
            if (isBit) {
                if (op==0) ops.push('&');
                if (op==1) ops.push('|');
                if (op==2) ops.push('^');
            }
            else {
                if (op==0) ops.push('+');
                if (op==1) ops.push('-');
                if (op==2) ops.push('x');
            }
        }

        let ansofquestion = getAnswer(nums,ops);
        answer = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cops = [];
                if (isBit) {
                    if (i==0) cops.push('&');
                    if (i==1) cops.push('|');
                    if (i==2) cops.push('^');
                }
                else {
                    if (i==0) cops.push('+');
                    if (i==1) cops.push('-');
                    if (i==2) cops.push('x');
                }
                if (isBit) {
                    if (j==0) cops.push('&');
                    if (j==1) cops.push('|');
                    if (j==2) cops.push('^');
                }
                else {
                    if (j==0) cops.push('+');
                    if (j==1) cops.push('-');
                    if (j==2) cops.push('x');
                }
                if (ansofquestion == getAnswer(nums, cops)) {
                    answer = answer + '(' + cops[0] + ', ' + cops[1] + ') ';
                }
            }
        }
        document.getElementById("operationNum").textContent = generateQuestionStr(nums, ansofquestion, isBit);
        console.log(`Answer: ${answer}`);
        st++;
    }
    else {
        document.getElementById("operationNum").textContent = "A: " + answer;
        st--;
    }
}
