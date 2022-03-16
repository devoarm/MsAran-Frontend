<template>
    <div>
        <b-card no-body class="card-statistics">
            <b-card-header>
                <b-card-title>Error Code</b-card-title>
                <b-card-text class="mr-25 mb-0">
                    Updated 1 month ago
                </b-card-text>
            </b-card-header>
            <b-card-body class="statistics-body">
                <b-row>
                    <b-col
                        v-for="item in statisticsItems"
                        :key="item.icon"
                        md="3"
                        sm="6"
                        class="mb-2 mb-md-0"
                        :class="item.customClass"
                    >
                        <b-media no-body>
                            <b-media-aside class="mr-2">
                                <b-avatar size="48" :variant="item.color">
                                    <feather-icon size="24" :icon="item.icon" />
                                </b-avatar>
                            </b-media-aside>
                            <b-media-body class="my-auto">
                                <h4 class="font-weight-bolder mb-0">
                                    {{ item.title }}
                                </h4>
                                <b-card-text class="font-small-3 mb-0">
                                    {{ item.subtitle }}
                                </b-card-text>
                            </b-media-body>
                        </b-media>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>

        <b-table responsive="sm" :items="items" />
    </div>
</template>

<script>
import {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BRow,
    BCol,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
} from "bootstrap-vue";
import { BTable } from 'bootstrap-vue'

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardTitle,
        BCardText,
        BCardBody,
        BMedia,
        BAvatar,
        BMediaAside,
        BMediaBody,
        BTable,
    },
    data() {
        return {
            statisticsItems: [
                {
                    icon: "TrendingUpIcon",
                    color: "light-primary",
                    title: "230k",
                    subtitle: "DS แต่ไม่มีรหัส",
                    customClass: "mb-2 mb-xl-0",
                },
                {
                    icon: "UserIcon",
                    color: "light-info",
                    title: "8.549k",
                    subtitle: "DENY Code",
                    customClass: "mb-2 mb-xl-0",
                },
                {
                    icon: "BoxIcon",
                    color: "light-danger",
                    title: "1.423k",
                    subtitle: "สิทธิผิด",
                    customClass: "mb-2 mb-sm-0",
                },
                {
                    icon: "DollarSignIcon",
                    color: "light-success",
                    title: "$9745",
                    subtitle: "กองทุนเทียบ Hosxp",
                    customClass: "",
                },
            ],
            items: [
                {
                    age: 40,
                    first_name: "Dickerson",
                    last_name: "Macdonald",
                    Occupation: "Job",
                },
                {
                    age: 21,
                    first_name: "Larsen",
                    last_name: "Shaw",
                    Occupation: "Job",
                },
                {
                    age: 89,
                    first_name: "Geneva",
                    last_name: "Wilson",
                    Occupation: "Bussiness",
                },
                {
                    age: 38,
                    first_name: "Jami",
                    last_name: "Carney",
                    Occupation: "Bussiness",
                },
                {
                    age: 40,
                    first_name: "James",
                    last_name: "Thomson",
                    Occupation: "Job",
                },
            ],
        };
    },
};
</script>
