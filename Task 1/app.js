//get user input amount
let amount = Number(prompt("Enter your amount"));
//get user favourtie input note
let userChoice =Number(prompt("Enter your favourtie Notes"))
//note range
let notes = [500, 100, 50, 20, 10, 5, 1];
let obj = { 500: 0, 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 1: 0, }
//counting notes
let count = Math.floor(amount / userChoice)

// function for counting notes
function notesCount(x) {
    a = x * userChoice
    notes = notes.filter(element => element != userChoice)
    amount = amount - a
    for (let i = 0; i < notes.length; i++) {
        obj[notes[i]] = Math.floor(amount / notes[i]);
        amount = amount - obj[notes[i]] * notes[i];
    }
}

//funtion for displaying ans
function finalAnswer(x) {
    let val = JSON.stringify(x)
    // convert {} into ''
    let convertVal = val.replace(/[{}""]/g, '')
    let result = convertVal.replaceAll(',', '<br />')
    document.write(result)
}

//codition for check largest or smallest amount 
if (amount >= 100 && amount <= 100000) {
    if (count <= 200) {
        obj[userChoice] = b
        notesCount(b)
        finalAnswer(obj)
    }
    if (count > 200) {
        let pre = 200
        obj[userChoice] = 200
        notesCount(200)
        // exception case for note 1 if there in any remaining balance 
        if (amount <= 4 && amount > 0) {
            let bal = 5 - amount
            obj[1] = pre - bal
            if (obj[5] == 0) {
                obj[5]++
            } else {
                obj[5] = 0
                obj[10]++
            }
        }
        finalAnswer(obj)
    }
}else{
    alert('Please give amount between 100 and 100000')
}