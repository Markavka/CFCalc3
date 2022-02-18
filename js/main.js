function calc() {

	let maxHeadDamage,
			maxHeadCrit,

			maxChanceHeadDamage, maxChanceHeadCrit,
			fullHead,

			maxChanceHeadDamage100, maxChanceHeadCrit100,
			fullHead100,

			// ------------- ВЗ

			maxHeadDamagePB,
			maxHeadCritPB,

			maxChanceHeadDamage100PB, maxChanceHeadCrit100PB,
			fullHead100PB,
			fullHead100PBSum,

	damage = document.getElementById('damage').value;
	damage = parseFloat(damage);

	chance = document.getElementById('chance').value;
	chance = parseFloat(chance) + 1;

	crit = document.getElementById('crit').value;
	crit = parseInt(crit);

	purple = document.getElementById('purple').value;
	purple = parseInt(purple);

	pb = document.getElementById('pb').value;
	pb = parseInt(pb) * 2;



//---------------------------------ЛКМ---------------------------------//


	document.getElementById('lkm').innerHTML = "Расчёт по ЛКМ:";

					// ----------------- Аннотация ----------------- //
	if (pb > 0) {
		document.getElementById("promptLkm").innerHTML = `<span class="ann">*где 11 - базовый урон по "Блокеру"</span><br><br>
																									<p class="annP">МЧУ: 11 + ${damage}% + ${purple}%</p>
																									<p class="annP crit">МКУ: 11 + ${damage}% + ${purple}% + (150% + ${crit}%)</p>
																									<p class="annP">МЧУ<span class='PB'>ВЗ</span>: (11 + ${damage}% + ${purple}%) * 2.5</p>
																									<p class="annP crit">МКУ<span class='PB'>ВЗ</span>: (11 + ${damage}% + ${purple}% + (150% + ${crit}%)) * 2.5</p>`
	} else {
		document.getElementById("promptLkm").innerHTML = `<span class="ann">*где 11 - базовый урон по "Блокеру"</span><br><br>
																									<p class="annP">МЧУ: 11 + ${damage}% + ${purple}%</p>
																									<p class="annP crit">МКУ: 11 + ${damage}% + ${purple}% + (150% + ${crit}%)</p>`
	}


	maxHeadDamage = 11 + (11 * (damage * 0.01)) + ((11 + (11 * (damage * 0.01))) * (purple * 0.01));
	document.getElementById('maxHeadDamage').innerHTML = "Максимальный чистый урон: " + parseInt(maxHeadDamage);

	maxHeadCrit = maxHeadDamage + (maxHeadDamage * (1.5 + (crit * 0.01)));
	document.getElementById('maxHeadCrit').innerHTML = "Максимальный критический урон: " + parseInt(maxHeadCrit);



	// ----------------------- ВЗ ЛКМ -------------------------- //

	if (pb > 0) {

		maxHeadDamagePB = maxHeadDamage * 2.5;
		document.getElementById('maxHeadDamagePB').innerHTML = "Максимальный чистый урон c " + "<span class='PB'>ВЗ</span>" + ": " + parseInt(maxHeadDamagePB);

		maxHeadCritPB = maxHeadCrit * 2.5;
		document.getElementById('maxHeadCritPB').innerHTML = "Максимальный критический урон c " + "<span class='PB'>ВЗ</span>" + ": " + parseInt(maxHeadCritPB);


	} else {
		document.getElementById('maxHeadDamagePB').innerHTML = "";
		document.getElementById('maxHeadCritPB').innerHTML = "";
	}

		

	// -----------------------        -------------------------- //



//==============// ШАНС ЛКМ //==============//

// ----------------------------- 10 --------------------------------------СЧУ10ПКМ: 480.000 * (30 - (37% + 1%)

	document.getElementById('break10lkm').innerHTML = "расчёт на 10 выстрелов*";

							// ----------------- Аннотация ----------------- //
	document.getElementById("prompt10Lkm").innerHTML = `<span class="ann">*при условии, что ${chance - 1}% + 1% = ${chance}%</span><br><br>
																									<p class="annP">СЧУ10: ${maxHeadDamage.toFixed(2)} * (10 - (${chance - 1}% + 1%)</p>
																									<p class="annP crit">СКУ10: ${maxHeadCrit.toFixed(2)} * (10 * (${chance - 1}% + 1%)</p>`


	maxChanceHeadDamage = maxHeadDamage * (10 - ((10 * (chance * 0.01))));
	document.getElementById('maxChanceHeadDamage').innerHTML = "Средний чистый урон за 10 выстрелов ЛКМ: " + parseInt(maxChanceHeadDamage);

	maxChanceHeadCrit = maxHeadCrit * (10 * (chance * 0.01));
	document.getElementById('maxChanceHeadCrit').innerHTML = "Средний критический урон за 10 выстрелов ЛКМ: " + parseInt(maxChanceHeadCrit);



	fullHead = parseInt(maxChanceHeadDamage + maxChanceHeadCrit);
	document.getElementById('fullHead').innerHTML = "Суммарный урон за 10 выстрелов ЛКМ: " + fullHead;



// ----------------------------- 100 -------------------------------------

	
	document.getElementById('break100lkm').innerHTML = "расчёт на 100 выстрелов*";
								// ----------------- Аннотация ----------------- //
	if (pb > 0) {
		document.getElementById("prompt100Lkm").innerHTML = `<span class="ann">*при условии, что ${chance - 1}% + 1% = ${chance}%</span><br><br>
																												<p class="annP">СЧУ100: ${maxHeadDamage.toFixed(2)} * (100 - (${chance - 1}% + 1%) - <span class='PB'>${maxHeadDamage.toFixed(2)} * (100 * ${pb}% - (${chance - 1}% + 1%))</span></p>
																												<p class="annP crit">СКУ100: ${maxHeadCrit.toFixed(2)} * (100 * (${chance - 1}% + 1%) - <span class='PB'>${maxHeadCrit.toFixed(2)} * (100 * ${pb}% * (${chance - 1}% + 1%))</span></p>
																												
																												<p class="annP">СЧУ100<span class='PB'>ВЗ</span>: ${maxHeadDamagePB.toFixed(2)} * (100 * <span class='PB'>${pb}%</span> - (${chance - 1}% + 1%))</p>
																												<p class="annP crit">СКУ100<span class='PB'>ВЗ</span>: ${maxHeadCritPB.toFixed(2)} * (100 * <span class='PB'>${pb}%</span> * (${chance - 1}% + 1%))</p>`

	}else {
		document.getElementById("prompt100Lkm").innerHTML = `<span class="ann">*при условии, что ${chance - 1}% + 1% = ${chance}%</span><br><br>
																												<p class="annP">СЧУ100ПКМ: ${maxHeadDamage.toFixed(2)} * (100 - (${chance - 1}% + 1%)</p>
																												<p class="annP crit">СКУ100ПКМ: ${maxHeadCrit.toFixed(2)} * (100 * (${chance - 1}% + 1%)</p>`;

	}


	if (pb > 0) {    // ------------------- ВЗ ---------------------


		// ------------------- ВЗ выстрелы ---------------------


		maxChanceHeadDamage100PB = maxHeadDamagePB * ((100 * (pb * 0.01)) - (100 * (pb * 0.01)) * (chance * 0.01));
		document.getElementById('maxChanceHeadDamage100PB').innerHTML = "Средний чистый урон за 100 выстрелов ЛКМ с " + "<span class='PB'>ВЗ</span>" + ": " + parseInt(maxChanceHeadDamage100PB);

		maxChanceHeadCrit100PB = maxHeadCritPB * (100 * (pb * 0.01)) * (chance * 0.01);
		document.getElementById('maxChanceHeadCrit100PB').innerHTML = "Средний критический урон за 100 выстрелов ЛКМ с " + "<span class='PB'>ВЗ</span>" + ": " + parseInt(maxChanceHeadCrit100PB);

		fullHead100PB = parseInt(maxChanceHeadDamage100PB + maxChanceHeadCrit100PB);
		document.getElementById('fullHead100PB').innerHTML = "Суммарный урон за 100 выстрелов ЛКМ с " + "<span class='PB'>ВЗ</span>" + ": " + fullHead100PB;


		// ------------------- не ВЗ выстрелы ---------------------


		maxChanceHeadDamage100 = maxHeadDamage * (100 - ((100 * (chance * 0.01))));
		maxChanceHeadDamage100 = maxChanceHeadDamage100 - maxHeadDamage * (maxChanceHeadDamage100PB / maxHeadDamagePB);
		document.getElementById('maxChanceHeadDamage100').innerHTML = "Средний чистый урон за 100 выстрелов ЛКМ (минус урон от " + "<span class='PB'>ВЗ</span>" + "): " + parseInt(maxChanceHeadDamage100);

		maxChanceHeadCrit100 = maxHeadCrit * (100 * (chance * 0.01));
		maxChanceHeadCrit100 = maxChanceHeadCrit100 - maxHeadCrit * (maxChanceHeadCrit100PB / maxHeadCritPB);
		document.getElementById('maxChanceHeadCrit100').innerHTML = "Средний критический урон за 100 выстрелов ЛКМ (минус урон от " + "<span class='PB'>ВЗ</span>" + "): " + parseInt(maxChanceHeadCrit100);



		fullHead100 = parseInt(maxChanceHeadDamage100 + maxChanceHeadCrit100);



		// fullHead100 = parseInt(fullHead100 - (maxHeadDamage * (8 * (pb - (pb * (chance * 0.01))))));
		// fullHead100 = parseInt(fullHead100 - (maxHeadCrit * (8 * (pb * (chance * 0.01)))));

		document.getElementById('fullHead100').innerHTML = "Суммарный урон за 100 выстрелов ЛКМ (минус урон от " + "<span class='PB'>ВЗ</span>" + "): " + fullHead100;




		fullHead100PBSum = parseInt(fullHead100 + fullHead100PB);
		document.getElementById('fullHead100PBSum').innerHTML = "Полный суммарный урон за 100 выстрелов ЛКМ с " + "<span class='PB'>ВЗ</span>" + ": " + fullHead100PBSum; // Если есть ВЗ


	} else {    // ------------------- Без ВЗ ---------------------

		document.getElementById('break100lkm').innerHTML = "расчёт на 100 выстрелов*";

		maxChanceHeadDamage100 = maxHeadDamage * (100 - ((100 * (chance * 0.01))));
		document.getElementById('maxChanceHeadDamage100').innerHTML = "Средний чистый урон за 100 выстрелов ЛКМ: " + parseInt(maxChanceHeadDamage100);

		maxChanceHeadCrit100 = maxHeadCrit * (100 * (chance * 0.01));
		document.getElementById('maxChanceHeadCrit100').innerHTML = "Средний критический урон за 100 выстрелов ЛКМ: " + parseInt(maxChanceHeadCrit100);



		fullHead100 = parseInt(maxChanceHeadDamage100 + maxChanceHeadCrit100);


		document.getElementById('maxChanceHeadDamage100PB').innerHTML = "";
		document.getElementById('maxChanceHeadCrit100PB').innerHTML = "";

		document.getElementById('fullHead100PB').innerHTML = "";

		document.getElementById('fullHead100').innerHTML = "Суммарный урон за 100 выстрелов ЛКМ: " + fullHead100;

		document.getElementById('fullHead100PBSum').innerHTML = ""; // Если нет ВЗ

	}



}













