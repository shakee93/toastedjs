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
                                    <input id="message" type="text">
                                </div>

                                <div class="input">
                                    <label for="duration" >Duration</label>
                                    <input id="duration" type="text">
                                </div>

                                <div class="input">
                                    <label >Position</label>
                                    <div class="input-position">
                                        <label  v-for="p in positions" :class="{ 'active' : p.position == position }" class="circle">
                                            <input class="hidden" type="radio" :value="p.position" name="position" v-model="position">
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
	export default {
		name: 'app',
		data () {
			return {
				position : 'top-left',
				positions : [
					{
						position : 'top-left',
                    },
                    {
						position : 'top-center'
                    },
                    {
						position : 'top-right'
                    },
                    {
						position : 'bottom-left'
                    },
                    {
						position : 'bottom-center'
                    },
                    {
						position : 'bottom-right'
                    },

                ],
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>

<style src="./assets/app.scss" lang="scss"></style>
