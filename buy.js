// ===============================
// KENGEN BUY PAGE
// ===============================

const questions = document.querySelectorAll(".question");

const progress = document.querySelector(".progress-bar");

const currentText = document.getElementById("currentQuestion");

const totalText = document.getElementById("totalQuestions");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const submitBtn = document.getElementById("submitBtn");

const form = document.getElementById("buyForm");

let current = 0;

totalText.textContent = questions.length;

updateWizard();

function updateWizard(){

questions.forEach((question,index)=>{

question.classList.toggle("active",index===current);

});

currentText.textContent=current+1;

progress.style.width=((current+1)/questions.length)*100+"%";

prevBtn.style.display=current===0?"none":"inline-flex";

if(current===questions.length-1){

nextBtn.style.display="none";

submitBtn.style.display="inline-flex";

}else{

nextBtn.style.display="inline-flex";

submitBtn.style.display="none";

}

window.scrollTo({

top:0,

behavior:"smooth"

});

}

function validateCurrent(){

const fields=questions[current].querySelectorAll("input,textarea,select");

for(const field of fields){

if(!field.required) continue;

if(field.type==="checkbox"){

if(!field.checked){

field.focus();

return false;

}

}

else{

if(field.value.trim()===""){

field.focus();

return false;

}

}

}

return true;

}

nextBtn.addEventListener("click",()=>{

if(!validateCurrent()){

alert("Please complete the required field.");

return;

}

current++;

updateWizard();

});

prevBtn.addEventListener("click",()=>{

if(current>0){

current--;

updateWizard();

}

});

form.addEventListener("submit",function(e){

e.preventDefault();

if(!validateCurrent()){

return;

}

/* EMAILJS WILL GO HERE */

alert("Thank you! Your order has been placed.");

});
// ======================================
// KENGEN BUY PAGE
// PART 2
// Premium UX + Validation
// ======================================

const STORAGE_KEY = "kengen-buy-form";

// -------------------------------
// Save Progress
// -------------------------------

