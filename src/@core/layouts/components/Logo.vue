<template lang="">
  <div>
    <b-img
      :src="appLogoImage"
      alt="logo"
      width="40"          
      height="25"          
    />
  </div>
</template>
<script>
import { $themeConfig } from '@themeConfig'
import { 
  BImg,
} from "bootstrap-vue";
export default {
  components: {BImg},
   setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
}
</script>
<style lang="">
  
</style>