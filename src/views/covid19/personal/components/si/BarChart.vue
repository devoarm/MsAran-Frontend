<template lang="">
  <div>
    <b-card-code title="สถานะการณ์ Home Isolation 📣" no-body>
      <canvas id="myChart" width="100" height="30"></canvas>
    </b-card-code>
  </div>
</template>
<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
export default {
  components: { BCardCode },
  data() {
    return {
      labels: [],
      data_set: [],
    };
  },
  mounted() {
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
            borderWidth: 1,
          },
        ],
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
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },
  created: function () {
    this.getMessages(); // get all messages automatically when the page is loaded
  },
  methods: {
    getMessages: function () {
      this.$http.get("api/v1/covid/chart_si").then((res) => {
        // let labels =[];
        // let data_set =[];
        console.log(res.data);
        for (let [labels, value] of Object.entries(res.data)) {
          this.labels.push(value.hosname);
          this.data_set.push(value.total);
        }
        this.$nextTick(function () {
          this.barChart.update();
        });
      });
    },
  },
};
</script>
<style lang=""></style>
