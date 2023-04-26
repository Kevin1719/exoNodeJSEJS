const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const btn = document.querySelectorAll("#submit");
const form = document.querySelectorAll("#forM");
const pwd = document.getElementById('pwd');
const confirmPWd = document.getElementById("confirmPwd");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

for(let i=0; i<btn.length; i++){
  btn[i].addEventListener("submit",(e)=>{
    e.preventDefault();
  })
}

/*for(let i=0; i<form.length; i++){
  form[i].addEventListener("submit",(e)=>{
    e.preventDefault();
  })
}*/