function saveProgress(){

    const data = {};

    new FormData(form).forEach((value,key)=>{
        data[key]=value;
    });

    document
    .querySelectorAll('input[type="checkbox"]')
    .forEach(box=>{
        data[box.name || "agreement"]=box.checked;
    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

// -------------------------------
// Load Progress
// -------------------------------

function loadProgress(){

    const raw =
    localStorage.getItem(STORAGE_KEY);

    if(!raw) return;

    const data = JSON.parse(raw);

    form.querySelectorAll(
        "input,textarea,select"
    ).forEach(field=>{

        if(field.type==="checkbox"){

            field.checked =
            !!data[field.name || "agreement"];

        }

        else if(data[field.name]!==undefined){

            field.value=data[field.name];

        }

    });

}

loadProgress();

form.querySelectorAll(
"input,textarea,select"
).forEach(field=>{

field.addEventListener(
"input",
saveProgress
);

field.addEventListener(
"change",
saveProgress
);

});

// -------------------------------
// Better Validation
// -------------------------------

function showError(field,message){

field.style.borderColor="#ff5d5d";

field.animate([

{transform:"translateX(-6px)"},

{transform:"translateX(6px)"},

{transform:"translateX(-4px)"},

{transform:"translateX(0)"}

],{

duration:350

});

alert(message);

}

const oldValidate = validateCurrent;

validateCurrent = function(){

const fields=
questions[current]
.querySelectorAll(
"input,textarea,select"
);

for(const field of fields){

if(!field.required)
continue;

if(field.type==="checkbox"){

if(!field.checked){

showError(
field,
"Please accept before continuing."
);

return false;

}

continue;

}

if(field.value.trim()===""){

showError(
field,
"Please fill this field."
);

field.focus();

return false;

}

if(field.type==="email"){

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(field.value)){

showError(
field,
"Enter a valid email."
);

field.focus();

return false;

}

}

if(field.name==="phone"){

const phone=
field.value.replace(/\D/g,"");

if(phone.length<10){

showError(
field,
"Enter a valid mobile number."
);

field.focus();

return false;

}

}

if(field.name==="pincode"){

const pin=
field.value.replace(/\D/g,"");

if(pin.length!==6){

showError(
field,
"Enter a valid 6 digit pincode."
);

field.focus();

return false;

}

}

field.style.borderColor="#4ce77f";

}

return true;

};

// -------------------------------
// Enter Key Navigation
// -------------------------------

form.addEventListener("keydown",e=>{

if(e.key!=="Enter")
return;

const tag=e.target.tagName;

if(tag==="TEXTAREA")
return;

e.preventDefault();

if(current===questions.length-1){

submitBtn.click();

}

else{

nextBtn.click();

}

});

// -------------------------------
// Keyboard Arrows
// -------------------------------

window.addEventListener("keydown",e=>{

if(e.key==="ArrowRight"){

if(current<questions.length-1){

nextBtn.click();

}

}

if(e.key==="ArrowLeft"){

if(current>0){

prevBtn.click();

}

}

});

// -------------------------------
// Progress Percentage
// -------------------------------

const percentText=document.createElement("div");

percentText.style.marginTop="12px";

percentText.style.textAlign="center";

percentText.style.fontWeight="700";

percentText.style.fontSize="18px";

percentText.style.color="#bff8ff";

document
.querySelector(".progress")
.appendChild(percentText);

const originalUpdate=updateWizard;

updateWizard=function(){

originalUpdate();

const percent=Math.round(
((current+1)/questions.length)*100
);

percentText.textContent=
percent+"% Complete";

};

// refresh

updateWizard();

// -------------------------------
// Button Loading Animation
// -------------------------------

form.addEventListener("submit",function(){

submitBtn.disabled=true;

submitBtn.dataset.old=

submitBtn.innerHTML;

let dots=0;

const timer=setInterval(()=>{

dots++;

if(dots>3)
dots=1;

submitBtn.innerHTML=
"Submitting"+
".".repeat(dots);

},350);

setTimeout(()=>{

clearInterval(timer);

submitBtn.innerHTML=
submitBtn.dataset.old;

submitBtn.disabled=false;

},3000);

});

// -------------------------------
// Floating Bubbles
// -------------------------------

const bubbleContainer=
document.querySelector(".bubbles");

for(let i=0;i<35;i++){

const b=document.createElement("span");

const size=
10+
Math.random()*45;

b.style.width=size+"px";

b.style.height=size+"px";

b.style.left=
Math.random()*100+"%";

b.style.animationDuration=
8+
Math.random()*12+"s";

b.style.animationDelay=
Math.random()*10+"s";

bubbleContainer.appendChild(b);

}

// -------------------------------
// Auto Focus
// -------------------------------

const oldUpdate2=updateWizard;

updateWizard=function(){

oldUpdate2();

setTimeout(()=>{

const input=
questions[current]
.querySelector(
"input,textarea,select"
);

if(input){

input.focus();

}

},300);

};

// initialize again

updateWizard();
// =========================================
// KENGEN BUY PAGE
// PART 3
// EmailJS + Success Animation
// =========================================

// -------------------------
// EMAILJS CONFIG
// -------------------------

emailjs.init("ONdUe5OIMpDIyqoH4");

const EMAIL_SERVICE_ID = "service_uo17wnm";
const EMAIL_TEMPLATE_ID = "template_ty3bb7l";

let sending = false;

// -------------------------
// ORDER ID
// -------------------------

function generateOrderID(){

    const date = new Date();

    const random =
    Math.floor(
        1000 + Math.random()*9000
    );

    return "KW-" +
    date.getFullYear() +
    (date.getMonth()+1) +
    date.getDate() +
    "-" +
    random;

}

// -------------------------
// Success Popup
// -------------------------

function showSuccess(orderID){

    const popup=document.createElement("div");

    popup.innerHTML=`

    <div id="successBox">

        <div class="tick">

        ✓

        </div>

        <h2>

        Order Placed Successfully!

        </h2>

        <p>

        Order ID

        <br><br>

        <b>${orderID}</b>

        </p>

    </div>

    `;

    popup.style.position="fixed";
    popup.style.inset="0";
    popup.style.display="flex";
    popup.style.justifyContent="center";
    popup.style.alignItems="center";
    popup.style.background="rgba(0,25,60,.55)";
    popup.style.backdropFilter="blur(10px)";
    popup.style.zIndex="999999";

    popup.querySelector("#successBox").style.cssText=`

        width:420px;
        max-width:90%;
        background:white;
        color:#004a88;
        border-radius:28px;
        padding:45px;
        text-align:center;
        animation:pop .5s ease;

    `;

    popup.querySelector(".tick").style.cssText=`

        width:90px;
        height:90px;
        border-radius:50%;
        background:#12c66d;
        color:white;
        margin:auto;
        font-size:52px;
        display:flex;
        justify-content:center;
        align-items:center;
        margin-bottom:25px;

    `;

    document.body.appendChild(popup);

    setTimeout(()=>{

        popup.remove();

        window.location.href="index.html";

    },5000);

}

// -------------------------
// Confetti
// -------------------------

function confetti(){

    for(let i=0;i<120;i++){

        const piece=document.createElement("div");

        piece.style.position="fixed";
        piece.style.width="8px";
        piece.style.height="18px";
        piece.style.left=Math.random()*100+"vw";
        piece.style.top="-30px";
        piece.style.background=

        `hsl(${Math.random()*360},90%,60%)`;

        piece.style.zIndex="999999";

        piece.style.pointerEvents="none";

        piece.style.borderRadius="3px";

        document.body.appendChild(piece);

        piece.animate([

            {

                transform:
                "translateY(0) rotate(0deg)",

                opacity:1

            },

            {

                transform:
                `translateY(${window.innerHeight+100}px)
                rotate(${720*Math.random()}deg)`,

                opacity:0

            }

        ],{

            duration:

            3000+

            Math.random()*2000,

            easing:"ease-out"

        });

        setTimeout(()=>{

            piece.remove();

        },5200);

    }

}

// -------------------------
// SUBMIT
// -------------------------

form.addEventListener(

"submit",

function(e){

e.preventDefault();

if(sending)
return;

if(!validateCurrent())
return;

sending=true;

submitBtn.disabled=true;

submitBtn.innerHTML="Sending...";

const orderID=

generateOrderID();

const data={

order_id:orderID,

fullname:
form.fullname.value,

phone:
form.phone.value,

email:
form.email.value,

address:
form.address.value,

city:
form.city.value,

state:
form.state.value,

pincode:
form.pincode.value,

source:
form.source.value,

notes:
form.notes.value

};

emailjs.send(

EMAIL_SERVICE_ID,

EMAIL_TEMPLATE_ID,

data

)

.then(()=>{

localStorage.removeItem(

STORAGE_KEY

);

confetti();

showSuccess(orderID);

form.reset();

sending=false;

})

.catch(error=>{

console.error(error);

sending=false;

submitBtn.disabled=false;

submitBtn.innerHTML="Place Order";

alert(

"Unable to send order. Please try again."

);

});

});