function calc_1() {

	let maxHeadDamage_1,
			maxHeadCrit_1,
			maxChanceHeadDamage_1, maxChanceHeadCrit_1,
			fullHead_1,

			maxChanceHeadDamage100_1, maxChanceHeadCrit100_1,
			fullHead100_1,

			// ------------- ВЗ

			maxHeadDamagePB_1,
			maxHeadCritPB_1,

			maxChanceHeadDamage100PB_1, maxChanceHeadCrit100PB_1,
			fullHead100PB_1,
			fullHead100PBSum_1,

	damage_1 = document.getElementById('damage_1').value;
	damage_1 = parseFloat(damage_1);

	chance_1 = document.getElementById('chance_1').value;
	chance_1 = parseFloat(chance_1) + 1;

	crit_1 = document.getElementById('crit_1').value;
	crit_1 = parseInt(crit_1);

	purple_1 = document.getElementById('purple_1').value;
	purple_1 = parseInt(purple_1);

	pb_1 = document.getElementById('pb_1').value;
	pb_1 = parseInt(pb_1) * 2;



	//---------------------------------ЛКМ---------------------------------//


	document.getElementById('lkm_1').innerHTML = "Расчёт по ЛКМ:";

					// ----------------- Аннотация ----------------- //
	if (pb_1 > 0) {
		document.getElementById("promptLkm_1").innerHTML = `<span class="ann">*где 11 - базовый урон по "Блокеру"</span><br><br>
																									<p class="annP">МЧУ: 11 + ${damage_1}% + ${purple_1}%</p>
																									<p class="annP crit">МКУ: 11 + ${damage_1}% + ${purple_1}% + (150% + ${crit_1}%)</p>
																									<p class="annP">МЧУ<span class='PB'>ВЗ</span>: (11 + ${damage_1}% + ${purple_1}%) * 2.5</p>
																									<p class="annP crit">МКУ<span class='PB'>ВЗ</span>: (11 + ${damage_1}% + ${purple_1}% + (150% + ${crit_1}%)) * 2.5</p>`
	} else {
		document.getElementById("promptLkm_1").innerHTML = `<span class="ann">*где 11 - базовый урон по "Блокеру"</span><br><br>
																									<p class="annP">МЧУ: 11 + ${damage_1}% + ${purple_1}%</p>
																									<p class="annP crit">МКУ: 11 + ${damage_1}% + ${purple_1}% + (150% + ${crit_1}%)</p>`
	}

	maxHeadDamage_1 = 11 + (11 * (damage_1 * 0.01)) + ((11 + (11 * (damage_1 * 0.01))) * (purple_1 * 0.01));
	document.getElementById('maxHeadDamage_1').innerHTML = "Максимальный чистый урон: " + parseInt(maxHeadDamage_1);

	maxHeadCrit_1 = maxHeadDamage_1 + (maxHeadDamage_1 * (1.5 + (crit_1 * 0.01)));
	document.getElementById('maxHeadCrit_1').innerHTML = "Максимальный критический урон: " + parseInt(maxHeadCrit_1);


	// ----------------------- ВЗ ЛКМ -------------------------- //

	if (pb_1 > 0) {

		maxHeadDamagePB_1 = maxHeadDamage_1 * 2.5;
		document.getElementById('maxHeadDamagePB_1').innerHTML = "Максимальный чистый урон c " + "<span class='PB'>ВЗ</span>" + ": " + parseInt(maxHeadDamagePB_1);

		maxHeadCritPB_1 = maxHeadCrit_1 * 2.5;
		document.getElementById('maxHeadCritPB_1').innerHTML = "Максимальный критический урон c " + "<span class='PB'>ВЗ</span>" + ": " + parseInt(maxHeadCritPB_1);

	} else {
		document.getElementById('maxHeadDamagePB_1').innerHTML = "";
		document.getElementById('maxHeadCritPB_1').innerHTML = "";
	}

		

	// -----------------------        -------------------------- //



//==============// ШАНС ЛКМ //==============//



// -------------------------------- 10 -------------------------------

	document.getElementById('break10lkm_1').innerHTML = "расчёт на 10 выстрелов*";

							// ----------------- Аннотация ----------------- //
	document.getElementById("prompt10Lkm_1").innerHTML = `<span class="ann">*при условии, что ${chance_1 - 1}% + 1% = ${chance_1}%</span><br><br>
																									<p class="annP">СЧУ10: ${maxHeadDamage_1.toFixed(2)} * (10 - (${chance_1 - 1}% + 1%)</p>
																									<p class="annP crit">СКУ10: ${maxHeadCrit_1.toFixed(2)} * (10 * (${chance_1 - 1}% + 1%)</p>`

	maxChanceHeadDamage_1 = maxHeadDamage_1 * (10 - ((10 * (chance_1 * 0.01))));
	document.getElementById('maxChanceHeadDamage_1').innerHTML = "Средний чистый урон за 10 выстрелов ЛКМ: " + parseInt(maxChanceHeadDamage_1);

	maxChanceHeadCrit_1 = maxHeadCrit_1 * (10 * (chance_1 * 0.01));
	document.getElementById('maxChanceHeadCrit_1').innerHTML = "Средний критический урон за 10 выстрелов ЛКМ: " + parseInt(maxChanceHeadCrit_1);



	fullHead_1 = parseInt(maxChanceHeadDamage_1 + maxChanceHeadCrit_1);
	document.getElementById('fullHead_1').innerHTML = "Суммарный урон за 10 выстрелов ЛКМ: " + fullHead_1;


// ----------------------------- 100 -----------------------------------

	document.getElementById('break100lkm_1').innerHTML = "расчёт на 100 выстрелов*";

								// ----------------- Аннотация ----------------- //
	if (pb_1 > 0) {
		document.getElementById("prompt100Lkm_1").innerHTML = `<span class="ann">*при условии, что ${chance_1 - 1}% + 1% = ${chance_1}%</span><br><br>
																												<p class="annP">СЧУ100: ${maxHeadDamage_1.toFixed(2)} * (100 - (${chance_1 - 1}% + 1%) - <span class='PB'>${maxHeadDamage_1.toFixed(2)} * (100 * ${pb_1}% - (${chance_1 - 1}% + 1%))</span></p>
																												<p class="annP crit">СКУ100: ${maxHeadCrit_1.toFixed(2)} * (100 * (${chance_1 - 1}% + 1%) - <span class='PB'>${maxHeadCrit_1.toFixed(2)} * (100 * ${pb_1}% * (${chance_1 - 1}% + 1%))</span></p>
																												
																												<p class="annP">СЧУ100<span class='PB'>ВЗ</span>: ${maxHeadDamagePB_1.toFixed(2)} * (100 * <span class='PB'>${pb_1}%</span> - (${chance_1 - 1}% + 1%))</p>
																												<p class="annP crit">СКУ100<span class='PB'>ВЗ</span>: ${maxHeadCritPB_1.toFixed(2)} * (100 * <span class='PB'>${pb_1}%</span> * (${chance_1 - 1}% + 1%))</p>`

	}else {
		document.getElementById("prompt100Lkm_1").innerHTML = `<span class="ann">*при условии, что ${chance_1 - 1}% + 1% = ${chance_1}%</span><br><br>
																												<p class="annP">СЧУ100ПКМ: ${maxHeadDamage_1.toFixed(2)} * (100 - (${chance_1 - 1}% + 1%)</p>
																												<p class="annP crit">СКУ100ПКМ: ${maxHeadCrit_1.toFixed(2)} * (100 * (${chance_1 - 1}% + 1%)</p>`;

	}
		
	if (pb_1 > 0) {    // ------------------- ВЗ ---------------------


		// ------------------- ВЗ выстрелы ---------------------


		maxChanceHeadDamage100PB_1 = maxHeadDamagePB_1 * ((100 * (pb_1 * 0.01)) - (100 * (pb_1 * 0.01)) * (chance_1 * 0.01));
		document.getElementById('maxChanceHeadDamage100PB_1').innerHTML = "Средний чистый урон за 100 выстрелов ЛКМ с " + "<span class='PB'>ВЗ</span>" + ": " + parseInt(maxChanceHeadDamage100PB_1);

		maxChanceHeadCrit100PB_1 = maxHeadCritPB_1 * (100 * (pb_1 * 0.01)) * (chance_1 * 0.01);
		document.getElementById('maxChanceHeadCrit100PB_1').innerHTML = "Средний критический урон за 100 выстрелов ЛКМ с " + "<span class='PB'>ВЗ</span>" + ": " + parseInt(maxChanceHeadCrit100PB_1);

		fullHead100PB_1 = parseInt(maxChanceHeadDamage100PB_1 + maxChanceHeadCrit100PB_1);
		document.getElementById('fullHead100PB_1').innerHTML = "Суммарный урон за 100 выстрелов ЛКМ с " + "<span class='PB'>ВЗ</span>" + ": " + fullHead100PB_1;


		// ------------------- не ВЗ выстрелы ---------------------


		maxChanceHeadDamage100_1 = maxHeadDamage_1 * (100 - ((100 * (chance_1 * 0.01))));
		maxChanceHeadDamage100_1 = maxChanceHeadDamage100_1 - maxHeadDamage_1 * (maxChanceHeadDamage100PB_1 / maxHeadDamagePB_1);
		document.getElementById('maxChanceHeadDamage100_1').innerHTML = "Средний чистый урон за 100 выстрелов ЛКМ (минус урон от  " + "<span class='PB'>ВЗ</span>" + "): " + parseInt(maxChanceHeadDamage100_1);

		maxChanceHeadCrit100_1 = maxHeadCrit_1 * (100 * (chance_1 * 0.01));
		maxChanceHeadCrit100_1 = maxChanceHeadCrit100_1 - maxHeadCrit_1 * (maxChanceHeadCrit100PB_1 / maxHeadCritPB_1);
		document.getElementById('maxChanceHeadCrit100_1').innerHTML = "Средний критический урон за 100 выстрелов ЛКМ (минус урон от  " + "<span class='PB'>ВЗ</span>" + "): " + parseInt(maxChanceHeadCrit100_1);



		fullHead100_1 = parseInt(maxChanceHeadDamage100_1 + maxChanceHeadCrit100_1);



		// fullHead100_1 = parseInt(fullHead100_1 - (maxHeadDamage_1 * (8 * (pb_1 - (pb_1 * (chance_1 * 0.01))))));
		// fullHead100_1 = parseInt(fullHead100_1 - (maxHeadCrit_1 * (8 * (pb_1 * (chance_1 * 0.01)))));

		document.getElementById('fullHead100_1').innerHTML = "Суммарный урон за 100 выстрелов ЛКМ (минус урон от  " + "<span class='PB'>ВЗ</span>" + "): " + fullHead100_1;




		fullHead100PBSum_1 = parseInt(fullHead100_1 + fullHead100PB_1);
		document.getElementById('fullHead100PBSum_1').innerHTML = "Полный суммарный урон за 100 выстрелов ЛКМ с " + "<span class='PB'>ВЗ</span>" + ": " + fullHead100PBSum_1; // Если есть ВЗ


	} else {    // ------------------- Без ВЗ ---------------------

		document.getElementById('break100lkm_1').innerHTML = "расчёт на 100 выстрелов*";

		maxChanceHeadDamage100_1 = maxHeadDamage_1 * (100 - ((100 * (chance_1 * 0.01))));
		document.getElementById('maxChanceHeadDamage100_1').innerHTML = "Средний чистый урон за 100 выстрелов ЛКМ: " + parseInt(maxChanceHeadDamage100_1);

		maxChanceHeadCrit100_1 = maxHeadCrit_1 * (100 * (chance_1 * 0.01));
		document.getElementById('maxChanceHeadCrit100_1').innerHTML = "Средний критический урон за 100 выстрелов ЛКМ: " + parseInt(maxChanceHeadCrit100_1);



		fullHead100_1 = parseInt(maxChanceHeadDamage100_1 + maxChanceHeadCrit100_1);



		document.getElementById('maxChanceHeadDamage100PB_1').innerHTML = "";
		document.getElementById('maxChanceHeadCrit100PB_1').innerHTML = "";

		document.getElementById('fullHead100PB_1').innerHTML = "";

		document.getElementById('fullHead100_1').innerHTML = "Суммарный урон за 100 выстрелов ЛКМ: " + fullHead100_1;

		document.getElementById('fullHead100PBSum_1').innerHTML = ""; // Если нет ВЗ

	}

}