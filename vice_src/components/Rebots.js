import Vue from 'vue';
import template from '@/templates/rebots.html';

let Rebots = Vue.component('Rebots', {
    template: template,
    data() {
        return {
            rebots: 0
        }
    },
    methods:{
        sumarRebot: function(){
            this.rebots++;
        }
    }
});

export default Rebots;
