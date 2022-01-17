//Add ques and answer data (radio,input)
let radioQuesAnswer = []
let InptQues = []
let userInfoArr=[]
//firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBCBf46aNzt6SemP5m4zwv7oihfERIkBQI',
  authDomain: 'covid-19-survey-a24b9.firebaseapp.com',
  projectId: 'covid-19-survey-a24b9',
  storageBucket: 'covid-19-survey-a24b9.appspot.com',
  messagingSenderId: '833565543069',
  appId: '1:833565543069:web:d69f04af7bca1122712274',
  measurementId: 'G-HB97QZ4G9K',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const firestore = firebase.firestore()
//get Admin information using signup form
// Signup function
var user
const getSignupData = () => {
  let SignupEmail = document.getElementById('SignupEmail').value
  let SignupPsw = document.getElementById('SignupPsw').value

  //authentication using firebase
  firebase
    .auth()
    .createUserWithEmailAndPassword(SignupEmail, SignupPsw)
    .then((userCredential) => {
      user = userCredential.user
      location.href = './login.html'
    })
    .catch((error) => {
      const errorMessage = error.message
      alert(errorMessage)
    })
}
//login function
const getLoginData = () => {
  const LoginEmail = document.getElementById('LoginEmail').value
  const LoginPsw = document.getElementById('LoginPsw').value

  firebase
    .auth()
    .signInWithEmailAndPassword(LoginEmail, LoginPsw)
    .then((userCredential) => {
      // user = userCredential.user
      location.href = './home.html'
      localStorage.setItem('CurrentAdmin', LoginEmail)
      console.log('succesfully Login')
    })
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      alert(errorMessage)
    })
}

//logout function
const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      location.href = './login.html'
    })
}

//create Radio button dynamically
const createRadioButton = () => {
  // hide createRadioButton button after onclick
  document.getElementById('createRadioButton').style.display = 'none'
  //input field
  let input = document.createElement('input')
  input.type = 'text'
  input.id = 'radioQues'
  input.placeholder = 'Enter Question'

  // radio 1
  let radiobox1 = document.createElement('input')
  radiobox1.type = 'radio'
  radiobox1.name = 'radioBtn'
  radiobox1.id = 'radioBtnT'
  radiobox1.value = 'True'
  radiobox1.style.marginLeft = '10px'
  // radio 2
  let radiobox2 = document.createElement('input')
  radiobox2.type = 'radio'
  radiobox2.name = 'radioBtn'
  radiobox2.id = 'radioBtnF'
  radiobox2.value = 'False'
  radiobox2.style.marginLeft = '10px'

  // save data btn
  let button = document.createElement('button')
  button.type = 'button'
  button.innerHTML = 'Save Question'
  button.className = 'btn btn-outline-success'
  button.style.marginLeft = '10px'
  button.style.width = '12%'
  button.onclick = () => {
    let radioQues = document.getElementById('radioQues')
    let radioBtnT = document.getElementById('radioBtnT')
    let radioBtnF = document.getElementById('radioBtnF')
    let radioBtnValue

    if (radioBtnT.checked) {
      radioBtnValue = radioBtnT.value
    } else {
      radioBtnValue = radioBtnF.value
    }
    radioQuesAnswer.push({
      radioQues: radioQues.value,
      radioBtnValue: radioBtnValue,
      radioOption1: 'true',
      radioOption2: 'false',
    })
    setRadioData()
    console.log(radioQuesAnswer)
    // clear field
    radioQues.value = ''
    radioBtnValue.checked = ''

    //create paragraph to show ques/answer is saved
    let paragraph = document.createElement('p')
    paragraph.innerHTML = '<b>submitted</b>'
    paragraph.style.marginLeft = '10px'
    paragraph.style.width = '12%'
    container.appendChild(paragraph)
  }
  let container = document.getElementById('Radiocontainer')
  // appending input field
  container.appendChild(input)
  // appending radio
  container.appendChild(document.createElement('br'))
  container.appendChild(radiobox1)
  container.appendChild(document.createTextNode('True'))
  container.appendChild(document.createElement('br'))
  container.appendChild(radiobox2)
  container.appendChild(document.createTextNode('False'))
  container.appendChild(document.createElement('br'))
  // container.appendChild(textArea)
  // container.appendChild(document.createElement('br'))
  container.appendChild(button)
  container.appendChild(document.createElement('br'))
}

