// Add animation for the main picture

gsap.from(".logo", {  opacity: 0, duration: 3, })

// Add animation for timer

// timeline (tl) to handle the animation of the timer digits. It's initially paused.

const tl = gsap.timeline({ paused: true }); 

tl.from(".time", {y: -50, opacity: 0, duration: 1, stagger: 1 });

ScrollTrigger.create({
  trigger: ".containerTimer",
  start: "top center",
  end: "bottom center",
  onEnter: () => {
    tl.play();
  },
  onLeaveBack: () => {
    tl.reverse();
  },
  onEnterBack: () => {
    tl.play();
  },
  onLeave: () => {
    tl.reverse();
  }
});

// Calculate
let open_modal = document.querySelectorAll(".open_modal");
let close_modal = document.getElementById("close_modal");
let modal = document.getElementById("modal");
let body = document.getElementsByTagName("body")[0];
for (let i = 0; i < open_modal.length; i++) {
  open_modal[i].onclick = function () {
    modal.classList.add("modal_vis");
    modal.classList.remove("bounceOutDown");
    body.classList.add("body_block");
  };
}
close_modal.onclick = function () {
  modal.classList.add("bounceOutDown");
  window.setTimeout(function () {
    modal.classList.remove("modal_vis");
    body.classList.remove("body_block");
  }, 500);
};

const buttonCalculate = document.querySelector(".btn-calc");
buttonCalculate.addEventListener("click", calculateAmount);

const buttonReset = document.querySelector(".reset");
buttonReset.addEventListener("click", reloadPage);

function reloadPage() {
  location.reload();
}

function calculateAmount(e) {
  e.preventDefault();

  const room = document.querySelector("#room").value * 1;
  const food = document.querySelector("#food").value * 1;

  let adult = document.querySelector("#adult").value;
  adult = adult > 0 ? adult : 0;

  let children = document.querySelector("#children").value;
  children = children > 0 ? adult : 0;

  if (adult === "" || children === "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please enter your information!",
    });
  }

  const check = document.querySelector("#check");
  const checkPrice = check.checked ? Number(check.value) : 0;

  const days = document.querySelector("#days").value * 1;

  let amountAdult = +food * adult * days;
  let amountChildren = (food * children * days) / 2;
  let totalAmount = amountAdult + amountChildren + room + checkPrice;

  amountAdult = amountAdult.toFixed(2);
  amountChildren = amountChildren.toFixed(2);
  totalAmount = totalAmount.toFixed(2);

  document.querySelector("#dividedAdult").textContent = amountAdult;
  document.querySelector("#dividedChildren").textContent = amountChildren;
  document.querySelector("#familyTotal").textContent = totalAmount;
}

// Slider

const items = document.querySelectorAll(".item");
console.log(items);
items.forEach((item) => {
  item.addEventListener("mouseover", () => {
    removeFocus();
    item.classList.add("selected");
  });

  removeFocus = () => {
    items.forEach((item) => {
      item.classList.remove("selected");
    });
  };
});

// Timer

function timerCountdown() {
  const tourDate = new Date("July 1, 2024 08:00");
  const now = new Date();
  const diff = tourDate - now;

  const msInSecond = 1000;
  const msInMinute = 60 * 1000;
  const msInHour = 60 * 60 * 1000;
  const msInDay = 24 * 60 * 60 * 1000;

  // Math.max to ensure that the timer values are never negative.
  const displayDay = Math.max(Math.floor(diff / msInDay), 0);
  document.querySelector(".days").textContent = displayDay;

  const displayHour = Math.max(Math.floor((diff % msInDay) / msInHour), 0);
  document.querySelector(".hours").textContent = displayHour;

  const displayMinute = Math.max(Math.floor((diff % msInHour) / msInMinute), 0);
  document.querySelector(".minutes").textContent = displayMinute;

  const displaySecond = Math.max(Math.floor((diff % msInMinute) / msInSecond), 0);
  document.querySelector(".seconds").textContent = displaySecond;

  if (diff <= 0) {
    document.querySelector(".days").textContent = 0;
    document.querySelector(".hours").textContent = 0;
    document.querySelector(".minutes").textContent = 0;
    document.querySelector(".seconds").textContent = 0;
    clearInterval(timerID);
  }
}

let timerID = setInterval(timerCountdown, 1000);
