<template>
<div>
  <b-card 
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>Complete 16 FILE</b-card-title>
      <b-card-text class="mr-25 mb-0">
        Updated 1 month ago
      </b-card-text>
    </b-card-header>
  
  </b-card>

  <b-row class="match-height">
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          icon="EyeIcon"
          statistic="36.9%"
          statistic-title="INS"
          color="info"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="warning"
          icon="MessageSquareIcon"
          statistic="12%"
          statistic-title="PAT"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="danger"
          icon="UserIcon"
          statistic="97.8%"
          statistic-title="OPD"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="primary"
          icon="TruckIcon"
          statistic="26.8%"
          statistic-title="ORF"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="success"
          icon="AwardIcon"
          statistic="68%"
          statistic-title="ODX"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          hide-chart
          color="danger"
          icon="TruckIcon"
          statistic="2.1%"
          statistic-title="OOP"
        />
      </b-col>

      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          icon="HeartIcon"
          statistic="36.9%"
          statistic-title="IPD"
          color="info"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="warning"
          icon="ActivityIcon"
          statistic="12%"
          statistic-title="IRF"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="danger"
          icon="ShoppingBagIcon"
          statistic="97.8%"
          statistic-title="IDX"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="primary"
          icon="HeartIcon"
          statistic="26.8%"
          statistic-title="IOP"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="success"
          icon="DollarSignIcon"
          statistic="89%"
          statistic-title="CHI"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          hide-chart
          color="danger"
          icon="DollarSignIcon"
          statistic="21%"
          statistic-title="CHA"
        />
      </b-col>
       <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="danger"
          icon="ShoppingBagIcon"
          statistic="97.8%"
          statistic-title="AER"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="primary"
          icon="LayoutIcon"
          statistic="26.8%"
          statistic-title="ADP"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="success"
          icon="TruckIcon"
          statistic="68%"
          statistic-title="LVD"
        />
      </b-col>
      <b-col
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          hide-chart
          color="danger"
          icon="ShieldIcon"
          statistic="22%"
          statistic-title="DRU"
        />
      </b-col>
    </b-row>

</div>

</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'

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
    StatisticCardVertical,
  },
  data() {
    return {
      statisticsItems: [
        {
          icon: 'TrendingUpIcon',
          color: 'light-primary',
          title: '230k',
          subtitle: 'INS',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: '8.549k',
          subtitle: 'PAT',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-danger',
          title: '1.423k',
          subtitle: 'OPD',
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: '$9745',
          subtitle: 'ORF',
          customClass: '',
        },
        {
          icon: 'TrendingUpIcon',
          color: 'light-primary',
          title: '230k',
          subtitle: 'ODX',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: '8.549k',
          subtitle: 'OOP',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-danger',
          title: '1.423k',
          subtitle: 'IPD',
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: '$9745',
          subtitle: 'IRF',
          customClass: '',
        },
        {
          icon: 'TrendingUpIcon',
          color: 'light-primary',
          title: '230k',
          subtitle: 'IDX',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: '8.549k',
          subtitle: 'IOP',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-danger',
          title: '1.423k',
          subtitle: 'CHT',
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: '$9745',
          subtitle: 'CHA',
          customClass: '',
        },
        {
          icon: 'TrendingUpIcon',
          color: 'light-primary',
          title: '230k',
          subtitle: 'AER',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: '8.549k',
          subtitle: 'ADP',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-danger',
          title: '1.423k',
          subtitle: 'LVD',
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: '$9745',
          subtitle: 'DRU',
          customClass: '',
        },
        
      ],
    }
  },
}
</script>
