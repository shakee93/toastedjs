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
                                    <label for="position" >Message</label>
                                    <input id="position" type="text">
                                </div>

                            </div>
                            <div class="col-md-6 col-xs-6">

                                <p class="center">Made with Love Shakeeb</p>

                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>

    </div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>

<style src="./assets/app.scss" lang="scss"></style>
