<template>
  <div id="app">
    <header>
      <img src="./assets/images/logo.svg" alt="logo" class="logo" />
    </header>
    <main>
      <el-container>
        <div class="form-block">
          <OrderForm />
        </div>
        <h1>
          Welcome to London!
          <br />Fast delivery to Unbiased.co.uk office
          <br />at 12-14 Berry st.
        </h1>
      </el-container>
    </main>
    <footer>
      <span>Unbiased Technical Test Task</span>
      <ul>
        <li>
          <a href="https://github.com/zelindm/taxi-api">https://github.com/zelindm/taxi-api</a>
        </li>
        <li>
          <a href="https://github.com/zelindm/taxi-front">https://github.com/zelindm/taxi-front</a>
        </li>
        <li>
          <a href="https://mailtrap.io/">https://mailtrap.io/</a> (login: testtaxitaxi@yandex.ru pass:testtaxitaxi)
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import OrderForm from "./components/OrderForm.vue";

export default {
  name: "app",
  components: {
    OrderForm
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
h1 {
  color: $white;
  font-size: 2em;
  padding: 60px 0 0 30px;
}
.form-block {
  position: relative;
  margin-left: 10%;
}
.logo {
  max-width: 250px;
}

footer {
  background: $black;
  padding: 30px 10% 20px 10%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: $white;
}
</style>