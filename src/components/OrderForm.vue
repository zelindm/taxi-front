<template>
  <div>
    <div class="book-header">Book a ride</div>
    <el-form
      v-loading="loading"
      :hide-required-asterisk="true"
      :model="form"
      :rules="rules"
      ref="form"
      size="normal"
      label-width="120px"
    >
      <img src="../assets/images/clock.png" alt="clock" class="clock" />
      <el-form-item label="Airport" prop="airport">
        <el-radio-group v-model="form.airport">
          <el-radio v-for="airport in airports" :label="airport.name" :key="airport.name"></el-radio>
        </el-radio-group>
      </el-form-item>

      <span v-for="airport in airports" :key="airport.name">
        <el-form-item
          label="Terminal"
          prop="terminal"
          v-if="airport.terminals.length && airport.name === form.airport"
        >
          <el-select v-model="form.terminal" placeholder="Terminal">
            <el-option
              :label="terminal"
              :value="terminal"
              v-for="terminal in airport.terminals"
              :key="terminal"
            ></el-option>
          </el-select>
        </el-form-item>
      </span>

      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" placeholder="John Smith"></el-input>
      </el-form-item>

      <el-form-item label="Phone" prop="phone">
        <el-input v-model="form.phone" placeholder="44 1632 960566"></el-input>
      </el-form-item>

      <el-form-item label="Flight Number" prop="flightNumber">
        <el-input v-model="form.flightNumber" placeholder="SU 1832"></el-input>
      </el-form-item>

      <el-form-item label="Pick up" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="Pick a date"
              v-model="form.date"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="time">
            <el-time-select
              placeholder="Pick a time"
              :picker-options="{start: '00:00',end: '23:45',step: '00:15',}"
              v-model="form.time"
              style="width: 100%;"
            ></el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    let validateFlightNumber = (rule, value, callback) => {
      if (!/\b([A-Z]{2}|[A-Z]\d|\d[A-Z])\s?\d{3,4}\b/.test(value)) {
        return callback(new Error("Please input correct flight number"));
      }
      callback();
    };

    let validatePhone = (rule, value, callback) => {
      if (
        !/^(((44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/.test(
          value
        )
      ) {
        return callback(new Error("Please input correct UK phone number"));
      }
      callback();
    };

    return {
      loading: false,
      airports: [],
      form: {
        name: "",
        phone: "",
        date: "",
        time: "",
        flightNumber: "",
        airport: "",
        terminal: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input full name",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Length should be longer",
            trigger: "blur"
          }
        ],
        airport: [
          {
            required: true,
            message: "Please select airport",
            trigger: "change"
          }
        ],
        flightNumber: [
          {
            required: true,
            message: "Please input flight number",
            trigger: "blur"
          },
          {
            validator: validateFlightNumber,
            trigger: "blur"
          }
        ],
        terminal: [
          {
            required: true,
            message: "Please select terminal",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "Please input phone number",
            trigger: "blur"
          },
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "Please select date",
            trigger: "blur"
          }
        ],
        time: [
          {
            required: true,
            message: "Please select time",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.loading = true;
    let self = this;

    this.axios.get("/getAirports").then(response => {
      self.loading = false;
      self.airports = response.data;
    });
  },
  methods: {
    submitForm(formName) {
      let self = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          self.loading = true;
          
          this.axios
            .post("/store", self.form)
            .then(response => {
              self.loading = false;
              if (response.data.result) {
                this.$notify({
                  title: "Success",
                  message: "You will be redirected to https://unbiased.co.uk/",
                  type: "success"
                });

                setTimeout(() => {
                  window.location.href = "https://www.unbiased.co.uk";
                }, 5000);
              }
            })
            .catch(error => {
              self.loading = false;
              this.$notify({
                title: "Error",
                message: "Please contact web site administrator",
                type: "error"
              });
            });
        }
      });
    }
  },
  watch: {
    form: {
      handler(val) {
        this.form.flightNumber = val.flightNumber.toUpperCase();
        this.form.phone = val.phone.replace(/\+/g, "");
        this.form.name = val.name
          .split(" ")
          .map(s => {
            return s.charAt(0).toUpperCase() + s.slice(1);
          })
          .join(" ");
      },
      deep: true
    }
  }
};
</script>


<style scoped lang="scss">
.book-header {
  padding: 20px 20px 10px 30px;
  text-align: left;
  color: $black;
  background: $yellow;
  font-size: 2em;
  font-weight: bold;
}

.el-form {
  border-bottom-right-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  padding: 20px 35px 15px 0;
  background: #fff;
}

.el-select,
.el-button {
  width: 100%;
}
.clock {
  width: 150px;
  position: absolute;
  right: -10px;
  top: 60px;
}
</style>