// Create Input button
const createInputButton = () => {
  // hide createRadioButton button after onclick
  document.getElementById('createInputButton').style.display = 'none'
  //input field
  let SimpleInput = document.createElement('input')
  SimpleInput.type = 'text'
  SimpleInput.id = 'SimpleInput'
  SimpleInput.placeholder = 'Enter your Question'
  //save input value btn
  let inputButton = document.createElement('button')
  inputButton.type = 'button'
  inputButton.innerHTML = 'Save Question'
  inputButton.className = 'btn btn-outline-success'
  inputButton.style.marginLeft = '50%'
  inputButton.style.width = '12%'
  inputButton.style.marginTop = '5px'
  inputButton.onclick = () => {
    let inputQuesValue = document.getElementById('SimpleInput')
    //push data in array
    InptQues.push({
      ques: inputQuesValue.value,
    })
    setInputData()
    console.log(InptQues)
    inputQuesValue.value = ''
    //create paragraph to show ques is saved
    let paragraphInput = document.createElement('p')
    paragraphInput.innerHTML = '<b>submitted</b>'
    paragraphInput.style.marginLeft = '10px'
    paragraphInput.style.width = '12%'
    inputContainer.appendChild(paragraphInput)
  }
  //append input field
  let inputContainer = document.getElementById('inputContainer')
  inputContainer.appendChild(SimpleInput)
  inputContainer.appendChild(document.createElement('br'))
  inputContainer.appendChild(inputButton)
}

//function to set radio data in firestore
function setRadioData() {
  firestore
    .collection('radioQuesAnswer')
    .doc('radioQuesAnswer')
    .set({ radioQuesAnswer })
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch((error) => {
      alert('Error writing document: ', error)
    })
}

//function to set input data in firestore
function setInputData() {
  firestore
    .collection('InptQues')
    .doc('InptQues')
    .set({ InptQues })
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch((error) => {
      alert('Error writing document: ', error)
    })
}

//show all data on survey page
const startSurvey=()=>{
    getRadioData()
    getInputData()
    document.getElementById('startSurveyid').style.display = 'none';
    let submitFormBtn=document.createElement('button')
    submitFormBtn.type = 'button'
    submitFormBtn.innerHTML = 'Submit'
    submitFormBtn.className = 'btn btn-outline-success !important'
    submitFormBtn.onclick=getUserInfo()
    let renderSubmitBtn=document.getElementById('renderSubmitBtn')
    renderSubmitBtn.appendChild(submitFormBtn)
}
// get radio ques/ans data firestore
function getRadioData() {
  firestore
    .collection('radioQuesAnswer')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        var Alldata = doc.data().radioQuesAnswer

        var mapTogetdata = Alldata.map((data, index) => {
          let para = document.createElement('p')
          para.innerHTML = `Q:${index+1} ${data.radioQues}`
          let renderRadioData = document.getElementById('renderRadioData')
          //radio 1 box for user selection
          let radioboxUser1 = document.createElement('input')
          radioboxUser1.type = 'radio'
          radioboxUser1.name = 'radioBtn'
          radioboxUser1.id = 'radioBtnT ${index}'
          radioboxUser1.value = 'True'
          //radio 2 box for user selection
          let radioboxUser2 = document.createElement('input')
          radioboxUser2.type = 'radio'
          radioboxUser2.name = 'radioBtn'
          radioboxUser2.id = `radioBtnF ${index}`
          radioboxUser2.value = 'False'
          //text area for comment
          let textArea = document.createElement('textarea')
          textArea.id = 'comment'
          renderRadioData.appendChild(para)
          renderRadioData.appendChild(radioboxUser1)
          renderRadioData.appendChild(document.createTextNode('True'))
          renderRadioData.appendChild(document.createElement('br'))
          renderRadioData.appendChild(radioboxUser2)
          renderRadioData.appendChild(document.createTextNode('False'))
          renderRadioData.appendChild(document.createElement('br'))
          renderRadioData.appendChild(textArea)
        })
      })
    })
}
// get input data firestore
function getInputData() {
    firestore
      .collection('InptQues')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          var Alldata1= doc.data().InptQues
          var mapTogetdata1 = Alldata1.map((data1, index) => {
            let para1 = document.createElement('p')
            para1.innerHTML = `Q:${index+1} ${data1.ques}`
            let renderInputData = document.getElementById('renderInputData')
            //text area for comment
            let textArea2 = document.createElement('textarea')
            textArea2.id = 'comment'
            renderInputData.appendChild(para1)
            renderInputData.appendChild(document.createElement('br'))
            renderInputData.appendChild(textArea2)
          })
        })
      })
  }
  
  // get all user data
  const getUserInfo=()=>{
    let email=document.getElementById("email").value;
    let name=document.getElementById("name").value;
    userInfoArr.push({
      name,email
    })
    //set in firestore
    firestore
    .collection('UserInfo')
    .doc('UserInfo')
    .set({ userInfoArr })
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch((error) => {
      alert('Error writing document: ', error)
    })
  }