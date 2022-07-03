<template>
  <v-app>
    <v-main id="main">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
 
  </v-app>
</template>

<script lang="ts">
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        
       
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
<style>
#main {
  background-image: url("~/assets/background.jpg");
  background-repeat: repeat;
}
</style>