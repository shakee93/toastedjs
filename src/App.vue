<template>
    <div id="app">
        <div class="container t-wrapper">
            <header>
                <div class="row">
                    <div class="col-md-12 col-xs-12">
                        <h1 class="center">toasted<strong>js</strong></h1>
                    </div>
                </div>
            </header>
            <main class="row middle-xs">
                <div class="col-md-2 col-xs-1"></div>
                <div class="col-md-8 col-xs-10">

                    <div class="t-container">
                        <div class="row">
                            <div class="col-md-6 col-xs-6">

                                <div class="input">
                                    <label for="message" >Message</label>
                                    <input id="message" type="text" v-model="text">
                                </div>

                                <div class="input">
                                    <label for="theme" >Theme</label>

                                    <select name="theme" id="theme">
                                        <option value="alive">Alive</option>
                                        <option value="material">Material</option>
                                        <option value="colombo">Colombo</option>
                                        <option value="venice">Venice</option>
                                    </select>

                                </div>

                                <div class="input">
                                    <label for="duration" >Duration</label>

                                    <select name="duration" id="duration">
                                        <option value="null" selected>Infinity</option>
                                        <option value="500">0.5 Seconds</option>
                                        <option value="1000">1 Second</option>
                                        <option value="2000">2 Seconds</option>
                                        <option value="5000">5 Seconds</option>
                                        <option value="30000">30 Seconds</option>
                                        <option value="60000">1 Minute</option>
                                    </select>

                                </div>

                                <br>

                                <div class="input">
                                    <label >Position</label>
                                    <div class="input-position">
                                        <label  v-tooltip.top="`${p}`" v-for="p in positions" :class="{ 'active' : p == data.position }" class="circle">
                                            <input class="hidden" type="radio" :value="p" name="position" v-model="data.position">
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-6 col-xs-6">



                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <footer>
                <div class="row">
                    <div class="col-xs-12">
                        <p class="center">Made with Love by Shakeeb</p>
                    </div>
                </div>
            </footer>
        </div>

    </div>
</template>

<script>

	require('jquery');
	require('./libs/nice-select');

	export default {
		name: 'app',
		data () {
			return {
				positions : ['top-left','top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
                text : 'Awesome !!' ,
                data : {
					position : 'top-left',
                    duration : 100,
	                theme : null
                }
			}
		},
        mounted(){
	        let vm = this;

	        $(document).ready(function() {
		        $('select').niceSelect();

		        $('.nice-select .list li').on('click', function () {

		        	let $id = $(this).parent().parent().prev().attr('id');

			        vm.data[$id] = $(this).data('value');
			        vm.$forceUpdate();
		        })
	        });
        }
	}
</script>

<style src="./sass/app.scss" lang="scss"></style>
