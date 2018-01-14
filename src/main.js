import Vue from 'vue'
import App from './App.vue'
import Tooltip from 'vue-directive-tooltip';

Vue.use(Tooltip, {
	delay: 0,
	triggers: ['hover'],
	offset: 5
});

new Vue({
  el: '#app',
  render: h => h(App)
})
