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
                                    <label for="icon" >Icon</label>
                                    <select name="icon" id="icon" class="icon-select">
                                        <option v-for="icon in icons" :value="icon">
                                            <i class="material-icons">{{ icon }}</i></option>
                                    </select>
                                </div>

                                <div class="input">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="theme" >Full Width</label>
                                            <div class="switch">
                                                <input type="checkbox" id="fullWidth" v-model="data.fullWidth" /><label class="switch-label" for="fullWidth" >Full Width</label>
                                            </div>
                                        </div>
                                        <div class="col-md-9" v-show="data.fullWidth">
                                            <label for="theme" >Fit To Screen</label>
                                            <div class="switch">
                                                <input type="checkbox" id="fitToScreen" v-model="data.fitToScreen" /><label class="switch-label" for="fitToScreen" >Full Width</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
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
                icons : [
	                "3d_rotation",
	                "accessibility",
	                "accessible",
	                "account_balance",
	                "account_balance_wallet",
	                "account_box",
	                "account_circle",
	                "add_shopping_cart",
	                "alarm",
	                "alarm_add",
	                "alarm_off",
	                "alarm_on",
	                "all_out",
	                "android",
	                "announcement",
	                "aspect_ratio",
	                "assessment",
	                "assignment",
	                "assignment_ind",
	                "assignment_late",
	                "assignment_return",
	                "assignment_returned",
	                "assignment_turned_in",
	                "backup",
	                "book",
	                "bookmark",
	                "bookmark_border",
	                "bug_report",
	                "build",
	                "cached",
	                "camera_enhance",
	                "card_giftcard",
	                "card_membership",
	                "card_travel",
	                "change_history",
	                "check_circle",
	                "chrome_reader_mode",
	                "class",
	                "code",
	                "compare_arrows",
	                "copyright",
	                "credit_card",
	                "dashboard",
	                "date_range",
	                "delete",
	                "delete_forever",
	                "description",
	                "dns",
	                "done",
	                "done_all",
	                "donut_large",
	                "donut_small",
	                "eject",
	                "euro_symbol",
	                "event",
	                "event_seat",
	                "exit_to_app",
	                "explore",
	                "extension",
	                "face",
	                "favorite",
	                "favorite_border",
	                "feedback",
	                "find_in_page",
	                "find_replace",
	                "fingerprint",
	                "flight_land",
	                "flight_takeoff",
	                "flip_to_back",
	                "flip_to_front",
	                "g_translate",
	                "gavel",
	                "get_app",
	                "gif",
	                "grade",
	                "group_work",
	                "help",
	                "help_outline",
	                "highlight_off",
	                "history",
	                "home",
	                "hourglass_empty",
	                "hourglass_full",
	                "http",
	                "https",
	                "important_devices",
	                "info",
	                "info_outline",
	                "input",
	                "invert_colors",
	                "label",
	                "label_outline",
	                "language",
	                "launch",
	                "lightbulb_outline",
	                "line_style",
	                "line_weight",
	                "list",
	                "lock",
	                "lock_open",
	                "lock_outline",
	                "loyalty",
	                "markunread_mailbox",
	                "motorcycle",
	                "note_add",
	                "offline_pin",
	                "opacity",
	                "open_in_browser",
	                "open",
	                "open_with",
	                "pageview",
	                "pan_tool",
	                "payment",
	                "perm_camera_mic",
	                "perm_contact_calendar",
	                "perm_data_setting",
	                "play_for_work",
	                "picture_in_picture_alt",
	                "picture_in_picture",
	                "pets",
	                "perm_scan_wifi",
	                "perm_phone_msg",
	                "perm_media",
	                "perm_identity",
	                "perm_device_information",
	                "redeem",
	                "record_voice_over",
	                "receipt",
	                "question_answer",
	                "query_builder",
	                "print",
	                "pregnant_woman",
	                "power",
	                "polymer",
	                "remove_shopping_cart",
	                "reorder",
	                "report_problem",
	                "restore",
	                "restore_page",
	                "room",
	                "rounded_corner",
	                "rowing",
	                "schedule",
	                "search",
	                "settings",
	                "settings_applications",
	                "settings_backup_restore",
	                "settings_bluetooth",
	                "settings_brightness",
	                "settings_cell",
	                "settings_ethernet",
	                "settings_input_antenna",
	                "settings_input_component",
	                "settings_input_composite",
	                "settings_input_hdmi",
	                "settings_input_svideo",
	                "settings_overscan",
	                "settings_phone",
	                "settings_power",
	                "settings_remote",
	                "settings_voice",
	                "shop",
	                "shop_two",
	                "shopping_basket",
	                "shopping_cart",
	                "speaker_notes",
	                "speaker_notes_off",
	                "spellcheck",
	                "star_rate",
	                "stars"
                ],
                text : 'Awesome !!' ,
                data : {
					position : 'top-left',
                    duration : 100,
	                theme : null,
                    icon : null,
                    fullWidth : false,
                    fitToScreen : false
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
