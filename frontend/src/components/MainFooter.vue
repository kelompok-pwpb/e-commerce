<template>
  <section class="footer">
    <div class="row">
      <div class="col-lg-6 text-detail">
        <h3>Busana Bali</h3>
        <div class="detail">
          <h5>Email : busanabali@gmail.com</h5>
          <h5>Telp : +62 887 4567 980</h5>
          <h5>Location : Jln.Wiharja No.32</h5>
        </div>
      </div>
      <div class="col-lg-6 px-5">
        <div class="location">
            <h3>Our Location :</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d493.0840254937554!2d115.20388201934468!3d-8.627433814864508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1714816023063!5m2!1sid!2sid"
              width="450"
              height="350"
              style="border: 0"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>
    </div>
  </section>
  <section class="container-fluid footer-below">
    <div class="row py-5">
        <div class="col-lg-6 footer-text-below">
            <h5 class="d-flex justify-content-center pt-2">CopyRight by PeWePeBeh Team</h5>
        </div>
        <div class="col-lg-6 d-flex justify-content-center footer-icon">
            <a href=""><i class="bi bi-whatsapp px-2"></i></a>
            <a href=""><i class="bi bi-instagram px-2"></i></a>
            <a href=""><i class="bi bi-facebook px-2"></i></a>
        </div>
    </div>
  </section>
</template>
<style scoped>
.footer {
  padding-top: 100px;
  padding-inline: 100px;
  padding-bottom: 20px;
  background: #d9d9d9;
}
.footer::before {
  position: absolute;
  content: '';
  background-color: black;
  width: 90%;
  border-radius: 8px;
  height: 5px;
  top: 3020px;
  left: 5%;
}
.text-detail {
  font-family: 'poppins', sans-serif;
}
.text-detail h3 {
  font-size: 3rem;
}
.detail {
  padding-block: 20px;
}
.location {
    padding-left: 100px;
}
.footer-below {
    background: #d9d9d9;
}
.footer-text-below h5 {
    font-size: 20px;
}
.footer-icon a {
    font-size: 30px;
    color: black;
}
</style>
