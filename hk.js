
const puppeteer = require("puppeteer")
const codeObj = require('./answer')
const url = "https://www.hackerrank.com/auth/login"
const email = 'kokoxe3239@shackvine.com'
const password = 'ayush123'
let page;
let browserOpen = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})
browserOpen.then(function (browserObj) {
    let newPagePromise = browserObj.newPage()   //to get new tab
    return newPagePromise
}).then(function (newTab) {
    page = newTab   //so that we can use it on other pages
    let gotoPromise = newTab.goto(url)
    return gotoPromise
}).then(function () {
    let emailEntered = page.type("input[id='input-1']", email)  //email selector
    return emailEntered
}).then(function () {
    let passwordEntered = page.type("input[id='input-2']", password)    //password selector
    return passwordEntered
}).then(function () {
    let buttonClickedPromise = page.click('button[data-analytics="LoginPassword')   //button selector
    return buttonClickedPromise
}).then(function () {
    let algoClicked = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)  //wait for element to appear ,then click
    return algoClicked
}).then(function () {
    let waitFor3Sec = page.waitFor(3000)
    return waitFor3Sec
}).then(function () {
    let getToWarmpUp = waitAndClick('input[value="warmup"]', page)
    return getToWarmpUp
}).then(function () {
    let waitFor3Sec = page.waitFor(3000)
    return waitFor3Sec
}).then(function () {
    let allChallenge = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled') //return question Array,$$=>querySelectorAll
    return allChallenge
}).then(function (quesArr) {    //object by allChallenge promise
    console.log("question are", quesArr.length) //to get number of question
    //sending page,question and answer,which is in answer array to be solved to this function
    let questionWillBeSolved = questionSolver(page, quesArr[0], codeObj.answers[0])
    return questionWillBeSolved
})


function waitAndClick(selector, cpage) {
    let p = new Promise(function (resolve, reject) {
        let waitForElement = cpage.waitForSelector(selector)
        waitForElement.then(function () {
            let clickElement = cpage.click(selector)
            return clickElement
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
    return p
}
function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionClicked = question.click()
        questionClicked.then(function () {
            let editorFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs", page)//we need to go to its text area
            return editorFocusPromise
        }).then(function () {
            //since we will write our code on checkbox,default editor will close brackets on its own
            return waitAndClick(".checkbox-input", page)
        }).then(function () {
            //wait for text area
            return page.waitForSelector("textarea.custominput")
        }).then(function () {
            //answer will be typed in text area,now we have to cut and paste 
            return page.type("textarea.custominput", answer)
        }).then(function () {
            let ctrlPressed = page.keyboard.down('Control')
            return ctrlPressed
        }).then(function () {
            let aPressed = page.keyboard.press('A')
            return aPressed
        }).then(function () {
            let xPressed = page.keyboard.down('X')
            return xPressed
        }).then(function () {
            let ctrlUnpressed = page.keyboard.up('Control')
            return ctrlUnpressed
        }).then(function () {
            let mainEditorFocus = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return mainEditorFocus
        }).then(function () {
            let ctrlPressed = page.keyboard.down('Control')
            return ctrlPressed
        }).then(function () {
            let aPressed = page.keyboard.press('A')
            return aPressed
        }).then(function () {
            let vPressed = page.keyboard.press('V')
            return vPressed
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}








