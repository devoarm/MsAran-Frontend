<template>
  <div>
    <b-card title="รายงาน HI 📣">
    <canvas id="myChart" width="100" height="30"></canvas>
    </b-card>
    <b-card title="Kick start your project 🚀">
      <b-card-text>All the best for your new project.</b-card-text>
      <b-card-text
        >Please make sure to read our
        <b-link
          href="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/"
          target="_blank"
        >
          Template Documentation
        </b-link>
        to understand where to go from here and how to use our
        template.</b-card-text
      >
    </b-card>

    <b-card title="Want to integrate JWT? 🔒">
      <b-card-text
        >We carefully crafted JWT flow so you can implement JWT with ease and
        with minimum efforts.</b-card-text
      >
      <b-card-text
        >Please read our JWT Documentation to get more out of JWT
        authentication.</b-card-text
      >
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from "bootstrap-vue";
import Vue from "vue";
import Chart from "chart.js";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },

data(){
  return{
    messages: [],
    message: "",
    labels: [],
    data_set: [],
    barChart: ""
  }
},

  mounted: function() {
    var ctx = document.getElementById("myChart");
    this.barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "จำนวน", //Vergangenheit = Past
            data: this.data_set,
            backgroundColor: "#28dac6",
            borderColor: "transparent",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        responsiveAnimationDuration: 0,
        maintainAspectRatio: true,
        aspectRatio: 2,
        oneResie: null,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  },
  created: function() {
    this.getMessages(
      console.log(this.labels),
    
    ); // get all messages automatically when the page is loaded
  },
  methods: {
    getMessages: function() {this.$http
        .get("api/v1/covid/chart_hi")
        .then(res => {
          console.log(res.data);
          let result = res.data;
          for (let [labels, value] of Object.entries(res.data)) {
            this.labels.push(labels.hosname);
            this.data_set.push(value.total);
          }
          this.$nextTick(function() {
            this.barChart.update();
          });
        });
    }
  }

};
</script>

<style></style>
