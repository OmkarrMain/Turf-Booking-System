function sendOTP() {
    const email = document.getElementById('email');
    const otpverify = document.getElementsByClassName('otpverify')[0];
  
    let otp_val = Math.floor(Math.random() * 10000);
  
    let emailbody = `<h2>Your OTP is </h2>${otp_val}`;
    Email.send({
      SecureToken: "6a7d1bc0-e16a-4997-abbe-bd6242a15c87",
      To: email.value,
      From: "omkarmain786@gmail.com",
      Subject: "Email OTP Verification Code",
      Body: emailbody,
    }).then(
      message => {
        if (message === "OK") {
          alert("OTP sent to your email " + email.value);
  
          otpverify.style.display = "flex";
          const otp_inp = document.getElementById('otp_inp');
          const otp_btn = document.getElementById('otp-btn');
  
          otp_btn.addEventListener('click', () => {
            if (otp_inp.value == otp_val) {
              alert("Email address verified...");
              window.location.href = "index.html"; // This will Redirect to index.html 
            } else {
              alert("Invalid OTP");
            }
          })
        }
      }
    );
  }
  