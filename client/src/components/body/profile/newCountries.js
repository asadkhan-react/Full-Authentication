const newCountries = [
    {name: "Kabul", utcTime : "UTC +04:30"},
    {name: "Mariehamn", utcTime : "UTC +03:00"},
    {name: "Tirane", utcTime : "UTC +02:00"},
    {name: "Algiers", utcTime : "UTC +01:00"},
    {name: "Pago_Pago", utcTime : "UTC -11:00"},
    {name: "Andorra", utcTime : "UTC +02:00"},
    {name: "Luanda", utcTime : "UTC +01:00"},
    {name: "Anguilla", utcTime : "UTC -04:00"},
    {name: "Troll", utcTime : "UTC +02:00"},
    {name: "Palmer", utcTime : "UTC -03:00"},
    {name: "Rothera", utcTime : "UTC -03:00"},
    {name: "Syowa", utcTime : "UTC +03:00"},
    {name: "Mawson", utcTime : "UTC +05:00"},
    {name: "Vostok", utcTime : "UTC +06:00"},
    {name: "Davis", utcTime : "UTC +07:00"},
    {name: "Casey", utcTime : "UTC +08:00"},
    {name: "DumontDUrville", utcTime : "UTC +10:00"},
    {name: "McMurdo", utcTime : "UTC +12:00"},
    {name: "Antigua", utcTime : "UTC -04:00"},
    {name: "Buenos_Aires", utcTime : "UTC -03:00"},
    {name: "Catamarca", utcTime : "UTC -03:00"},
    {name: "Cordoba", utcTime : "UTC -03:00"},
    {name: "Jujuy", utcTime : "UTC -03:00"},
    {name: "La_Rioja", utcTime : "UTC -03:00"},
    {name: "Mendoza", utcTime : "UTC -03:00"},
    {name: "Rio_Gallegos", utcTime : "UTC -03:00"},
    {name: "Salta", utcTime : "UTC -03:00"},
    {name: "San_Juan", utcTime : "UTC -03:00"},
    {name: "San_Luis", utcTime : "UTC -03:00"},
    {name: "Tucuman", utcTime : "UTC -03:00"},
    {name: "Ushuaia", utcTime : "UTC -03:00"},
    {name: "Yerevan", utcTime : "UTC +04:00"},
    {name: "Aruba", utcTime : "UTC -04:00"},
    {name: "Perth", utcTime : "UTC +08:00"},
    {name: "Eucla", utcTime : "UTC +08:45"},
    {name: "Adelaide", utcTime : "UTC +09:30"},
    {name: "Broken_Hill", utcTime : "UTC +09:30"},
    {name: "Darwin", utcTime : "UTC +09:30"},
    {name: "Brisbane", utcTime : "UTC +10:00"},
    {name: "Currie", utcTime : "UTC +10:00"},
    {name: "Hobart", utcTime : "UTC +10:00"},
    {name: "Lindeman", utcTime : "UTC +10:00"},
    {name: "Melbourne", utcTime : "UTC +10:00"},
    {name: "Sydney", utcTime : "UTC +10:00"},
    {name: "Lord_Howe", utcTime : "UTC +10:30"},
    {name: "Macquarie", utcTime : "UTC +11:00"},
    {name: "Vienna", utcTime : "UTC +02:00"},
    {name: "Baku", utcTime : "UTC +04:00"},
    {name: "Nassau", utcTime : "UTC -04:00"},
    {name: "Bahrain", utcTime : "UTC +03:00"},
    {name: "Dhaka", utcTime : "UTC +06:00"},
    {name: "Barbados", utcTime : "UTC -04:00"},
    {name: "Minsk", utcTime : "UTC +03:00"},
    {name: "Brussels", utcTime : "UTC +02:00"},
    {name: "Belize", utcTime : "UTC -06:00"},
    {name: "Porto-Novo", utcTime : "UTC +01:00"},
    {name: "Bermuda", utcTime : "UTC -03:00"},
    {name: "Thimphu", utcTime : "UTC +06:00"},
    {name: "La_Paz", utcTime : "UTC -04:00"},
    {name: "Kralendijk", utcTime : "UTC -04:00"},
    {name: "Sarajevo", utcTime : "UTC +02:00"},
    {name: "Gaborone", utcTime : "UTC +02:00"},
    {name: "Noronha", utcTime : "UTC -02:00"},
    {name: "Araguaina", utcTime : "UTC -03:00"},
    {name: "Bahia", utcTime : "UTC -03:00"},
    {name: "Belem", utcTime : "UTC -03:00"},
    {name: "Fortaleza", utcTime : "UTC -03:00"},
    {name: "Maceio", utcTime : "UTC -03:00"},
    {name: "Recife", utcTime : "UTC -03:00"},
    {name: "Santarem", utcTime : "UTC -03:00"},
    {name: "Sao_Paulo", utcTime : "UTC -03:00"},
    {name: "Boa_Vista", utcTime : "UTC -04:00"},
    {name: "Campo_Grande", utcTime : "UTC -04:00"},
    {name: "Cuiaba", utcTime : "UTC -04:00"},
    {name: "Manaus", utcTime : "UTC -04:00"},
    {name: "Porto_Velho", utcTime : "UTC -04:00"},
    {name: "Eirunepe", utcTime : "UTC -05:00"},
    {name: "Rio_Branco", utcTime : "UTC -05:00"},
    {name: "Chagos", utcTime : "UTC +06:00"},
    {name: "Tortola", utcTime : "UTC -04:00"},
    {name: "Brunei", utcTime : "UTC +08:00"},
    {name: "Sofia", utcTime : "UTC +03:00"},
    {name: "Ouagadougou", utcTime : "UTC"},
    {name: "Bujumbura", utcTime : "UTC +02:00"},
    {name: "Phnom_Penh", utcTime : "UTC +07:00"},
    {name: "Douala", utcTime : "UTC +01:00"},
    {name: "St_Johns", utcTime : "UTC -02:30"},
    {name: "Glace_Bay", utcTime : "UTC -03:00"},
    {name: "Goose_Bay", utcTime : "UTC -03:00"},
    {name: "Halifax", utcTime : "UTC -03:00"},
    {name: "Moncton", utcTime : "UTC -03:00"},
    {name: "Blanc-Sablon", utcTime : "UTC -04:00"},
    {name: "Iqaluit", utcTime : "UTC -04:00"},
    {name: "Nipigon", utcTime : "UTC -04:00"},
    {name: "Pangnirtung", utcTime : "UTC -04:00"},
    {name: "Thunder_Bay", utcTime : "UTC -04:00"},
    {name: "Toronto", utcTime : "UTC -04:00"},
    {name: "Atikokan", utcTime : "UTC -05:00"},
    {name: "Rainy_River", utcTime : "UTC -05:00"},
    {name: "Rankin_Inlet", utcTime : "UTC -05:00"},
    {name: "Resolute", utcTime : "UTC -05:00"},
    {name: "Winnipeg", utcTime : "UTC -05:00"},
    {name: "Cambridge_Bay", utcTime : "UTC -06:00"},
    {name: "Edmonton", utcTime : "UTC -06:00"},
    {name: "Inuvik", utcTime : "UTC -06:00"},
    {name: "Regina", utcTime : "UTC -06:00"},
    {name: "Swift_Current", utcTime : "UTC -06:00"},
    {name: "Yellowknife", utcTime : "UTC -06:00"},
    {name: "Creston", utcTime : "UTC -07:00"},
    {name: "Dawson", utcTime : "UTC -07:00"},
    {name: "Dawson_Creek", utcTime : "UTC -07:00"},
    {name: "Fort_Nelson", utcTime : "UTC -07:00"},
    {name: "Vancouver", utcTime : "UTC -07:00"},
    {name: "Whitehorse", utcTime : "UTC -07:00"},
    {name: "Cape_Verde", utcTime : "UTC -01:00"},
    {name: "Cayman", utcTime : "UTC -05:00"},
    {name: "Bangui", utcTime : "UTC +01:00"},
    {name: "Ndjamena", utcTime : "UTC +01:00"},
    {name: "Punta_Arenas", utcTime : "UTC -03:00"},
    {name: "Santiago", utcTime : "UTC -03:00"},
    {name: "Easter", utcTime : "UTC -05:00"},
    {name: "Urumqi", utcTime : "UTC +06:00"},
    {name: "Shanghai", utcTime : "UTC +08:00"},
    {name: "Christmas", utcTime : "UTC +07:00"},
    {name: "Cocos", utcTime : "UTC +06:30"},
    {name: "Bogota", utcTime : "UTC -05:00"},
    {name: "Comoro", utcTime : "UTC +03:00"},
    {name: "Rarotonga", utcTime : "UTC -10:00"},
    {name: "Costa_Rica", utcTime : "UTC -06:00"},
    {name: "Zagreb", utcTime : "UTC +02:00"},
    {name: "Havana", utcTime : "UTC -04:00"},
    {name: "Curacao", utcTime : "UTC -04:00"},
    {name: "Famagusta", utcTime : "UTC +03:00"},
    {name: "Nicosia", utcTime : "UTC +03:00"},
    {name: "Prague", utcTime : "UTC +02:00"},
    {name: "Kinshasa", utcTime : "UTC +01:00"},
    {name: "Lubumbashi", utcTime : "UTC +02:00"},
    {name: "Copenhagen", utcTime : "UTC +02:00"},
    {name: "Djibouti", utcTime : "UTC +03:00"},
    {name: "Dominica", utcTime : "UTC -04:00"},
    {name: "Santo_Domingo", utcTime : "UTC -04:00"},
    {name: "Dili", utcTime : "UTC +09:00"},
    {name: "Guayaquil", utcTime : "UTC -05:00"},
    {name: "Galapagos", utcTime : "UTC -06:00"},
    {name: "Cairo", utcTime : "UTC +02:00"},
    {name: "El_Salvador", utcTime : "UTC -06:00"},
    {name: "Malabo", utcTime : "UTC +01:00"},
    {name: "Asmara", utcTime : "UTC +03:00"},
    {name: "Tallinn", utcTime : "UTC +03:00"},
    {name: "Addis_Ababa", utcTime : "UTC +03:00"},
    {name: "Stanley", utcTime : "UTC -03:00"},
    {name: "Faroe", utcTime : "UTC +01:00"},
    {name: "Fiji", utcTime : "UTC +12:00"},
    {name: "Helsinki", utcTime : "UTC +03:00"},
    {name: "Paris", utcTime : "UTC +02:00"},
    {name: "Cayenne", utcTime : "UTC -03:00"},
    {name: "Gambier", utcTime : "UTC -09:00"},
    {name: "Marquesas", utcTime : "UTC -09:30"},
    {name: "Tahiti", utcTime : "UTC -10:00"},
    {name: "Kerguelen", utcTime : "UTC +05:00"},
    {name: "Libreville", utcTime : "UTC +01:00"},
    {name: "Banjul", utcTime : "UTC"},
    {name: "Tbilisi", utcTime : "UTC +04:00"},
    {name: "Berlin", utcTime : "UTC +02:00"},
    {name: "Busingen", utcTime : "UTC +02:00"},
    {name: "Accra", utcTime : "UTC"},
    {name: "Gibraltar", utcTime : "UTC +02:00"},
    {name: "Athens", utcTime : "UTC +03:00"},
    {name: "Godthab", utcTime : "UTC -02:00"},
    {name: "Thule", utcTime : "UTC -03:00"},
    {name: "Danmarkshavn", utcTime : "UTC"},
    {name: "Scoresbysund", utcTime : "UTC"},
    {name: "Grenada", utcTime : "UTC -04:00"},
    {name: "Guadeloupe", utcTime : "UTC -04:00"},
    {name: "Guam", utcTime : "UTC +10:00"},
    {name: "Guatemala", utcTime : "UTC -06:00"},
    {name: "Guernsey", utcTime : "UTC +01:00"},
    {name: "Conakry", utcTime : "UTC"},
    {name: "Bissau", utcTime : "UTC"},
    {name: "Guyana", utcTime : "UTC -04:00"},
    {name: "Port-au-Prince", utcTime : "UTC -04:00"},
    {name: "Tegucigalpa", utcTime : "UTC -06:00"},
    {name: "Hong_Kong", utcTime : "UTC +08:00"},
    {name: "Budapest", utcTime : "UTC +02:00"},
    {name: "Reykjavik", utcTime : "UTC"},
    {name: "Kolkata", utcTime : "UTC +05:30"},
    {name: "Jakarta", utcTime : "UTC +07:00"},
    {name: "Pontianak", utcTime : "UTC +07:00"},
    {name: "Makassar", utcTime : "UTC +08:00"},
    {name: "Jayapura", utcTime : "UTC +09:00"},
    {name: "Tehran", utcTime : "UTC +04:30"},
    {name: "Baghdad", utcTime : "UTC +03:00"},
    {name: "Dublin", utcTime : "UTC +01:00"},
    {name: "Isle_of_Man", utcTime : "UTC +01:00"},
    {name: "Jerusalem", utcTime : "UTC +03:00"},
    {name: "Rome", utcTime : "UTC +02:00"},
    {name: "Abidjan", utcTime : "UTC"},
    {name: "Jamaica", utcTime : "UTC -05:00"},
    {name: "Tokyo", utcTime : "UTC +09:00"},
    {name: "Jersey", utcTime : "UTC +01:00"},
    {name: "Amman", utcTime : "UTC +03:00"},
    {name: "Aqtau", utcTime : "UTC +05:00"},
    {name: "Aqtobe", utcTime : "UTC +05:00"},
    {name: "Atyrau", utcTime : "UTC +05:00"},
    {name: "Oral", utcTime : "UTC +05:00"},
    {name: "Almaty", utcTime : "UTC +06:00"},
    {name: "Qyzylorda", utcTime : "UTC +06:00"},
    {name: "Nairobi", utcTime : "UTC +03:00"},
    {name: "Tarawa", utcTime : "UTC +12:00"},
    {name: "Enderbury", utcTime : "UTC +13:00"},
    {name: "Kiritimati", utcTime : "UTC +14:00"},
    {name: "Kuwait", utcTime : "UTC +03:00"},
    {name: "Bishkek", utcTime : "UTC +06:00"},
    {name: "Vientiane", utcTime : "UTC +07:00"},
    {name: "Riga", utcTime : "UTC +03:00"},
    {name: "Beirut", utcTime : "UTC +03:00"},
    {name: "Maseru", utcTime : "UTC +02:00"},
    {name: "Monrovia", utcTime : "UTC"},
    {name: "Tripoli", utcTime : "UTC +02:00"},
    {name: "Vaduz", utcTime : "UTC +02:00"},
    {name: "Vilnius", utcTime : "UTC +03:00"},
    {name: "Luxembourg", utcTime : "UTC +02:00"},
    {name: "Macau", utcTime : "UTC +08:00"},
    {name: "Skopje", utcTime : "UTC +02:00"},
    {name: "Antananarivo", utcTime : "UTC +03:00"},
    {name: "Blantyre", utcTime : "UTC +02:00"},
    {name: "Kuala_Lumpur", utcTime : "UTC +08:00"},
    {name: "Kuching", utcTime : "UTC +08:00"},
    {name: "Maldives", utcTime : "UTC +05:00"},
    {name: "Bamako", utcTime : "UTC"},
    {name: "Malta", utcTime : "UTC +02:00"},
    {name: "Kwajalein", utcTime : "UTC +12:00"},
    {name: "Majuro", utcTime : "UTC +12:00"},
    {name: "Martinique", utcTime : "UTC -04:00"},
    {name: "Nouakchott", utcTime : "UTC"},
    {name: "Mauritius", utcTime : "UTC +04:00"},
    {name: "Mayotte", utcTime : "UTC +03:00"},
    {name: "Bahia_Banderas", utcTime : "UTC -05:00"},
    {name: "Cancun", utcTime : "UTC -05:00"},
    {name: "Matamoros", utcTime : "UTC -05:00"},
    {name: "Merida", utcTime : "UTC -05:00"},
    {name: "Mexico_City", utcTime : "UTC -05:00"},
    {name: "Monterrey", utcTime : "UTC -05:00"},
    {name: "Chihuahua", utcTime : "UTC -06:00"},
    {name: "Mazatlan", utcTime : "UTC -06:00"},
    {name: "Ojinaga", utcTime : "UTC -06:00"},
    {name: "Hermosillo", utcTime : "UTC -07:00"},
    {name: "Tijuana", utcTime : "UTC -07:00"},
    {name: "Chuuk", utcTime : "UTC +10:00"},
    {name: "Kosrae", utcTime : "UTC +11:00"},
    {name: "Pohnpei", utcTime : "UTC +11:00"},
    {name: "Chisinau", utcTime : "UTC +03:00"},
    {name: "Monaco", utcTime : "UTC +02:00"},
    {name: "Hovd", utcTime : "UTC +07:00"},
    {name: "Choibalsan", utcTime : "UTC +08:00"},
    {name: "Ulaanbaatar", utcTime : "UTC +08:00"},
    {name: "Podgorica", utcTime : "UTC +02:00"},
    {name: "Montserrat", utcTime : "UTC -04:00"},
    {name: "Casablanca", utcTime : "UTC +01:00"},
    {name: "Maputo", utcTime : "UTC +02:00"},
    {name: "Yangon", utcTime : "UTC +06:30"},
    {name: "Windhoek", utcTime : "UTC +02:00"},
    {name: "Nauru", utcTime : "UTC +12:00"},
    {name: "Kathmandu", utcTime : "UTC +05:45"},
    {name: "Amsterdam", utcTime : "UTC +02:00"},
    {name: "Noumea", utcTime : "UTC +11:00"},
    {name: "Auckland", utcTime : "UTC +12:00"},
    {name: "Chatham", utcTime : "UTC +12:45"},
    {name: "Managua", utcTime : "UTC -06:00"},
    {name: "Niamey", utcTime : "UTC +01:00"},
    {name: "Lagos", utcTime : "UTC +01:00"},
    {name: "Niue", utcTime : "UTC -11:00"},
    {name: "Norfolk", utcTime : "UTC +11:00"},
    {name: "Pyongyang", utcTime : "UTC +08:30"},
    {name: "Saipan", utcTime : "UTC +10:00"},
    {name: "Oslo", utcTime : "UTC +02:00"},
    {name: "Muscat", utcTime : "UTC +04:00"},
    {name: "Karachi", utcTime : "UTC +05:00"},
    {name: "Palau", utcTime : "UTC +09:00"},
    {name: "Gaza", utcTime : "UTC +03:00"},
    {name: "Hebron", utcTime : "UTC +03:00"},
    {name: "Panama", utcTime : "UTC -05:00"},
    {name: "Port_Moresby", utcTime : "UTC +10:00"},
    {name: "Bougainville", utcTime : "UTC +11:00"},
    {name: "Asuncion", utcTime : "UTC -04:00"},
    {name: "Lima", utcTime : "UTC -05:00"},
    {name: "Manila", utcTime : "UTC +08:00"},
    {name: "Pitcairn", utcTime : "UTC -08:00"},
    {name: "Warsaw", utcTime : "UTC +02:00"},
    {name: "Madeira", utcTime : "UTC +01:00"},
    {name: "Lisbon", utcTime : "UTC +01:00"},
    {name: "Azores", utcTime : "UTC"},
    {name: "Puerto_Rico", utcTime : "UTC -04:00"},
    {name: "Qatar", utcTime : "UTC +03:00"},
    {name: "Brazzaville", utcTime : "UTC +01:00"},
    {name: "Reunion", utcTime : "UTC +04:00"},
    {name: "Bucharest", utcTime : "UTC +03:00"},
    {name: "Kaliningrad", utcTime : "UTC +02:00"},
    {name: "Kirov", utcTime : "UTC +03:00"},
    {name: "Moscow", utcTime : "UTC +03:00"},
    {name: "Simferopol", utcTime : "UTC +03:00"},
    {name: "Volgograd", utcTime : "UTC +03:00"},
    {name: "Astrakhan", utcTime : "UTC +04:00"},
    {name: "Samara", utcTime : "UTC +04:00"},
    {name: "Saratov", utcTime : "UTC +04:00"},
    {name: "Ulyanovsk", utcTime : "UTC +04:00"},
    {name: "Yekaterinburg", utcTime : "UTC +05:00"},
    {name: "Omsk", utcTime : "UTC +06:00"},
    {name: "Barnaul", utcTime : "UTC +07:00"},
    {name: "Krasnoyarsk", utcTime : "UTC +07:00"},
    {name: "Novokuznetsk", utcTime : "UTC +07:00"},
    {name: "Novosibirsk", utcTime : "UTC +07:00"},
    {name: "Tomsk", utcTime : "UTC +07:00"},
    {name: "Irkutsk", utcTime : "UTC +08:00"},
    {name: "Chita", utcTime : "UTC +09:00"},
    {name: "Khandyga", utcTime : "UTC +09:00"},
    {name: "Yakutsk", utcTime : "UTC +09:00"},
    {name: "Ust-Nera", utcTime : "UTC +10:00"},
    {name: "Vladivostok", utcTime : "UTC +10:00"},
    {name: "Magadan", utcTime : "UTC +11:00"},
    {name: "Sakhalin", utcTime : "UTC +11:00"},
    {name: "Srednekolymsk", utcTime : "UTC +11:00"},
    {name: "Anadyr", utcTime : "UTC +12:00"},
    {name: "Kamchatka", utcTime : "UTC +12:00"},
    {name: "Kigali", utcTime : "UTC +02:00"},
    {name: "St_Barthelemy", utcTime : "UTC -04:00"},
    {name: "St_Helena", utcTime : "UTC"},
    {name: "St_Kitts", utcTime : "UTC -04:00"},
    {name: "St_Lucia", utcTime : "UTC -04:00"},
    {name: "Marigot", utcTime : "UTC -04:00"},
    {name: "Miquelon", utcTime : "UTC -02:00"},
    {name: "St_Vincent", utcTime : "UTC -04:00"},
    {name: "Apia", utcTime : "UTC +13:00"},
    {name: "San_Marino", utcTime : "UTC +02:00"},
    {name: "Sao_Tome", utcTime : "UTC +01:00"},
    {name: "Riyadh", utcTime : "UTC +03:00"},
    {name: "Dakar", utcTime : "UTC"},
    {name: "Belgrade", utcTime : "UTC +02:00"},
    {name: "Mahe", utcTime : "UTC +04:00"},
    {name: "Freetown", utcTime : "UTC"},
    {name: "Singapore", utcTime : "UTC +08:00"},
    {name: "Lower_Princes", utcTime : "UTC -04:00"},
    {name: "Bratislava", utcTime : "UTC +02:00"},
    {name: "Ljubljana", utcTime : "UTC +02:00"},
    {name: "Guadalcanal", utcTime : "UTC +11:00"},
    {name: "Mogadishu", utcTime : "UTC +03:00"},
    {name: "Johannesburg", utcTime : "UTC +02:00"},
    {name: "South_Georgia", utcTime : "UTC -02:00"},
    {name: "Seoul", utcTime : "UTC +09:00"},
    {name: "Juba", utcTime : "UTC +03:00"},
    {name: "Canary", utcTime : "UTC +01:00"},
    {name: "Ceuta", utcTime : "UTC +02:00"},
    {name: "Madrid", utcTime : "UTC +02:00"},
    {name: "Colombo", utcTime : "UTC +05:30"},
    {name: "Khartoum", utcTime : "UTC +02:00"},
    {name: "Paramaribo", utcTime : "UTC -03:00"},
    {name: "Longyearbyen", utcTime : "UTC +02:00"},
    {name: "Mbabane", utcTime : "UTC +02:00"},
    {name: "Stockholm", utcTime : "UTC +02:00"},
    {name: "Zurich", utcTime : "UTC +02:00"},
    {name: "Damascus", utcTime : "UTC +03:00"},
    {name: "Taipei", utcTime : "UTC +08:00"},
    {name: "Dushanbe", utcTime : "UTC +05:00"},
    {name: "Dar_es_Salaam", utcTime : "UTC +03:00"},
    {name: "Bangkok", utcTime : "UTC +07:00"},
    {name: "Lome", utcTime : "UTC"},
    {name: "Fakaofo", utcTime : "UTC +13:00"},
    {name: "Tongatapu", utcTime : "UTC +13:00"},
    {name: "Port_of_Spain", utcTime : "UTC -04:00"},
    {name: "Tunis", utcTime : "UTC +01:00"},
    {name: "Istanbul", utcTime : "UTC +03:00"},
    {name: "Ashgabat", utcTime : "UTC +05:00"},
    {name: "Grand_Turk", utcTime : "UTC -04:00"},
    {name: "Funafuti", utcTime : "UTC +12:00"},
    {name: "St_Thomas", utcTime : "UTC -04:00"},
    {name: "Kampala", utcTime : "UTC +03:00"},
    {name: "Kiev", utcTime : "UTC +03:00"},
    {name: "Uzhgorod", utcTime : "UTC +03:00"},
    {name: "Zaporozhye", utcTime : "UTC +03:00"},
    {name: "Dubai", utcTime : "UTC +04:00"},
    {name: "London", utcTime : "UTC +01:00"},
    {name: "Detroit", utcTime : "UTC -04:00"},
    {name: "Indianapolis", utcTime : "UTC -04:00"},
    {name: "Marengo", utcTime : "UTC -04:00"},
    {name: "Petersburg", utcTime : "UTC -04:00"},
    {name: "Vevay", utcTime : "UTC -04:00"},
    {name: "Vincennes", utcTime : "UTC -04:00"},
    {name: "Winamac", utcTime : "UTC -04:00"},
    {name: "Louisville", utcTime : "UTC -04:00"},
    {name: "Monticello", utcTime : "UTC -04:00"},
    {name: "New_York", utcTime : "UTC -04:00"},
    {name: "Chicago", utcTime : "UTC -05:00"},
    {name: "Knox", utcTime : "UTC -05:00"},
    {name: "Tell_City", utcTime : "UTC -05:00"},
    {name: "Menominee", utcTime : "UTC -05:00"},
    {name: "Beulah", utcTime : "UTC -05:00"},
    {name: "Center", utcTime : "UTC -05:00"},
    {name: "New_Salem", utcTime : "UTC -05:00"},
    {name: "Boise", utcTime : "UTC -06:00"},
    {name: "Denver", utcTime : "UTC -06:00"},
    {name: "Los_Angeles", utcTime : "UTC -07:00"},
    {name: "Phoenix", utcTime : "UTC -07:00"},
    {name: "Anchorage", utcTime : "UTC -08:00"},
    {name: "Juneau", utcTime : "UTC -08:00"},
    {name: "Metlakatla", utcTime : "UTC -08:00"},
    {name: "Nome", utcTime : "UTC -08:00"},
    {name: "Sitka", utcTime : "UTC -08:00"},
    {name: "Yakutat", utcTime : "UTC -08:00"},
    {name: "Adak", utcTime : "UTC -09:00"},
    {name: "Honolulu", utcTime : "UTC -10:00"},
    {name: "Midway", utcTime : "UTC -11:00"},
    {name: "Wake", utcTime : "UTC +12:00"},
    {name: "Montevideo", utcTime : "UTC -03:00"},
    {name: "Samarkand", utcTime : "UTC +05:00"},
    {name: "Tashkent", utcTime : "UTC +05:00"},
    {name: "Efate", utcTime : "UTC +11:00"},
    {name: "Vatican", utcTime : "UTC +02:00"},
    {name: "Caracas", utcTime : "UTC -04:00"},
    {name: "Ho_Chi_Minh", utcTime : "UTC +07:00"},
    {name: "Wallis", utcTime : "UTC +12:00"},
    {name: "El_Aaiun", utcTime : "UTC +01:00"},
    {name: "Aden", utcTime : "UTC +03:00"},
    {name: "Lusaka", utcTime : "UTC +02:00"},
    {name: "Harare", utcTime : "UTC +02:00"},
]

export default newCountries;
