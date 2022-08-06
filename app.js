const userBday = document.querySelector('#user-bday')
const checkBtn = document.querySelector('#check-btn')
const showResult = document.querySelector('#show-result')


const getReverseStr = (str) => {
    return str.split('').reverse().join('')
}

const checkStrPalindrome = (str) => {
    const reverseStr = getReverseStr(str)
    return str === reverseStr
}


const getDateStr = (date) => {
    const strDate = {
        day: '',
        month: '',
        year: ''
    }

    strDate.day = date.day < 10 ? '0' + date.day : date.day.toString()
    strDate.month = date.month < 10 ? '0' + date.month : date.month.toString()
    strDate.year = date.year.toString()

    return strDate;
}


const getAllDateFormats = (dateObj) => {
    const date = getDateStr(dateObj)

    const ddmmyyyy = date.day + date.month + date.year
    const mmddyyyy = date.month + date.day + date.year
    const yyyymmdd = date.year + date.month + date.day
    const ddmmyy = date.day + date.month + date.year.slice(-2)
    const mmddyy = date.month + date.day + date.year.slice(-2)
    const yymmdd = date.year.slice(-2) + date.month + date.day

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}


const checkAllDateFormatPalindrome = (dateObj) => {
    const allDateFormats = getAllDateFormats(dateObj)
    let flag = false;

    for(i=0; i<allDateFormats.length ; i++){
        if(checkStrPalindrome(allDateFormats[i])){
            flag = true
            break
        }
    }

    return flag
}

const isLeapYear = (year) => {
    if(year % 400 === 0){
        return true
    }

    if(year % 100 === 0){
        return false
    }
    if(year % 4 === 0){
        return true
    }

    return false;
}

const getNextDate = (date) => {

    let day = date.day+1
    let month =  date.month
    let year = date.year

    const daysInMonth = [31,28,30,31,30,31,30,31,30,31,30,31]

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1
                month++
            }
        }else{
            if(day > 28){
                day = 1
                month++
            }
        }
    }else{
        if(day > daysInMonth[month - 1]){
            day = 1
            month++
        }
    }

    if(month > 12){
        month = 1
        year++
    }

    return {
        day,
        month,
        year
    }

}

const getNextPalindrome = (date) => {
    let nextDate = getNextDate(date)
    let count = 0;
    
    while(1) {
        count++
        if(checkAllDateFormatPalindrome(nextDate)){
            break;
        }
        nextDate = getNextDate(nextDate)
    }

    return [count, nextDate]
}

const handleShowResult = (value, color) => {
    showResult.style.display = 'block'
    showResult.style.backgroundColor = color
    showResult.innerText = value
}

const handleClick = () => {
    showResult.style.display = 'none'
    const userBdayList = userBday.value.split('-')
    
    const userBdayObj = {
        day: Number(userBdayList[2]),
        month: Number(userBdayList[1]),
        year: Number(userBdayList[0])
    }

    const isPalindrome = checkAllDateFormatPalindrome(userBdayObj)
    
    if(isPalindrome){
        handleShowResult(`Yayyy!! Your Birthday Is A Palindrome...`, 'green')
    }else{
        const [count,nextPalindrome] = getNextPalindrome(userBdayObj)

        handleShowResult(`Oops! Your Birthday is not a palindrome. You Missed by ${count} days. The next palindrome date - ${nextPalindrome.day}:${nextPalindrome.month}:${nextPalindrome.year}`, 'red')
    }
}


checkBtn.addEventListener('click', handleClick)


