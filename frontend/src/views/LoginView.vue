<template>
    <section class="hero d-flex justify-content-center align-items-center">
        <div class="login p-5">
            <h5 class="text-center py-3">LOGIN</h5>
            <form action="" class="form">
                <label for="email">*Your Email</label><br />
                <input type="text" name="email" placeholder="email" class="sub-form py-1 px-3"><br />
                <label for="password">*Your Password</label><br />
                <input type="text" name="password" placeholder="Password" class="sub-form py-1 px-3">
            </form>
            <div class="row">
                <div class="col-lg-6 forgot">
                    <a href="#">Forgot Password??</a>
                </div>
                <div class="col-lg-6 button d-flex justify-content-end">
                    <a href="" class="cs-btn">
                        <button class="py-1 px-5">Login</button>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
.hero {
    background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(@/assets/img/temple.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}
.login {
    background: rgba(255,255,255,0.5);
    border-radius: 15px;
    font-family: "poppins", sans-serif;
    line-height: 32px;
    width: 30%;
}
.login h5 {
    font-size: 3rem;
    font-weight: 500;
    font-family: "pragati narrow", sans-serif !important;
}
.sub-form {
    margin-bottom: 20px;
    width: 100%;
}
.form input {
    border-radius: 10px;
    border: none;
}
.cs-btn button {
    border-radius: 10px;
    border: none;
    font-weight: 600;
    background: black;
    color: white;
    transition: all 700ms;
}
.cs-btn button:hover {
    background: white;
    color: black;
}
.forgot a {
    font-size: 0.9rem;
    color: black;
    text-decoration: none;
}
.forgot a:hover {
    color: blue;
}
</style>