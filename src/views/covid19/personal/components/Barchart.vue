<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data() {
    return {
      chartData: "",
    };
  },
  created() {
     this.$http
      .get("api/v1/covid/chart_hi", {
        headers: {
          Authorization: `Bearer ${useJwt.getToken()}`,
        },
      })
      .then((res) => {
        let result = res.data;
        let chartLable = [];
        let Data = [];
        result.forEach((value) => {
          chartLable.push(value.hosname ? value.hosname : "");
          Data.push(value.total);
        });
        this.chartData = {
          labels: label,
          datasets: [
            {
              data: data,
              backgroundColor: "#28dac6",
              borderColor: "transparent",
            },
          ],
        };
      });
  },
  mounted() {
    this.renderChart(this.chartData);
  },
};
</script>
