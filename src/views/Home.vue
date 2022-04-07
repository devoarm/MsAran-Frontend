<template>
  <div>
    <b-card title="รายงานผู้ป่วย HI และ SI📣">
    <canvas id="myChart" width="100" height="30"></canvas>
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
    data_setHI: [],
    data_setSI: [],
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
            label: "HI", //Vergangenheit = Past
            data: this.data_setHI,
            backgroundColor: "#28dac6",
            borderColor: "transparent",
            borderWidth: 1
          },{
            label: "SI", //Vergangenheit = Past
            data: this.data_setSI,
            backgroundColor: "#B277DE",
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
        .get("api/v1/covid/chart_hisi")
        .then(res => {
          console.log(res.data);
          let result = res.data;
          for (let [labels, value] of Object.entries(res.data)) {
            this.labels.push(value.hosname);
            this.data_setHI.push(value.hi);
            this.data_setSI.push(value.si);
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
