<template>
    <div>
        <b-card body-class="pb-50" title="บริการที่ต้องขอ Authen Code">
            <h2 class="font-weight-bolder mb-1">2,76k</h2>
            <!-- chart -->
            <vue-apex-charts
                height="70"
                :options="statisticsOrder.chartOptions"
                :series="statisticsOrder.series"
            />
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

        <b-card title="รายชื่อที่ต้องขอ Authen Code">
            <b-table responsive="sm" :items="items" />
        </b-card>
    </div>
</template>

<script>
import { BCard } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";
import { BTable } from "bootstrap-vue";

const $barColor = "#f3f3f3";

export default {
    components: {
        BCard,
        VueApexCharts,
        BTable,
    },
    data() {
        return {
            statisticsOrder: {
                series: [
                    {
                        name: "2020",
                        data: [45, 85, 65, 45, 65],
                    },
                ],
                chartOptions: {
                    chart: {
                        type: "bar",
                        stacked: true,
                        toolbar: {
                            show: false,
                        },
                    },
                    grid: {
                        show: false,
                        padding: {
                            left: 0,
                            right: 0,
                            top: -15,
                            bottom: -15,
                        },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "20%",
                            startingShape: "rounded",
                            colors: {
                                backgroundBarColors: [
                                    $barColor,
                                    $barColor,
                                    $barColor,
                                    $barColor,
                                    $barColor,
                                ],
                                backgroundBarRadius: 5,
                            },
                        },
                    },
                    legend: {
                        show: false,
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    colors: [$themeColors.warning],

                    xaxis: {
                        labels: {
                            show: false,
                        },
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false,
                        },
                    },
                    yaxis: {
                        show: false,
                    },
                    tooltip: {
                        x: {
                            show: false,
                        },
                    },
                },
            },
            items: [
                {
                    ID: 1,
                    HN: 62000123,
                    ชื่อ: "Dickerson",
                    นามสกุล: "Macdonald",
                    แผนก: "ANC",
                    วันที่รับบริการ: "10-11-2021",
                },
                {
                    ID: 2,
                    HN: 62000123,
                    ชื่อ: "Larsen",
                    นามสกุล: "Shaw",
                    แผนก: "ANC",
                    วันที่รับบริการ: "10-11-2021",
                },
                {
                    ID: 3,
                    HN: 62000123,
                    ชื่อ: "Geneva",
                    นามสกุล: "Wilson",
                    แผนก: "กายภาพ",
                    วันที่รับบริการ: "10-11-2021",
                },
                {
                    ID: 4,
                    HN: 62000123,
                    ชื่อ: "Jami",
                    นามสกุล: "Carney",
                    แผนก: "Covid",
                    วันที่รับบริการ: "10-11-2021",
                },
                {
                    ID: 5,
                    HN: 62000123,
                    ชื่อ: "James",
                    นามสกุล: "Thomson",
                    แผนก: "Covid",
                    วันที่รับบริการ: "10-11-2021",
                },
            ],
        };
    },
};
</script>
