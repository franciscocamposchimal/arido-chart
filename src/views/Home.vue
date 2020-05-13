<template>
  <v-container class="grey lighten-5" :fluid="false">
    <v-row>
      <v-col cols="12">
        <v-row
          justify="space-around"
          align="center"
          :style="`height: ${this.$vuetify.breakpoint.height - 150}px;`"
        >
          <v-col :cols="this.$vuetify.breakpoint.sm ? 12 : 6">
            <v-card class="pa-2" outlined tile elevation="4">
              <v-img :src="require('@/assets/argosLogo.svg')"></v-img>
            </v-card>
          </v-col>
          <v-col :cols="this.$vuetify.breakpoint.sm ? 12 : 6">
            <v-card class="pa-2" outlined tile elevation="4">
              <v-img :src="require('@/assets/aridoLogoCompleto.png')"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
