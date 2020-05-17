import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueKonva from 'vue-konva';

Vue.use(Vuetify);
Vue.use(VueKonva);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        // primary: '#ff0000',
      },
    },
  },
});
